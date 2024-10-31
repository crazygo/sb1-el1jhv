import React, { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { UpgradeConfig } from '../types';
import { useUpgradeConfigs } from '../hooks/useUpgradeConfigs';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';

const statusStyles = {
  active: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  inactive: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
};

const platformStyles = {
  ios: 'bg-blue-500/10 text-blue-500',
  android: 'bg-green-500/10 text-green-500',
  all: 'bg-purple-500/10 text-purple-500'
};

export function UpgradeConfigTable() {
  const { items, hasMore, isLoading, loadMore } = useUpgradeConfigs();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[180px]">创建时间</TableHead>
              <TableHead>版本号</TableHead>
              <TableHead className="w-[100px]">平台</TableHead>
              <TableHead className="w-[100px] text-center">强制升级</TableHead>
              <TableHead>最低版本</TableHead>
              <TableHead>描述</TableHead>
              <TableHead className="w-[100px] text-center">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((config) => (
              <TableRow key={config.id}>
                <TableCell className="font-mono">
                  {format(new Date(config.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell className="font-mono">{config.version}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn('capitalize', platformStyles[config.platform])}>
                    {config.platform}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={config.forceUpgrade ? "destructive" : "secondary"}>
                    {config.forceUpgrade ? '是' : '否'}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{config.minVersion}</TableCell>
                <TableCell>{config.description}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className={cn('capitalize', statusStyles[config.status])}>
                    {config.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div
        ref={observerTarget}
        className="h-4 w-full flex items-center justify-center p-4"
      >
        {isLoading && (
          <div className="animate-pulse text-sm text-muted-foreground">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
}