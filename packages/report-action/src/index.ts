import * as core from '@actions/core';
import { detectMode, getGitHubContext, getPullRequestNumber } from './env';
import { getPullRequestDiff } from './github-pr';
import { getCommitDiff } from './git-diff';
import { createPatchSchema } from './patch-schema';
import { writeOutput } from './write-output';

async function run(): Promise<void> {
  try {
    // Get inputs
    const inputMode = core.getInput('mode') || 'auto';
    const inputBase = core.getInput('base');
    const inputHead = core.getInput('head');
    const outputPath = core.getInput('output') || 'canyon.patch.json';
    
    // Detect mode
    const mode = detectMode(inputMode);
    const { eventName, owner, repo } = getGitHubContext();
    
    core.info(`🔍 Detection mode: ${mode}`);
    core.info(`📁 Repository: ${owner}/${repo}`);
    core.info(`🎪 Event: ${eventName}`);
    
    let base: string;
    let head: string;
    let files: any[];
    
    if (mode === 'pr') {
      // PR mode - use GitHub API
      const token = process.env.GITHUB_TOKEN;
      if (!token) {
        throw new Error('GITHUB_TOKEN is required for PR mode');
      }
      
      const pullNumber = getPullRequestNumber();
      if (!pullNumber) {
        throw new Error('Could not determine pull request number');
      }
      
      core.info(`🔄 Processing PR #${pullNumber}`);
      
      const result = await getPullRequestDiff(token, owner, repo, pullNumber);
      base = result.base;
      head = result.head;
      files = result.files;
      
    } else {
      // Commit mode - use git diff
      base = inputBase || 'HEAD~1';
      head = inputHead || 'HEAD';
      
      core.info(`🔄 Processing commit range: ${base}..${head}`);
      
      const result = getCommitDiff(base, head);
      files = result.files;
    }
    
    // Create patch schema
    const patch = createPatchSchema(
      'github',
      eventName,
      base,
      head,
      files
    );
    
    // Write output
    writeOutput(outputPath, patch);
    
    core.info('✅ Canyon patch generation completed successfully');
    
  } catch (error) {
    core.setFailed(`❌ Action failed: ${error}`);
  }
}

run();