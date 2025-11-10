
import React from 'react';
import { Message as MessageType, Role } from '../types';
import { UserIcon, SparklesIcon } from './icons/AppIcons';
import { useI18n } from '../hooks/useI18n';

interface MessageProps {
  message: MessageType;
  onQuickAction: (action: string) => void;
  isLastMessage: boolean;
}

const parseResponse = (content: string) => {
    const sections: { title: string; body: string }[] = [];
    const lines = content.split('\n');
    let currentTitle = '';
    let currentBody = '';
    
    lines.forEach(line => {
        if (line.startsWith('### ')) {
            if (currentTitle) {
                sections.push({ title: currentTitle, body: currentBody.trim() });
            }
            currentTitle = line.replace('### ', '').trim();
            currentBody = '';
        } else if (line.startsWith('---')) {
             if (currentTitle) {
                sections.push({ title: currentTitle, body: currentBody.trim() });
            }
            currentTitle = '---';
            currentBody = '';
        }
        else {
            currentBody += line + '\n';
        }
    });
    if (currentTitle) {
        sections.push({ title: currentTitle, body: currentBody.trim() });
    }
    
    return sections;
};

const QuickActionButton: React.FC<{ onClick: () => void, children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="text-sm bg-divine-blue-100 dark:bg-divine-blue-700 text-divine-blue-800 dark:text-divine-blue-200 px-3 py-1 rounded-full hover:bg-divine-blue-200 dark:hover:bg-divine-blue-600 transition-colors">
        {children}
    </button>
);


const Message: React.FC<MessageProps> = ({ message, onQuickAction, isLastMessage }) => {
  const { t } = useI18n();
  const isUser = message.role === Role.USER;
  const sections = isUser ? [] : parseResponse(message.content);

  const quickActions = [
    { key: 'moreVerses', label: t('quickActions.moreVerses') },
    { key: 'prayer', label: t('quickActions.prayer') },
    { key: 'actionPlan', label: t('quickActions.actionPlan') },
  ];
  
  if (isUser) {
    return (
      <div className="flex justify-end items-start gap-3">
        <div className="bg-divine-blue-600 text-white p-3 rounded-lg max-w-lg shadow">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="bg-divine-blue-200 dark:bg-divine-blue-700 p-2 rounded-full">
            <UserIcon className="h-6 w-6 text-divine-blue-700 dark:text-divine-blue-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start items-start gap-3">
       <div className="bg-divine-gold-500 p-2 rounded-full mt-2">
            <SparklesIcon className="h-6 w-6 text-white" />
       </div>
      <div className="bg-white dark:bg-divine-blue-800 p-4 rounded-lg max-w-2xl shadow">
        {sections.length > 0 ? (
            <div className="space-y-4 font-serif">
                {sections.map(({ title, body }, index) => {
                    if (title === '---') {
                         return <hr key={index} className="border-gray-300 dark:border-gray-600"/>;
                    }
                    if (title.toLowerCase().includes('alerte de sagesse')) {
                        return (
                             <div key={index} className="p-3 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200">
                                <h4 className="font-bold">{title}</h4>
                                <p className="mt-1 text-sm">{body}</p>
                            </div>
                        )
                    }
                     if (title.toLowerCase().includes('ancrage biblique')) {
                        return (
                             <div key={index}>
                                <h4 className="font-sans font-bold text-divine-blue-800 dark:text-divine-blue-200">{title}</h4>
                                <blockquote className="mt-2 border-l-4 border-divine-blue-300 dark:border-divine-blue-600 pl-4 italic text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{body}</blockquote>
                            </div>
                        )
                    }
                    return (
                        <div key={index}>
                            <h4 className="font-sans font-bold text-divine-blue-800 dark:text-divine-blue-200">{title}</h4>
                            <p className="mt-1 whitespace-pre-wrap">{body}</p>
                        </div>
                    )
                })}
            </div>
        ) : (
             <p className="whitespace-pre-wrap font-serif">{message.content}</p>
        )}
        
        {isLastMessage && message.quickActions && (
            <div className="mt-4 flex flex-wrap gap-2">
                {quickActions.map(action => (
                    <QuickActionButton key={action.key} onClick={() => onQuickAction(action.label)}>
                        {action.label}
                    </QuickActionButton>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Message;
