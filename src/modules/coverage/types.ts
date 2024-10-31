export interface FileEntry {
  path: string;
  type: 'file' | 'directory';
  content?: string;
  size: number;
}

export interface FileStorage {
  files: FileEntry[];
  totalSize: number;
  totalCount: number;
}

export interface TestResult {
  passed: boolean;
  message: string;
  coverage?: number;
}

export const FILE_LIMITS = {
  MAX_FILES: 10000,
  MAX_SIZE_BYTES: 1024 * 1024 * 1024, // 1GB
  ALLOWED_EXTENSIONS: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.go', '.py', '.java']
} as const;

export const PYTHON_TEST_PATTERN = /test.*\.py$/i;