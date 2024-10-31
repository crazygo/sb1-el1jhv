import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-grow px-6 py-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 ${
            message.sender === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block max-w-[80%] p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}