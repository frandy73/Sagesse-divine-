
import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { SendIcon } from './icons/AppIcons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder')}
        className="flex-1 p-3 border border-gray-300 dark:border-divine-blue-700 rounded-lg focus:ring-2 focus:ring-divine-blue-500 focus:outline-none bg-gray-50 dark:bg-divine-blue-800 resize-none"
        rows={1}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="p-3 bg-divine-blue-600 text-white rounded-lg disabled:bg-divine-blue-300 disabled:dark:bg-divine-blue-800 disabled:cursor-not-allowed hover:bg-divine-blue-700 transition-colors"
      >
        <SendIcon className="h-6 w-6" />
      </button>
    </form>
  );
};

export default ChatInput;
