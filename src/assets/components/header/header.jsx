import React, { useState } from 'react';
import './header.css';
import LoginModal from '../LoginModal/LoginModal.jsx';
import { useLanguage } from '../../../context/LanguageContext';

export default function Header({ onNavigateToRegistration, onNavigateToProfile, onNavigateToHome, onNavigateToFavorites, onNavigateToChat, isLoggedIn = true }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const handleProfileClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            setIsProfileMenuOpen(!isProfileMenuOpen);
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const handleMenuItemClick = (action) => {
        setIsProfileMenuOpen(false);
        if (action === 'favorites') onNavigateToFavorites && onNavigateToFavorites();
        if (action === 'messages') onNavigateToChat && onNavigateToChat();
        if (action === 'settings') onNavigateToProfile && onNavigateToProfile();
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <>
            <header className="header_wrapper">
                <div className="header_container">
                    {/* 1. Логотип */}
                    <div className="header_logo">
                        {t('header.logo')}
                    </div>

                    {/* 2. Выбор языка, валюты и поиск */}
                    <div className="header_controls">
                        <div className="selector_group">
                            <select 
                                className="custom_select" 
                                name="language" 
                                id="lang-select" 
                                value={language}
                                onChange={handleLanguageChange}
                            >
                                <option value="ru">Ru</option>
                                <option value="en">En</option>
                            </select>
                            <select className="custom_select" name="currency" id="curr-select">
                                <option value="rub">RUB</option>
                                <option value="usd">USD</option>
                                <option value="eur">EUR</option>
                            </select>
                        </div>
                        <button className="search_btn" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* 3. Ссылки Мой профиль и Стать продавцом */}
                    <div className="header_actions" style={{ position: 'relative' }}>
                        <button 
                            className="action_link" 
                            style={{background: 'none', border: 'none', cursor: 'pointer', fontSize:'20px', display:'flex', alignItems:'center', marginRight:'15px', padding: 0}}
                            onClick={() => onNavigateToFavorites && onNavigateToFavorites()}
                            title={t('favorites') || "Избранное"}
                        >
                            ❤️
                        </button>
                        <a href="#" className="action_link" onClick={handleProfileClick}>
                            {t('header.profile')}
                        </a>
                        
                        {isProfileMenuOpen && (
                            <div className="profile_dropdown">
                                <div className="dropdown_item" onClick={() => handleMenuItemClick('favorites')}>
                                    <span>❤️</span> Избранное
                                </div>
                                <div className="dropdown_item" onClick={() => handleMenuItemClick('messages')}>
                                    <span>📩</span> Сообщения <span className="badge">4</span>
                                </div>
                                <div className="dropdown_item" onClick={() => handleMenuItemClick('settings')}>
                                    <span>⚙️</span> Настройки профиля
                                </div>
                            </div>
                        )}

                        <button 
                            className="btn_seller" 
                            onClick={() => onNavigateToHome && onNavigateToHome()}
                        >
                            {t('header.becomeSeller')}
                        </button>
                    </div>
                </div>
            </header>
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
                onLogin={() => {
                    if (onNavigateToHome) onNavigateToHome();
                }}
            />
        </>
    );
}
