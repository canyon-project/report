export interface PatchFile {
  path: string;
  status: 'added' | 'modified' | 'removed' | 'renamed';
  patch: string;
}

export interface PatchSchema {
  version: number;
  provider: string;
  event: string;
  base: string;
  head: string;
  files: PatchFile[];
  generatedAt: string;
}

export function createPatchSchema(
  provider: string,
  event: string,
  base: string,
  head: string,
  files: PatchFile[]
): PatchSchema {
  return {
    version: 1,
    provider,
    event,
    base,
    head,
    files,
    generatedAt: new Date().toISOString()
  };
}