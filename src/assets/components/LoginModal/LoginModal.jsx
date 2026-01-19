import React, { useEffect } from 'react';
import './loginModal.css';
import { useLanguage } from '../../../context/LanguageContext';

export default function LoginModal({ isOpen, onClose, onLogin }) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle real authentication
        if (onLogin) onLogin();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="login_modal_overlay" onClick={onClose}>
            <div className="login_modal_content" onClick={(e) => e.stopPropagation()}>
                <button style={{width: "16px", height: "16px", fontSize: "20px", background: "none", border: "none", padding: "0"}} className="login_close_btn" onClick={onClose}>&times;</button>
                <h2>{t('modals.login.title')}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                    <input type="email" placeholder={t('modals.login.emailPlaceholder')} required />
                    <input type="password" placeholder={t('modals.login.passwordPlaceholder')} required />
                    <div className="flex_row">
                        <input style={{width: "16px", height: "16px",  margin: "auto 16px auto 0"}} className='checkbox_login' type="checkbox" />
                        <p>{t('modals.login.rememberMe')}</p>
                    </div>
                    
                    <button type="submit" className="login_btn">{t('modals.login.btn')}</button>
                </form>
            </div>
        </div>
    );
}
