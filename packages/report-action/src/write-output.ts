import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core';
import { PatchSchema } from './patch-schema';

export function writeOutput(outputPath: string, patch: PatchSchema): void {
  try {
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write patch.json
    fs.writeFileSync(outputPath, JSON.stringify(patch, null, 2));
    
    // Set GitHub Action output
    core.setOutput('patch', outputPath);
    
    core.info(`✅ Patch generated: ${outputPath}`);
    core.info(`📊 Files changed: ${patch.files.length}`);
    core.info(`🔄 Base: ${patch.base}`);
    core.info(`🎯 Head: ${patch.head}`);
  } catch (error) {
    throw new Error(`Failed to write output: ${error}`);
  }
}