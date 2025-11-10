
import React from 'react';
import { useI18n } from '../hooks/useI18n';
import { Language, Theme } from '../types';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';
import { BookOpenIcon } from './icons/AppIcons';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { language, setLanguage, t } = useI18n();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-divine-blue-900 shadow-md transition-colors duration-300">
      <div className="flex items-center space-x-3">
        <BookOpenIcon className="h-8 w-8 text-divine-blue-700 dark:text-divine-blue-300" />
        <h1 className="text-xl md:text-2xl font-serif font-bold text-divine-blue-800 dark:text-divine-blue-200">
          {t('title')}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-divine-blue-300 dark:border-divine-blue-700 rounded-full">
          <button
            onClick={() => handleLanguageChange('fr')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              language === 'fr' ? 'bg-divine-blue-700 text-white' : 'text-divine-blue-700 dark:text-divine-blue-300'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => handleLanguageChange('ht')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              language === 'ht' ? 'bg-divine-blue-700 text-white' : 'text-divine-blue-700 dark:text-divine-blue-300'
            }`}
          >
            HT
          </button>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-divine-blue-800 transition-colors">
          {theme === 'light' ? <MoonIcon className="h-6 w-6 text-divine-blue-800" /> : <SunIcon className="h-6 w-6 text-yellow-400" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
