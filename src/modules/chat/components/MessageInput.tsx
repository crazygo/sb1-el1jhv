import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex space-x-2"
      >
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="输入消息..."
          className="flex-grow"
        />
        <Button type="submit" size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
          <span className="sr-only">发送</span>
        </Button>
      </form>
    </div>
  );
}