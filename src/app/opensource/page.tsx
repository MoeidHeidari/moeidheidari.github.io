import OpenSourceClient from "./opensource-client";

type OpenSourceRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

const fallbackRepos: OpenSourceRepo[] = [
  {
    id: 1,
    name: "moeidheidari.github.io",
    html_url: "https://github.com/moeidheidari/moeidheidari.github.io",
    description: "Personal portfolio and blog website.",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    language: "TypeScript",
    pushed_at: "2026-02-20T10:00:00Z",
    fork: false,
  },
];

async function getRepos(): Promise<OpenSourceRepo[]> {
  try {
    const [userResponse, orgResponse] = await Promise.all([
      fetch("https://api.github.com/users/moeidheidari/repos?per_page=100&sort=updated", {
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/orgs/corpobit/repos?per_page=100&sort=updated", {
        next: { revalidate: 3600 },
      }),
    ]);

    const userRepos = userResponse.ok
      ? ((await userResponse.json()) as OpenSourceRepo[])
      : [];
    const orgRepos = orgResponse.ok
      ? ((await orgResponse.json()) as OpenSourceRepo[])
      : [];

    const mergedRepos = [...userRepos, ...orgRepos];
    const uniqueRepos = Array.from(
      new Map(mergedRepos.map((repo) => [repo.id, repo])).values()
    );

    if (uniqueRepos.length === 0) {
      return fallbackRepos;
    }

    return uniqueRepos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  } catch {
    return fallbackRepos;
  }
}

export default async function OpenSourcePage() {
  const repos = await getRepos();
  const todayIso = new Date().toISOString().slice(0, 10);

  return <OpenSourceClient initialRepos={repos} todayIso={todayIso} />;
}
