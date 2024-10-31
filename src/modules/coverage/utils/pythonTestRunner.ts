import { FileEntry, TestResult } from '../types';

export async function runPythonTests(files: FileEntry[]): Promise<TestResult[]> {
  const results: TestResult[] = [];
  
  for (const file of files) {
    if (!file.path.toLowerCase().endsWith('.py')) continue;
    
    try {
      // 创建临时文件
      const tempFileName = `temp_${Date.now()}.py`;
      await writeFile(tempFileName, file.content || '');
      
      // 运行 Python 单元测试
      const result = await runPythonTest(tempFileName);
      results.push(result);
      
      // 清理临时文件
      await removeFile(tempFileName);
    } catch (error) {
      console.error(`Error running tests for ${file.path}:`, error);
      results.push({
        passed: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  return results;
}

async function writeFile(filename: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    
    // 使用 Blob 和 URL.createObjectURL 在内存中创建文件
    const blob = new Blob([data], { type: 'text/plain' });
    resolve();
  });
}

async function removeFile(filename: string): Promise<void> {
  // 在浏览器环境中，我们不需要实际删除文件
  // URL.revokeObjectURL 会自动清理内存
  return Promise.resolve();
}

async function runPythonTest(filename: string): Promise<TestResult> {
  try {
    // 使用 python3 命令运行测试
    const command = `python3 -m unittest ${filename}`;
    
    // 在实际环境中，这里会使用 child_process.exec 执行命令
    // 但在 WebContainer 中，我们需要特殊处理
    const process = new Worker(createWorkerScript(command));
    
    return new Promise((resolve) => {
      process.onmessage = (event) => {
        resolve({
          passed: event.data.exitCode === 0,
          message: event.data.output,
          coverage: calculateCoverage(event.data.output)
        });
      };
    });
  } catch (error) {
    return {
      passed: false,
      message: error instanceof Error ? error.message : 'Failed to run Python test'
    };
  }
}

function createWorkerScript(command: string): string {
  return `
    self.onmessage = async function(e) {
      try {
        const response = await fetch('/__python__/run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            command: '${command}'
          })
        });
        
        const result = await response.json();
        self.postMessage(result);
      } catch (error) {
        self.postMessage({
          exitCode: 1,
          output: error.message
        });
      }
    };
  `;
}

function calculateCoverage(output: string): number {
  // 解析 Python unittest 的输出来计算覆盖率
  // 这是一个简化的实现，实际情况可能需要更复杂的解析
  const coverageMatch = output.match(/Coverage: (\d+)%/);
  return coverageMatch ? parseInt(coverageMatch[1], 10) : 0;
}