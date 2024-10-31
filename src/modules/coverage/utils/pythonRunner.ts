import { FileEntry } from '../types';

export interface PythonRunResult {
  success: boolean;
  output: string;
  error?: string;
}

export async function runPythonFile(file: FileEntry): Promise<PythonRunResult> {
  try {
    // 使用 python3 命令运行文件
    const command = `python3 -c "${escapeCode(file.content || '')}"`;
    
    const process = await fetch('/__python__/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ command })
    });
    
    const result = await process.json();
    
    return {
      success: result.exitCode === 0,
      output: result.output,
      error: result.exitCode !== 0 ? result.output : undefined
    };
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Failed to run Python file'
    };
  }
}

function escapeCode(code: string): string {
  return code
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}