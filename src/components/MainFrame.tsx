import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MiniProgramModule from '@/modules/miniprogram/MiniProgramModule';
import ChatModule from '@/modules/chat/ChatModule';
import TestCoverageModule from '@/modules/coverage/TestCoverageModule';
import ActivitiesModule from '@/modules/activities/ActivitiesModule';
import GrayConfigModule from '@/modules/config/GrayConfigModule';
import UpgradeConfigModule from '@/modules/config/UpgradeConfigModule';
import VSCodeModule from '@/modules/vscode/VSCodeModule';
import CodeGeeXModule from '@/modules/codegeeex/CodeGeeXModule';
import { useNavigate } from '@/hooks/use-navigate';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MainFrame() {
  const { activeTab, setActiveTab, visibleTabs, removeTab, defaultTabs, isTabCloseable } = useNavigate();

  const handleDoubleClick = (tab: string) => {
    removeTab(tab);
  };

  const renderTab = (tab: string, label: string) => {
    const TabContent = (
      <TabsTrigger 
        value={tab}
        onDoubleClick={() => handleDoubleClick(tab)}
        className="relative group"
      >
        {label}
        {isTabCloseable(tab) && (
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 dark:bg-white/10 rounded-md">
            双击关闭
          </span>
        )}
      </TabsTrigger>
    );

    return TabContent;
  };

  return (
    <div className="h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] mx-auto border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-background shadow-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full p-1 bg-gray-100 dark:bg-gray-800 border-b border-border" style={{ 
          gridTemplateColumns: `repeat(${3 + visibleTabs.length}, minmax(0, 1fr))`
        }}>
          {defaultTabs.includes('miniprogram') && renderTab('miniprogram', '小程序')}
          {defaultTabs.includes('chat') && renderTab('chat', '对话')}
          {defaultTabs.includes('coverage') && renderTab('coverage', '提高单测覆盖率')}
          {visibleTabs.includes('activities') && renderTab('activities', '活动列表')}
          {visibleTabs.includes('gray-config') && renderTab('gray-config', '灰度配置列表')}
          {visibleTabs.includes('upgrade-config') && renderTab('upgrade-config', '配置强制升级')}
          {visibleTabs.includes('vscode') && renderTab('vscode', 'VSCode')}
          {visibleTabs.includes('codegeeex') && renderTab('codegeeex', 'CodeGeeX')}
        </TabsList>
        <TabsContent value="miniprogram" className="flex-grow overflow-hidden mt-0">
          <MiniProgramModule />
        </TabsContent>
        <TabsContent value="chat" className="flex-grow overflow-hidden mt-0">
          <ChatModule />
        </TabsContent>
        <TabsContent value="coverage" className="flex-grow overflow-hidden mt-0">
          <TestCoverageModule />
        </TabsContent>
        <TabsContent value="activities" className="flex-grow overflow-hidden mt-0">
          <ActivitiesModule />
        </TabsContent>
        <TabsContent value="gray-config" className="flex-grow overflow-hidden mt-0">
          <GrayConfigModule />
        </TabsContent>
        <TabsContent value="upgrade-config" className="flex-grow overflow-hidden mt-0">
          <UpgradeConfigModule />
        </TabsContent>
        <TabsContent value="vscode" className="flex-grow overflow-hidden mt-0">
          <VSCodeModule />
        </TabsContent>
        <TabsContent value="codegeeex" className="flex-grow overflow-hidden mt-0">
          <CodeGeeXModule />
        </TabsContent>
      </Tabs>
    </div>
  );
}