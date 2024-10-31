import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Tool {
  icon: LucideIcon;
  name: string;
}

interface CommonToolsProps {
  tools: Tool[];
}

export function CommonTools({ tools }: CommonToolsProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">置顶</h2>
      <div className="grid grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-900 
              border border-gray-200 dark:border-gray-700 
              hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-colors duration-200"
          >
            <tool.icon className="h-6 w-6 mb-2 text-gray-600 dark:text-gray-400" />
            <span className="text-xs text-center text-gray-600 dark:text-gray-400">{tool.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}