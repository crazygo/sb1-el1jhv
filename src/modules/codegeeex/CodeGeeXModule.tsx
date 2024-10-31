import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Download, Code, GitBranch, FileCode, MessageSquare, Boxes, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FeatureShowcase } from './components/FeatureShowcase';

const menuItems = [
  { name: "首页", href: "#" },
  { name: "下载", href: "#" },
  { name: "模型介绍", href: "#" },
  { name: "博客", href: "#" },
  { name: "使用手册", href: "#" },
];

const features = [
  {
    icon: Code,
    title: "代码自动生成和补全",
    description: "CodeGeeX可以根据自然语言注释描述的功能自动生成代码，也可以根据已有的代码自动生成后续代码，补全当前行或生成后续若干行，帮助你提高编程效率。",
    backContent: "支持多种主流编程语言\n智能上下文理解\n实时代码建议"
  },
  {
    icon: GitBranch,
    title: "代码翻译",
    description: "基于AI大模型对代码进行语义级翻译，支持多种编程语言互译。",
    backContent: "精准的语义理解\n保持代码结构\n跨语言转换"
  },
  {
    icon: FileCode,
    title: "自动添加注释",
    description: "CodeGeeX可以给代码自动添加行级注释，节省大量开发时间，没有注释的历史代码，也不再是问题。",
    backContent: "智能代码分析\n清晰的文档生成\n多语言支持"
  },
  {
    icon: MessageSquare,
    title: "智能问答",
    description: "开发中遇到的技术问题，可直接询问AI提问，无需离开IDE环境，去搜索引擎寻找答案，让开发者更专注地沉浸于开发环境。",
    backContent: "即时技术支持\n上下文感知\n准确的问题解答"
  },
  {
    icon: Boxes,
    title: "更多功能",
    description: "通过快捷命令和提问，可实现更多功能，如解释选中的代码、修正代码中的bug等。",
    backContent: "代码重构建议\n性能优化提示\n安全漏洞检测"
  },
  {
    icon: MessageCircle,
    title: "功能反馈",
    description: <>您有任何问题都可以向我们{" "}<a href="#" className="text-[#00FFE0] hover:underline">提供反馈</a></>,
    backContent: "24/7 支持\n快速响应\n持续改进"
  }
];

export default function CodeGeeXModule() {
  const [text, setText] = useState("");
  const fullText = "每天帮助程序员写 500000 行代码";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <ScrollArea className="h-full">
      <div className="min-h-full bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-white text-xl font-bold">CodeGeeX</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">AI 驱动的编程助手</span>
              </h1>
            </motion.div>

            <div className="mt-8 h-20">
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl font-mono">
                {text}
                <span className="animate-blink">|</span>
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" variant="default" className="gap-2">
                <Play className="h-4 w-4" />
                视频介绍
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                下载插件
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Main Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            高效、全能，尽享编程乐趣
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card h-[300px]">
                <div className="feature-card-inner">
                  <div className="feature-card-front border border-gray-700 rounded-lg p-8 bg-[#0D1117]">
                    <feature.icon className="h-8 w-8 text-[#00FFE0] mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                  <div className="feature-card-back border border-gray-700 rounded-lg p-8">
                    <h3 className="text-white text-xl font-semibold mb-4">{feature.title}</h3>
                    <div className="text-gray-400 whitespace-pre-line">
                      {feature.backContent}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}