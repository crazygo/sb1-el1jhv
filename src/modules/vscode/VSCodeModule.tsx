import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Code2, Zap, Box, Puzzle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function VSCodeModule() {
  return (
    <div className="h-full overflow-auto">
      <div className="relative h-[200px] bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-grid-white/[0.1]" />
        <Code2 className="h-20 w-20 text-white" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Visual Studio Code</h1>
          <p className="text-muted-foreground">
            轻量且强大的代码编辑器，为现代开发而生
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="mt-4">
                <Download className="mr-2 h-4 w-4" />
                下载 VSCode
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>下载 Visual Studio Code</DialogTitle>
                <DialogDescription>
                  选择适合你的操作系统版本进行下载
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  VSCode for Windows x64
                </Button>
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  VSCode for macOS Universal
                </Button>
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  VSCode for Linux x64
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogDescription>
                  所有版本均为最新稳定版 1.87.0
                </DialogDescription>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <Zap className="h-8 w-8 text-blue-500" />
            <h3 className="font-semibold">快速且轻量</h3>
            <p className="text-sm text-muted-foreground">
              启动迅速，响应灵敏，让你专注于代码创作
            </p>
          </div>
          <div className="space-y-2">
            <Box className="h-8 w-8 text-blue-500" />
            <h3 className="font-semibold">跨平台支持</h3>
            <p className="text-sm text-muted-foreground">
              支持 Windows、macOS 和 Linux，随时随地编码
            </p>
          </div>
          <div className="space-y-2">
            <Puzzle className="h-8 w-8 text-blue-500" />
            <h3 className="font-semibold">丰富的扩展</h3>
            <p className="text-sm text-muted-foreground">
              海量插件生态，按需扩展你的开发工具
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">系统要求</h2>
          <div className="grid gap-4 text-sm">
            <div>
              <span className="font-medium">Windows:</span> Windows 8, 10, 11
            </div>
            <div>
              <span className="font-medium">macOS:</span> High Sierra (10.13+)
            </div>
            <div>
              <span className="font-medium">Linux:</span> Ubuntu 16.04, Fedora 24, Debian 9
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}