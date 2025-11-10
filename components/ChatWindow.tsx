
import React, { useState, useEffect, useRef } from 'react';
import { Message as MessageType, Role, Intention } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { useI18n } from '../hooks/useI18n';
import Message from './Message';
import ChatInput from './ChatInput';
import IntentionSelector from './IntentionSelector';
import { v4 as uuidv4 } from 'uuid';

const ChatWindow: React.FC = () => {
  const { t, language } = useI18n();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIntention, setCurrentIntention] = useState<Intention>(Intention.PASTORAL);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  useEffect(() => {
    setMessages([
        { id: 'welcome-msg', role: Role.MODEL, content: t('welcomeMessage'), quickActions: false }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);


  const handleSendMessage = async (input: string, intention: Intention = currentIntention) => {
    if (!input.trim()) return;

    const userMessage: MessageType = { id: uuidv4(), role: Role.USER, content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const modelMessageId = uuidv4();
    // Add a placeholder for the model's response
    setMessages(prev => [...prev, { id: modelMessageId, role: Role.MODEL, content: '', quickActions: false }]);

    try {
      const stream = await sendMessageStream(input, language, intention);
      
      let fullResponse = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId ? { ...msg, content: fullResponse } : msg
        ));
      }

      // Add quick actions once the full response is received
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId ? { ...msg, quickActions: true } : msg
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessageContent = 'Désolé, une erreur est survenue. Veuillez réessayer.';
      // Update the placeholder with an error message
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId ? { ...msg, content: errorMessageContent } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
           <Message key={msg.id} message={msg} onQuickAction={handleQuickAction} isLastMessage={index === messages.length - 1} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white dark:bg-divine-blue-900 border-t border-gray-200 dark:border-divine-blue-800">
         <IntentionSelector currentIntention={currentIntention} onIntentionChange={setCurrentIntention} onIntentionSelect={(intentionText) => handleSendMessage(intentionText)} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
