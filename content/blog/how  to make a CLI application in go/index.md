---
title: How to make a CLI application in go
date: 2020-06-26 21:30:00
author: Moeid Heidari
tags: ["Go", "CLI","golang"]
---

CLI or Command Line Interfacec is a kind of program that user interacts with entirely through a terminal and shell.

In this article we want to go through a simple CLI application written in golang.

### Install go

#### Linux

download the latest version of the source code [here](https://go.dev/dl/go1.18.3.linux-amd64.tar.gz)

unarchive the source

```bash
tar -C /usr/local -xzf go1.18.3.linux-amd64.tar.gz
```

Add /usr/local/go/bin into the PATH environment variable

```bash
export PATH=$PATH:/usr/local/go/bin
```

Verify the go installation by executing following command

```bash
go --version
```

#### Mac

Open the package file you downloaded and follow the prompts to install Go

The package installs the Go distribution to /usr/local/go. The package should put the /usr/local/go/bin directory in your `PATH` environment variable. You may need to restart any open Terminal sessions for the change to take effect.

Verify the go installation by executing following command

```bash
go --version
```

#### Windows

Open the MSI file you downloaded and follow the prompts to install Go

Verify that you've installed Go

1. In **Windows**, click the **Start** menu.
2. In the menu's search box, type `cmd`, then press the **Enter** key.
3. In the Command Prompt window that appears, type the following command
  
  ```bash
  go version
  ```
  

---

To initialize a go project we need to execute such a command

```bash
go mod init {main_package_name}
```

The first statement in a Go source file must be `package name`. Executable commands must always use `package main`

then we need to create the main file (where we will have the entry point of our program)

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world.")
}
```

you can install and build the program with the go tool

```go
go install {main_package_name}
```

this command builds an executable file with the same name as our main source file.

If `GOBIN` environment variable is set, binaries are installed to the `bin` subdirectory of the first directory in the `GOPATH` list., Otherwise, binaries will be installed to the bin subdirectory of the default `GOPATH` (``$HOME/go` or `%USERPROFILE%\go``)

```bash
go env -w GOBIN=/some_directory/bin
```

To unset a variable previously set by `go env -w`, use `go env -u`:

```bash
go env -u GOBIN
```

---

For the purpose of our CLI application we use a commander library called [Cobra]([GitHub - spf13/cobra: A Commander for modern Go CLI interactions](https://github.com/spf13/cobra)).

Execute the following command to install the latest version of cobra

```bash
go get -u github.com/spf13/cobra@latest
```

next, include Cobra in your application

```go
import "github.com/spf13/cobra"
```

```go
package main

import (
    "fmt"
    "github.com/spf13/cobra"
)

func main() {
    fmt.Println("Hello, world.")
}
```

A command line application needs a global command that represents the base command called without any subcommand. Thus we need to define this variable inside our main file as below.

```go
var mainCommand= &cobra.Command{
    Use: "main",
    Short: "welcome to my first commandline application",
    Long:" this is a long description about the application",
}
```

To have a functionality for a command we need to call a function inside the command struct instantiation as follow

```go
var mainCommand= &cobra.Command{
    Use: "main",
    Short: "welcome to my first commandline application",
    Long:" this is a long description about the application",

    Run: func(cmd *cobra.Command, args []string) {},
}
```

We have an Init function that holds the definition of the flags and configuration settings .Cobra supports persistent flags which if we define them here then they will be global for our application.

```go
mainCommand.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.main.yaml)")
```

Cobra also supports local flags that only run when the action is called directly.

```go
rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
```

```go
func init() {
	mainCommand.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.main.yaml)")
	mainCommand.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
```

We need a function in our main file called **Execute()** to add all child commands to the root command and set flags appropriately,

```go
func Execute() {
	err := mainCommand.Execute()
	if err != nil {
		os.Exit(1)
	}
}
```

let put all together

```go

package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

//======================================================================

var mainCommand = &cobra.Command{
	Use: "main",
    Short: "welcome to my first commandline application",
    Long:" this is a long description about the application",
	Run: func(cmd *cobra.Command, args []string) {},
}

//=====================================================================
func Execute() {
	err := mainCommand.Execute()
	if err != nil {
		os.Exit(1)
	}
}

//=====================================================================
func init() {
	mainCommand.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
```

if we run the application we should see such a result

```bash
moeid:~/$ go run main.go -h
 this is a long description about the application

Usage:
  main [flags]

Flags:
  -h, --help     help for main
  -t, --toggle   Help message for toggle
```

Lets add a command with a flag to our commandline application

to add a command we need make an instantiation from the command struct at first as follow

```go
var PrintHello = &cobra.Command{
	Use:   "hello",
	Short: "Prints a hello sentence",
	Long:  `This command takes a name as an argument and prints a hello {name}`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("hello")
	},
}
```

now we need to add it to the mainCommand

```go
func Execute() {
	mainCommand.AddCommand(PrintHello)
	err := mainCommand.Execute()
	if err != nil {
		os.Exit(1)
	}
}
```

now if we run the application we will see that the command is added

```bash
moeid:~/$ go run main.go -h
this is a long description about the application

Usage:
  main [flags]
  main [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  hello       Prints a hello sentence
  help        Help about any command

Flags:
  -h, --help     help for main
  -t, --toggle   Help message for toggle

Use "main [command] --help" for more information about a command.
```

Now we need to add the argument to our **hello** command

```go

var PrintHello = &cobra.Command{
	Use:   "hello",
	Short: "Prints a hello sentence",
	Long:  `This command takes a name as an argument and prints a hello {name}`,
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		fmt.Println("hello:", name)
	},
}

func Execute() {
	mainCommand.AddCommand(PrintHello)
	PrintHello.PersistentFlags().String("name", "unknown", "name of the user to say hello to")
	err := mainCommand.Execute()
	if err != nil {
		os.Exit(1)
	}
}
```

Now if we run the application again with **hello** and provide the name argument we should see such a result printed on the terminal

```bash
moeid:~/$ go run main.go hello --name moeid
hello: moeid
```

Put it all together

```go
package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

//======================================================================

var mainCommand = &cobra.Command{
	Use:   "main",
	Short: "welcome to my first commandline application",
	Long:  " this is a long description about the application",
	Run:   func(cmd *cobra.Command, args []string) {},
}

var PrintHello = &cobra.Command{
	Use:   "hello",
	Short: "Prints a hello sentence",
	Long:  `This command takes a name as an argument and prints a hello {name}`,
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		fmt.Println("hello:", name)
	},
}

//=====================================================================
func Execute() {
	mainCommand.AddCommand(PrintHello)
	PrintHello.PersistentFlags().String("name", "unknown", "name of the user to say hello to")
	err := mainCommand.Execute()
	if err != nil {
		os.Exit(1)
	}
}

//=====================================================================
func init() {
	mainCommand.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
```

Please let me know if you have any comment on it 😎