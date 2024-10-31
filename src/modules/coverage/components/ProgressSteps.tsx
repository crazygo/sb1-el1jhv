import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressStepsProps {
  currentStep: number;
  fileCount?: number;
}

const steps = [
  { id: 1, title: '正在探测单测框架' },
  { id: 2, title: '正在运行覆盖率检测程序' },
  { id: 3, title: '正在分析提高方案' },
];

export function ProgressSteps({ currentStep, fileCount }: ProgressStepsProps) {
  return (
    <div className="space-y-4 mb-6">
      {steps.map((step) => (
        <div
          key={step.id}
          className={cn(
            "flex items-center space-x-3 p-3 rounded-lg",
            currentStep === step.id && "bg-primary/5",
            currentStep > step.id && "text-muted-foreground"
          )}
        >
          {currentStep > step.id ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : currentStep === step.id ? (
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-muted" />
          )}
          <div className="flex-grow">
            <span className="text-sm font-medium">
              {step.title}
              {step.id === 1 && currentStep === 1 && fileCount !== undefined && (
                <span className="text-xs ml-2 text-muted-foreground">
                  正在读取 {fileCount} 个文件
                </span>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}