import { execSync } from 'child_process';
import { PatchFile } from './patch-schema';

export function getCommitDiff(base: string, head: string): { files: PatchFile[] } {
  try {
    // Get list of changed files with status
    const statusOutput = execSync(`git diff --name-status ${base} ${head}`, { 
      encoding: 'utf8' 
    });
    
    const files: PatchFile[] = [];
    
    for (const line of statusOutput.trim().split('\n')) {
      if (!line) continue;
      
      const [status, ...pathParts] = line.split('\t');
      const path = pathParts.join('\t'); // Handle paths with tabs
      
      // Get patch for this file
      let patch = '';
      try {
        patch = execSync(`git diff --unified=0 ${base} ${head} -- "${path}"`, {
          encoding: 'utf8'
        });
      } catch {
        // File might be binary or deleted
        patch = '';
      }
      
      files.push({
        path,
        status: mapGitStatus(status),
        patch
      });
    }
    
    return { files };
  } catch (error) {
    throw new Error(`Failed to get git diff: ${error}`);
  }
}

function mapGitStatus(status: string): PatchFile['status'] {
  switch (status[0]) {
    case 'A':
      return 'added';
    case 'M':
      return 'modified';
    case 'D':
      return 'removed';
    case 'R':
      return 'renamed';
    default:
      return 'modified';
  }
}