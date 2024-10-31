import React from 'react';
import { Calendar, Settings, Rocket, MonitorSmartphone, Code2 } from "lucide-react";
import { useNavigate } from "@/hooks/use-navigate";
import { cn } from "@/lib/utils";

const tools = [
  {
    icon: Calendar,
    name: "活动列表",
    tab: "activities"
  },
  {
    icon: Settings,
    name: "灰度配置",
    tab: "gray-config"
  },
  {
    icon: Rocket,
    name: "强制升级",
    tab: "upgrade-config"
  },
  {
    icon: MonitorSmartphone,
    name: "IDE",
    tab: "vscode"
  },
  {
    icon: Code2,
    name: "CodeGeeX",
    tab: "codegeeex"
  }
];

export function Square() {
  const { setActiveTab } = useNavigate();

  return (
    <div className="flex-grow p-6 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">广场</h2>
      <div className="grid grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tool.tab)}
            className={cn(
              "flex flex-col items-center p-4 rounded-lg",
              "bg-white dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700",
              "hover:bg-gray-50 dark:hover:bg-gray-700",
              "transition-colors duration-200"
            )}
          >
            <tool.icon className="h-6 w-6 mb-2 text-gray-600 dark:text-gray-400" />
            <span className="text-xs text-center text-gray-600 dark:text-gray-400">
              {tool.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}