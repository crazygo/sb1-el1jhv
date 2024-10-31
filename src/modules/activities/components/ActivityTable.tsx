import React, { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Activity } from '../types';
import { useActivities } from '../hooks/useActivities';
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
  inactive: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  expired: 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
};

export function ActivityTable() {
  const { items, hasMore, isLoading, loadMore } = useActivities();
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
              <TableHead>活动名称</TableHead>
              <TableHead>活动类型</TableHead>
              <TableHead className="w-[180px]">有效期</TableHead>
              <TableHead className="w-[100px] text-center">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-mono">
                  {format(new Date(activity.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell className="font-mono">
                  {format(new Date(activity.validUntil), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className={cn('capitalize', statusStyles[activity.status])}>
                    {activity.status}
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