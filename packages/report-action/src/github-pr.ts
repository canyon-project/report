import { getOctokit } from '@actions/github';
import { PatchFile } from './patch-schema';

export async function getPullRequestDiff(
  token: string,
  owner: string,
  repo: string,
  pullNumber: number
): Promise<{ base: string; head: string; files: PatchFile[] }> {
  const octokit = getOctokit(token);
  
  // Get PR info
  const { data: pr } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: pullNumber
  });
  
  // Get PR files
  const { data: files } = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber
  });
  
  const patchFiles: PatchFile[] = files.map(file => ({
    path: file.filename,
    status: mapGitHubStatus(file.status),
    patch: file.patch || '' // null for binary files or too large files
  }));
  
  return {
    base: pr.base.sha,
    head: pr.head.sha,
    files: patchFiles
  };
}

function mapGitHubStatus(status: string): PatchFile['status'] {
  switch (status) {
    case 'added':
      return 'added';
    case 'modified':
      return 'modified';
    case 'removed':
      return 'removed';
    case 'renamed':
      return 'renamed';
    default:
      return 'modified';
  }
}