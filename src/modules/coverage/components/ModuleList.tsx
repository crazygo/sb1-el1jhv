import React from 'react';

const modules = ['用户认证模块', '数据处理服务', 'API 接口层'];

export function ModuleList() {
  return (
    <div className="flex-grow">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">建议改进的模块：</h3>
      <ul className="space-y-3">
        {modules.map((item, index) => (
          <li key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}