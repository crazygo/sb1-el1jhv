import React, { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { GrayConfig } from '../types';
import { useGrayConfigs } from '../hooks/useGrayConfigs';
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

export function GrayConfigTable() {
  const { items, hasMore, isLoading, loadMore } = useGrayConfigs();
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
              <TableHead>配置名称</TableHead>
              <TableHead>配置键</TableHead>
              <TableHead>配置值</TableHead>
              <TableHead>描述</TableHead>
              <TableHead className="w-[100px] text-right">灰度比例</TableHead>
              <TableHead className="w-[100px] text-center">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((config) => (
              <TableRow key={config.id}>
                <TableCell className="font-mono">
                  {format(new Date(config.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>{config.name}</TableCell>
                <TableCell className="font-mono">{config.key}</TableCell>
                <TableCell className="font-mono">{config.value}</TableCell>
                <TableCell>{config.description}</TableCell>
                <TableCell className="text-right">{config.percentage}%</TableCell>
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