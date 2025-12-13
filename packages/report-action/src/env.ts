export type DetectionMode = 'auto' | 'pr' | 'commit';

export function detectMode(inputMode: string): DetectionMode {
  if (inputMode !== 'auto') {
    return inputMode as DetectionMode;
  }
  
  if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
    return 'pr';
  }
  
  return 'commit';
}

export function getGitHubContext() {
  const eventName = process.env.GITHUB_EVENT_NAME || '';
  const repository = process.env.GITHUB_REPOSITORY || '';
  const [owner, repo] = repository.split('/');
  
  return {
    eventName,
    owner,
    repo,
    repository
  };
}

export function getPullRequestNumber(): number | null {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) return null;
  
  try {
    const fs = require('fs');
    const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    return event.pull_request?.number || null;
  } catch {
    return null;
  }
}