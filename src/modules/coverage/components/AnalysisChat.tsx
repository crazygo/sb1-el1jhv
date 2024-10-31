import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { FileStorage } from '../types';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { runPythonFile } from '../utils/pythonRunner';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  content: React.ReactNode;
  type?: 'code' | 'result';
}

interface AnalysisChatProps {
  fileStorage?: FileStorage | null;
}

function getProjectLanguages(files: FileStorage['files']): string[] {
  const extensions = files.reduce((acc: Set<string>, file) => {
    const ext = file.path.split('.').pop()?.toLowerCase();
    if (ext) acc.add(ext);
    return acc;
  }, new Set<string>());

  return Array.from(extensions);
}

function formatBytes(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
}

export function AnalysisChat({ fileStorage }: AnalysisChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      content: (
        <Card className="p-4 space-y-2 w-full">
          <h3 className="font-medium">项目分析结果</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">项目语言</p>
              <p>{fileStorage ? getProjectLanguages(fileStorage.files).join(', ') : 'Unknown'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">项目大小</p>
              <p>{fileStorage ? formatBytes(fileStorage.totalSize) : '0 Bytes'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">文件数量</p>
              <p>{fileStorage?.totalCount || 0} 个文件</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Python文件</p>
              <p>{fileStorage?.files.filter(f => f.path.endsWith('.py')).length || 0} 个文件</p>
            </div>
          </div>
        </Card>
      ),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: 'user',
        content: input,
        type: 'code'
      }
    ]);

    // 如果输入内容是Python代码，尝试运行它
    if (input.includes('print') || input.includes('def ')) {
      handleRunPython(input);
    }

    setInput('');
  };

  const handleRunPython = async (code: string) => {
    const pythonFile = {
      path: 'temp.py',
      type: 'file' as const,
      content: code,
      size: code.length
    };

    try {
      const result = await runPythonFile(pythonFile);
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'ai',
          content: result.success ? (
            <pre className="bg-secondary p-3 rounded-lg overflow-x-auto">
              <code>{result.output || '(No output)'}</code>
            </pre>
          ) : (
            <Alert variant="destructive">
              <AlertDescription>
                {result.error || 'Failed to run Python code'}
              </AlertDescription>
            </Alert>
          ),
          type: 'result'
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'ai',
          content: (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to execute Python code
              </AlertDescription>
            </Alert>
          ),
          type: 'result'
        }
      ]);
    }
  };

  const handleRunFile = async (file: FileStorage['files'][0]) => {
    try {
      const result = await runPythonFile(file);
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'ai',
          content: result.success ? (
            <pre className="bg-secondary p-3 rounded-lg overflow-x-auto">
              <code>{result.output || '(No output)'}</code>
            </pre>
          ) : (
            <Alert variant="destructive">
              <AlertDescription>
                {result.error || 'Failed to run Python file'}
              </AlertDescription>
            </Alert>
          ),
          type: 'result'
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'ai',
          content: (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to execute Python file
              </AlertDescription>
            </Alert>
          ),
          type: 'result'
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8 bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
                    <path d="M21 3v9h-9" />
                  </svg>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-lg p-3'
                    : message.type === 'result'
                    ? 'w-full'
                    : 'flex-grow'
                }`}
              >
                {message.content}
              </div>
              {message.sender === 'user' && message.type === 'code' && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRunPython(message.content as string)}
                  className="ml-2"
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入Python代码..."
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        />
        <Button size="icon" onClick={handleSend}>
          <Send className="h-4 w-4" />
          <span className="sr-only">发送</span>
        </Button>
      </div>

      {fileStorage && fileStorage.files.some(f => f.path.endsWith('.py')) && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Python文件:</h4>
          <div className="space-y-2">
            {fileStorage.files
              .filter(f => f.path.endsWith('.py'))
              .map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-secondary rounded-lg p-2">
                  <span className="text-sm truncate">{file.path}</span>
                  <Button size="sm" variant="ghost" onClick={() => handleRunFile(file)}>
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}