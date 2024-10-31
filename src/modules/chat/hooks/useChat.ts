import { useState } from 'react';
import { Message } from '../types';

const initialMessages: Message[] = [
  { id: 1, sender: "bot", content: "你好！有什么我可以帮助你的吗？" },
  { id: 2, sender: "user", content: "你能告诉我今天的天气吗？" },
  { id: 3, sender: "bot", content: "对不起，我是一个简单的聊天界面演示，没有实时天气信息。不过，我建议你查看当地的天气预报网站或应用来获取准确的天气信息。" },
  { id: 4, sender: "user", content: "明白了，谢谢你的建议。" },
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "user", content: inputMessage }]);
      setInputMessage("");
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
  };
}