import React, { createContext, useState, useContext } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru'); // Default language

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (let k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Return key if translation missing
            }
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
