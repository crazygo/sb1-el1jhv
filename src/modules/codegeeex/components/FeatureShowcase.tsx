import React from 'react';
import { cn } from "@/lib/utils";

interface CodeWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function CodeWindow({ title, children, className }: CodeWindowProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden bg-[#1E1E1E] shadow-lg", className)}>
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2D2D2D]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-sm text-gray-400">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export function FeatureShowcase() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">代码补全</h3>
          <p className="text-gray-400">
            在编码过程中提供单行或整个函数的建议，并支持通过注释生成代码片段。
          </p>
          <CodeWindow title="LoginPage.tsx" className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/10">
            <pre className="text-gray-300">
              <span className="text-[#569CD6]">import</span>{" "}
              <span className="text-[#9CDCFE]">React</span>{" "}
              <span className="text-[#569CD6]">from</span>{" "}
              <span className="text-[#CE9178]">"react"</span>;
              {"\n"}
              <span className="text-[#569CD6]">export const</span>{" "}
              <span className="text-[#4EC9B0]">LoginPage</span>{" "}
              <span className="text-[#569CD6]">=</span>{" "}
              () <span className="text-[#569CD6]">{'=>'}</span> {"{"}
              {"\n  "}
              <span className="text-[#6A9955]">// generate a login form</span>
              {"\n"}
              <span className="text-blue-400">{"  "}return</span> (
              {"\n    "}<span className="text-orange-300">{"<form>"}</span>
              {"\n      "}<span className="text-orange-300">{"<input type=\"text\" placeholder=\"Username\" />"}</span>
              {"\n      "}<span className="text-orange-300">{"<input type=\"password\" placeholder=\"Password\" />"}</span>
              {"\n      "}<span className="text-orange-300">{"<button type=\"submit\">Login</button>"}</span>
              {"\n    "}<span className="text-orange-300">{"</form>"}</span>
              {"\n  "});
              {"\n"}
              {"}"};
            </pre>
          </CodeWindow>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">代码生成</h3>
          <p className="text-gray-400">
            我们的编辑器理解自然语言，提供无缝的本地交互，生成准确的代码建议。
          </p>
          <CodeWindow title="requestClient.ts" className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/10">
            <div className="bg-blue-500/10 text-gray-300 p-2 rounded mb-2">
              添加一个基于 axios 的请求客户端，在请求失败时可以重试。
            </div>
            <pre className="text-gray-300">
              <span className="text-[#569CD6]">function</span>{" "}
              <span className="text-[#DCDCAA]">requestClient</span>(
              <span className="text-[#9CDCFE]">options</span>,{" "}
              <span className="text-[#9CDCFE]">retries</span>{" "}
              <span className="text-[#569CD6]">=</span> 3) {"{"}
              {"\n  "}
              <span className="text-[#C586C0]">return</span>{" "}
              <span className="text-[#569CD6]">new</span>{" "}
              <span className="text-[#4EC9B0]">Promise</span>((resolve, reject) {"{"}
              {"\n    "}axios(options)
              {"\n      "}.then(response {"{="} {"{"} resolve(response.data); {"}"})
              {"\n      "}.catch(error {"{="} {"{"}
              {"\n        "}
              <span className="text-[#569CD6]">if</span> (retries {">"} 0) {"{"}
              {"\n          "}requestClient(options, retries - 1);
              {"\n        "}{"}"}
              {"\n        "}
              <span className="text-[#569CD6]">else</span> {"{"}
              {"\n          "}reject(error);
              {"\n        "}{"}"} 
              {"\n      "});
              {"\n  "});
              {"\n"}
              {"}"}
            </pre>
          </CodeWindow>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">代码解释</h3>
          <p className="text-gray-400">
            精确解释项目代码，帮助快速理解开发流程。
          </p>
          <CodeWindow title="AI Explanation" className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/10">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                  <span className="text-xs text-gray-300">用户</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-gray-300">
                  这段代码是如何工作的？
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-xs text-white">AI</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 text-gray-300">
                  这是一个基于 Promise 的 HTTP 请求客户端：
                  <br />1. 接受请求配置和重试次数参数
                  <br />2. 使用 axios 发送请求
                  <br />3. 请求失败时自动重试
                  <br />4. 超过重试次数则返回错误
                </div>
              </div>
            </div>
          </CodeWindow>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Bug 修复</h3>
          <p className="text-gray-400">
            识别代码中的问题，提供智能的优化建议。
          </p>
          <CodeWindow title="Bug Fix" className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/10">
            <div className="bg-red-500/10 text-gray-300 p-2 rounded mb-2">
              修复迭代器中缺少 "key" 属性的问题
            </div>
            <pre className="text-gray-300">
              <span className="text-red-400">- </span>
              {"{"}todos.map((todo) {"{="} {"{"}
              {"\n"}
              <span className="text-red-400">-   </span>
              {"  "}<span className="text-orange-300">{"<ListItem>{todo.text}</ListItem>"}</span>
              {"\n"}
              <span className="text-red-400">- </span>
              {"}"}){"}"}{"\n"}
              <span className="text-green-400">+ </span>
              {"{"}todos.map((todo) {"{="} {"{"}
              {"\n"}
              <span className="text-green-400">+   </span>
              {"  "}<span className="text-orange-300">{"<ListItem key={todo.id}>{todo.text}</ListItem>"}</span>
              {"\n"}
              <span className="text-green-400">+ </span>
              {"}"}){"}"}{"\n"}
            </pre>
          </CodeWindow>
        </div>
      </div>
    </div>
  );
}