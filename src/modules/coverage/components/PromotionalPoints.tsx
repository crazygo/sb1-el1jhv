import React from 'react';
import { Beaker, Play, FileCode } from 'lucide-react';

const points = [
  {
    icon: Beaker,
    text: '适配你的单测框架'
  },
  {
    icon: Play,
    text: '自动运行覆盖率检测并提高'
  },
  {
    icon: FileCode,
    text: '自动扩充测试用例'
  }
];

export function PromotionalPoints() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {points.map((point, index) => (
        <div 
          key={index}
          className="flex flex-col items-center text-center p-2"
        >
          <point.icon className="h-5 w-5 mb-2 text-primary" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {point.text}
          </span>
        </div>
      ))}
    </div>
  );
}