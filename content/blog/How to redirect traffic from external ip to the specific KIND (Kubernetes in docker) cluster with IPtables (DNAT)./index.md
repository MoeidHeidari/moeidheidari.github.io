---
title: How to redirect traffic from external ip to the specific KIND (Kubernetes in docker) cluster with IPtables (DNAT)
date: 2022-09-11 21:30:00
author: Moeid Heidari
tags: ["Cloud computing", "DevOps","Cloud","DNAT","Kind"]
---
# How to redirect traffic from external ip to the specific KIND (Kubernetes in docker) cluster with IPtables (DNAT).

### Introduction

Kind is a tool to create Kubernetes clusters in Docker container nodes. Without a doubt, it is not a useful solution for a production environment but rather for a staging environment. Minikube kind is a multi-node cluster system that can bring up several worker nodes as docker containers on a single machine.
when you create a cluster with KIND the control plan's IP will be the IP address of the docker container and not the local IP address of your Machine (as kind is useful when a multi-cluster system is required). So most probably you will have an external IP as the entry point to your VM. But the requests should go to the cluster immediately. Here a question comes up, How to redirect the whole traffic on a specific port to another IP address (Not another Port)? Take a look at the following figure describing the situation.

![](https://cdn-images-1.medium.com/max/880/1*Nc5sIzYbhEvw18MdzZeABA.png)

**Node:** Pay attention that we don't want to have another reverse proxy on the node. We would like to have our reverse proxy as the gateway of our clusters. This is the situation when we want to preserve the client IP and avoid X-Forwarded-For: that Nginx does.
In this article, we want to go through the process of creating a Kind cluster and forward the traffic directly to the cluster without using X-Forwarded-For: <clientip> header value.

## Create a Kind Cluster

To make a Kind cluster the fist step is to install the Kind `CLI` tool.

##### Installing With A Package Manager

On macOS via Homebrew:

```bash
brew install kind
```

On macOS via MacPorts:

```bash
sudo port selfupdate && sudo port install kind
```

On Windows via Chocolatey ([Chocolatey Software | Kind 0.15.0](https://chocolatey.org/packages/kind))

```bash
choco install kind
```

### Installing From Release Binaries

Pre-built binaries are available on Kind [releases page](https://github.com/kubernetes-sigs/kind/releases).

To install, download the binary for your platform from “Assets”, then rename it to `kind` (or perhaps `kind.exe` on Windows) and place this into your `$PATH` at your preferred binary installation directory.

On Linux:

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.15.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

On macOS:

```bash
# for Intel Macs
[ $(uname -m) = x86_64 ]&& curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.15.0/kind-darwin-amd64
# for M1 / ARM Macs
[ $(uname -m) = arm64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.15.0/kind-darwin-arm64
chmod +x ./kind
mv ./kind /some-dir-in-your-PATH/kind
```

On Windows in [PowerShell](https://en.wikipedia.org/wiki/PowerShell):

```bash
curl.exe -Lo kind-windows-amd64.exe https://kind.sigs.k8s.io/dl/v0.15.0/kind-windows-amd64
Move-Item .\kind-windows-amd64.exe c:\some-dir-in-your-PATH\kind.exe
```

### Installing From Source

In addition to the pre-built binary + package manager installation options listed above you can install kind from source with `GO111MODULE="on" go get sigs.k8s.io/kind@v0.15.0` or clone this repo and run `make build` from the repository.

#### Installing With `make`[](https://kind.sigs.k8s.io/docs/user/quick-start/#installing-with-make)

Using `make build` does not require installing Go and will build kind reproducibly, the binary will be in `bin/kind` inside your clone of the repo.

You should only need `make` and standard userspace utilities to run this build, it will automatically obtain the correct go version with our vendored copy of [`gimmee`](https://github.com/travis-ci/gimme).

You can then call `./bin/kind` to use it, or copy `bin/kind` into some directory in your system `PATH` to use it as `kind` from the command line.

`make install` will attempt to mimic `go install` and has the same path requirements as `go install` below.

#### Installing with `go get` / `go install`

When installing with [Go](https://golang.org/) please use the latest stable Go release, ideally go1.16 or greater.

For Go versions go1.17 and higher, you should use to `go install sigs.k8s.io/kind@v0.15.0` per [Go 1.17 Release Notes - The Go Programming Language](https://tip.golang.org/doc/go1.17#go-get)

For older versions use `GO111MODULE="on" go get sigs.k8s.io/kind@v0.15.0`.

For either version if you are building from a local source clone, use `go install .` from the top-level directory of the clone.

> **NOTE**: `go get` should not be run from a Go [modules](https://github.com/golang/go/wiki/Modules) enabled project directory, as go get inside a modules enabled project updates dependencies / behaves differently. Try for example `cd $HOME` first.

`go get` / `go install` will typically put the `kind` binary inside the `bin` directory under `go env GOPATH`, see Go's [“Compile and install packages and dependencies”](https://golang.org/cmd/go/#hdr-Compile_and_install_packages_and_dependencies) for more on this. You may need to add that directory to your `$PATH` if you encounter the error `kind: command not found` after installation, you can find a guide for adding a directory to your `PATH` at [path.md · GitHub](https://gist.github.com/nex3/c395b2f8fd4b02068be37c961301caa7#file-path-md).

#### Creating a cluster

To create a cluster we first need to have a `kind cluster config` file. below you can find an example of such a file.

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
name: {cluster-name}
networking:
  ipFamily: ipv4
  apiServerAddress: {you desired ip address example (ip of your machine, later the certificate will be signed for this Ip address)}
```

After executing `docker ps` you will see such a result

```bash
CONTAINER ID   IMAGE                     COMMAND                  CREATED        STATUS      PORTS                      NAMES
9ddc41324d46   kindest/node:v1.24.0      "/usr/local/bin/entr…"   13 days ago    Up 2 days   10.1.0.15:41887->6443/tcp  cluster-name-control-plane
```

And after running `kubectl get nodes -o wide` you should expect such a result

```bash
NAME                               STATUS   ROLES           AGE   VERSION   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE       KERNEL-VERSION      CONTAINER-RUNTIME
cluster-name-control-plane         Ready    control-plane   13d   v1.24.0   172.17.0.2    <none>        Ubuntu 21.10   5.4.0-125-generic   containerd://1.6.4
```

Now we have our cluster with one node up and running.
As you can see the IP in the Internal IP column is different from your machine's IP which shows the IP address of the cluster running inside a docker container.

### Deploy Nginx ingress controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```

After running this command you should expect the Nginx ingress controller to be up and running.

> **NOTE**: The `ingress controller-service` doesn't have the Control plan IP as it's external IP address, so we need to specify it.

To do so we need to specify the external IP while the clusterIP type is `LoadBalancer`.

```bash
type: LoadBalancer
  externalIPs:
    - {cluster-ip-address}
```

Now our nginx is listening to the port `80` on the cluster IP. If we run the following command

```bash
curl {cluster-ip}
```

we should expect such a result as we haven't forwarded any port yet

```bash
<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

**Note:** pay attention that this IP is just accessible inside the VM.

to make it accessible through the VM's external IP we need to do the DNAT with Ip tables.

#### DNAT

To do the DNAT we need to choose a port first. It will be the port that we forward the traffic to the cluster through.

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport {port} -j DNAT --to-destination {cluster-ip}
```

Example:

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 172.19.0.2
```

We need to run the following command also to allow the data to return to the user.

```bash
sudo  iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

then you will see that you can access your pods inside the cluster from outside the VM using an external Ip address.

**Note:** It is also useful when you want to implement ingress for your domain names and DNS records.

```bash
kubectl get ingress -A
NAMESPACE   NAME              CLASS    HOSTS                    ADDRESS      PORTS   AGE
default     iguana-ingress    <none>   develop.dipal.ru         172.17.0.2   80      13d
default     pyrador-ingress   <none>   develop.auth.dipal.ru    172.17.0.2   80      13d
default     zoo-ingress       <none>   develop.panel.dipal.ru   172.17.0.2   80      9d
```