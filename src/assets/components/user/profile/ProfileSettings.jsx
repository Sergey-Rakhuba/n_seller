import React, { useState } from 'react';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/footer.jsx';
import './ProfileSettings.css';

export default function ProfileSettings({ onNavigateToHome, onNavigateToFavorites, onNavigateToChat, onNavigateToProfile }) {
    const [formData, setFormData] = useState({
        name: "Иван Иванов",
        email: "ivan@example.com",
        phone: "+7 900 123 45 67",
        company: "AgroFarm Ltd."
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert("Изменения сохранены!");
    };

    return (
        <div className="profile_page">
            <Header 
                onNavigateToHome={onNavigateToHome} 
                onNavigateToFavorites={onNavigateToFavorites}
                onNavigateToChat={onNavigateToChat}
                onNavigateToProfile={onNavigateToProfile}
                isLoggedIn={true}
            />
            <div className="profile_container">
                <h1 className="page_title">Настройки профиля</h1>
                
                <div className="profile_content">
                    <div className="profile_sidebar">
                        <div className="sidebar_menu">
                            <div className="sidebar_item active">Личные данные</div>
                            <div className="sidebar_item">Мои объявления</div>
                            <div className="sidebar_item">Безопасность</div>
                            <div className="sidebar_item">Уведомления</div>
                            <div className="sidebar_item logout">Выйти</div>
                        </div>
                    </div>

                    <div className="profile_form_area">
                        <h2>Личные данные</h2>
                        <form onSubmit={handleSave} className="settings_form">
                            <div className="form_group">
                                <label>Имя Фамилия</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form_group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form_group">
                                <label>Телефон</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="form_group">
                                <label>Компания</label>
                                <input 
                                    type="text" 
                                    name="company" 
                                    value={formData.company} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <button type="submit" className="save_btn">Сохранить изменения</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
