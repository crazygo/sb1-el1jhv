import { FileEntry, FileStorage, FILE_LIMITS, PYTHON_TEST_PATTERN } from '../types';

export async function processFileEntry(entry: FileSystemEntry): Promise<FileEntry[]> {
  const entries: FileEntry[] = [];

  async function processEntry(entry: FileSystemEntry, path: string = ''): Promise<void> {
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry;
      try {
        const file = await getFileFromEntry(fileEntry);
        // 检查文件扩展名
        if (isAllowedFile(file.name)) {
          // 读取文件内容
          const content = await readFileContent(file);
          entries.push({
            path: `${path}${file.name}`,
            type: 'file',
            content,
            size: file.size,
          });
        }
      } catch (error) {
        console.error('Error processing file:', error);
      }
    } else if (entry.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry;
      const dirReader = dirEntry.createReader();
      
      try {
        let dirEntries = await readEntriesPromise(dirReader);
        while (dirEntries.length > 0) {
          await Promise.all(dirEntries.map(childEntry => 
            processEntry(childEntry, `${path}${entry.name}/`)
          ));
          dirEntries = await readEntriesPromise(dirReader);
        }
      } catch (error) {
        console.error('Error reading directory:', error);
      }
    }
  }

  await processEntry(entry);
  return entries;
}

function getFileFromEntry(fileEntry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => {
    fileEntry.file(resolve, reject);
  });
}

function readEntriesPromise(dirReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => {
    dirReader.readEntries(resolve, reject);
  });
}

async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function isAllowedFile(filename: string): boolean {
  return FILE_LIMITS.ALLOWED_EXTENSIONS.some(ext => 
    filename.toLowerCase().endsWith(ext)
  );
}

export function isPythonTestFile(filename: string): boolean {
  return PYTHON_TEST_PATTERN.test(filename);
}

export class FileStorageManager {
  private storage: FileStorage = {
    files: [],
    totalSize: 0,
    totalCount: 0
  };

  async addEntries(entries: FileSystemEntry[]): Promise<FileStorage> {
    try {
      const newEntries: FileEntry[] = [];

      for (const entry of entries) {
        if (this.storage.totalCount >= FILE_LIMITS.MAX_FILES) {
          console.warn('Maximum file count reached');
          break;
        }

        const processedEntries = await processFileEntry(entry);
        
        for (const file of processedEntries) {
          if (this.storage.totalSize + file.size > FILE_LIMITS.MAX_SIZE_BYTES) {
            console.warn('Maximum storage size reached');
            break;
          }

          newEntries.push(file);
          this.storage.totalSize += file.size;
          this.storage.totalCount++;
        }
      }

      this.storage.files = [...this.storage.files, ...newEntries];
      
      // 如果没有找到任何支持的文件，抛出错误
      if (this.storage.totalCount === 0) {
        throw new Error('No supported files found');
      }

      return this.storage;
    } catch (error) {
      // 清空存储并重新抛出错误
      this.clear();
      throw error;
    }
  }

  getPythonTestFiles(): FileEntry[] {
    return this.storage.files.filter(file => isPythonTestFile(file.path));
  }

  getStorage(): FileStorage {
    return this.storage;
  }

  clear(): void {
    this.storage = {
      files: [],
      totalSize: 0,
      totalCount: 0
    };
  }
}