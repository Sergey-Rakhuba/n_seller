import React, { useEffect } from 'react';
import './supportModal.css';
import { useLanguage } from '../../../context/LanguageContext';

export default function SupportModal({ isOpen, onClose }) {
    const { t } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <span className="close_btn" onClick={onClose}>&times;</span>
                <h2>{t('modals.support.title')}</h2>
                <p>{t('modals.support.subtitle')}</p>
                <form>
                    <input type="text" placeholder={t('modals.support.namePlaceholder')} />
                    <input type="email" placeholder={t('modals.support.emailPlaceholder')} />
                    <input type="tel" placeholder={t('modals.support.phonePlaceholder')} />
                    <button type="submit">{t('modals.support.btn')}</button>
                </form>
            </div>
        </div>
    );
}