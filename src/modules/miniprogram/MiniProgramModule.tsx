import React from 'react';
import { MessageSquare, FileSpreadsheet, Variable, RefreshCw, ShieldAlert, Database, Upload } from "lucide-react";
import { CommonTools } from './components/CommonTools';
import { Square } from './components/Square';
import { cn } from "@/lib/utils";

export default function MiniProgramModule() {
  const commonTools = [
    { icon: MessageSquare, name: "给项目加注释" },
    { icon: FileSpreadsheet, name: "提高单测覆盖率" },
    { icon: Variable, name: "优化变量名" },
    { icon: RefreshCw, name: "模块重构" },
    { icon: ShieldAlert, name: "漏洞检测" },
    { icon: Database, name: "sql 转 go struct" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className={cn(
        "mx-6 mt-6 border-2 border-dashed rounded-lg",
        "flex items-center justify-center",
        "bg-gray-50 dark:bg-gray-800/50",
        "border-gray-200 dark:border-gray-700",
        "transition-colors duration-200",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "group"
      )}>
        <div className="py-8 flex flex-col items-center text-gray-500 dark:text-gray-400">
          <Upload className="h-8 w-8 mb-2 group-hover:text-primary transition-colors duration-200" />
          <p className="text-sm text-center">
            请把 JSON、JSONL、Word、Excel、Txt 文件拖进来
          </p>
        </div>
      </div>
      <CommonTools tools={commonTools} />
      <Square />
    </div>
  );
}