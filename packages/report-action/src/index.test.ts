import { describe, it, expect } from 'vitest';
import { detectMode } from './env';
import { createPatchSchema } from './patch-schema';

describe('Canyon Report Action', () => {
  describe('detectMode', () => {
    it('should return input mode when not auto', () => {
      expect(detectMode('pr')).toBe('pr');
      expect(detectMode('commit')).toBe('commit');
    });

    it('should detect PR mode from environment', () => {
      const originalEnv = process.env.GITHUB_EVENT_NAME;
      process.env.GITHUB_EVENT_NAME = 'pull_request';
      
      expect(detectMode('auto')).toBe('pr');
      
      process.env.GITHUB_EVENT_NAME = originalEnv;
    });

    it('should default to commit mode', () => {
      const originalEnv = process.env.GITHUB_EVENT_NAME;
      delete process.env.GITHUB_EVENT_NAME;
      
      expect(detectMode('auto')).toBe('commit');
      
      process.env.GITHUB_EVENT_NAME = originalEnv;
    });
  });

  describe('createPatchSchema', () => {
    it('should create valid patch schema', () => {
      const files = [
        {
          path: 'src/test.ts',
          status: 'modified' as const,
          patch: '@@ -1,3 +1,4 @@\n console.log("test");\n+console.log("new");'
        }
      ];

      const patch = createPatchSchema('github', 'pull_request', 'main', 'feature', files);

      expect(patch.version).toBe(1);
      expect(patch.provider).toBe('github');
      expect(patch.event).toBe('pull_request');
      expect(patch.base).toBe('main');
      expect(patch.head).toBe('feature');
      expect(patch.files).toEqual(files);
      expect(patch.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });
});