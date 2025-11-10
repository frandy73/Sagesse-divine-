
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';
import { I18nProvider } from './hooks/useI18n';
import { Language, Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <I18nProvider language={language} setLanguage={setLanguage}>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-divine-blue-950 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 overflow-hidden">
          <ChatWindow />
        </main>
      </div>
    </I18nProvider>
  );
}

export default App;
