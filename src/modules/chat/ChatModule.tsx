import React from 'react';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { useChat } from './hooks/useChat';

export default function ChatModule() {
  const { messages, inputMessage, setInputMessage, handleSendMessage } = useChat();

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} />
      <MessageInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
}