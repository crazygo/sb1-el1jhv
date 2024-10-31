import React from 'react';
import { Progress } from "@/components/ui/progress";

interface CoverageDisplayProps {
  coverage: number;
}

export function CoverageDisplay({ coverage }: CoverageDisplayProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-600 dark:text-gray-400">当前覆盖率：</p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{coverage}%</p>
      </div>
      <Progress value={coverage} className="w-full h-2" />
    </div>
  );
}