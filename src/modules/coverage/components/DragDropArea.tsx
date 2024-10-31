import React, { useState, useCallback } from 'react';
import { FolderUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileStorageManager } from '../utils/fileUtils';
import { FILE_LIMITS } from '../types';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DragDropAreaProps {
  onFileDrop: (storage: FileStorageManager) => void;
}

export function DragDropArea({ onFileDrop }: DragDropAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const storageManager = new FileStorageManager();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    try {
      const items = Array.from(e.dataTransfer.items);
      if (items.length === 0) {
        setError('请拖拽文件或文件夹');
        return;
      }

      const entries: FileSystemEntry[] = [];
      for (const item of items) {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          entries.push(entry);
        }
      }

      if (entries.length === 0) {
        setError('无法读取拖拽的文件');
        return;
      }

      await storageManager.addEntries(entries);
      onFileDrop(storageManager);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'No supported files found') {
          setError(`未找到支持的文件类型，支持的文件类型：${formatExtensions(FILE_LIMITS.ALLOWED_EXTENSIONS)}`);
        } else {
          setError('处理文件时出错');
        }
      }
      console.error(err);
    }
  }, [onFileDrop]);

  const formatExtensions = (exts: string[]): string => {
    return exts.map(ext => ext.replace('.', '')).join('、');
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8",
          "flex flex-col items-center justify-center",
          "transition-colors duration-200",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-200 dark:border-gray-700"
        )}
      >
        <FolderUp className="h-10 w-10 mb-4 text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          拖拽文件或文件夹到这里
          <br />
          <span className="text-xs">
            支持的文件类型：{formatExtensions(FILE_LIMITS.ALLOWED_EXTENSIONS)}
          </span>
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}