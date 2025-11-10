
import React from 'react';
import { Intention } from '../types';
import { useI18n } from '../hooks/useI18n';

interface IntentionSelectorProps {
    currentIntention: Intention;
    onIntentionChange: (intention: Intention) => void;
    onIntentionSelect: (intentionText: string) => void;
}

const IntentionSelector: React.FC<IntentionSelectorProps> = ({ onIntentionChange, onIntentionSelect }) => {
    const { t } = useI18n();
    const intentions = Object.values(Intention);

    const handleSelect = (intention: Intention) => {
        onIntentionChange(intention);
        onIntentionSelect(t(`intentions.${intention}`));
    }

    return (
        <div className="mb-3">
            <div className="flex flex-wrap gap-2">
                {intentions.map((intention) => (
                    <button
                        key={intention}
                        onClick={() => handleSelect(intention)}
                        className="text-sm bg-divine-blue-50 dark:bg-divine-blue-800 text-divine-blue-700 dark:text-divine-blue-200 px-3 py-1.5 rounded-full hover:bg-divine-blue-100 dark:hover:bg-divine-blue-700 transition-colors border border-divine-blue-200 dark:border-divine-blue-700"
                    >
                        {t(`intentions.${intention}`)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IntentionSelector;
