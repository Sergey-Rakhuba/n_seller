import React, { useState, useEffect } from 'react';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/footer.jsx';
import './ProductDetails.css';

export default function ProductDetails({ product, onNavigateBack, onContactSeller, onNavigateToHome, onNavigateToFavorites, onNavigateToChat, onNavigateToProfile }) {
    if (!product) return <div>Product not found</div>;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === product.id));

        // Add to Recently Viewed
        addToRecentlyViewed(product);
    }, [product]);

    const addToRecentlyViewed = (product) => {
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        // Remove if already exists to move it to the top/front
        const filtered = viewed.filter(p => p.id !== product.id);
        // Add to beginning
        filtered.unshift(product);
        // Keep only last 10
        const trimmed = filtered.slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(trimmed));
    };

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (isFavorite) {
            const newFavorites = favorites.filter(fav => fav.id !== product.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            setIsFavorite(false);
        } else {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    const specs = [
        { label: 'Категория', value: product.category },
        { label: 'Тип', value: product.type },
        { label: 'Марка', value: product.brand },
        { label: 'Модель', value: product.model },
        { label: 'Год выпуска', value: product.year },
        { label: 'Пробег', value: `${product.specs.mileage} км` },
        { label: 'Мощность', value: product.specs.power },
        { label: 'Топливо', value: product.specs.fuel },
        { label: 'Местоположение', value: product.location },
    ];

    return (
        <div className="product_details_page">
            <Header 
                onNavigateToHome={onNavigateToHome}
                onNavigateToFavorites={onNavigateToFavorites}
                onNavigateToChat={onNavigateToChat}
                onNavigateToProfile={onNavigateToProfile}
                isLoggedIn={true}
            />
            <div className="product_details_container">
                <div className="details_content">
                    <button className="back_btn" onClick={onNavigateBack}>
                        ← Назад к результатам
                    </button>

                    <div className="product_main_info">
                        <div className="product_image_block">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="product_info_block">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h1 className="product_title">{product.title}</h1>
                                <button 
                                    onClick={toggleFavorite}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '24px',
                                        padding: '5px'
                                    }}
                                    title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                                >
                                    {isFavorite ? '❤️' : '🤍'}
                                </button>
                            </div>
                            <div className="product_price">€ {product.price.toLocaleString()}</div>
                            
                            <div className="product_meta">
                                <div className="meta_item">
                                    <span>📍</span> {product.location}
                                </div>
                                <div className="meta_item">
                                    <span>id:</span> {product.id}
                                </div>
                            </div>

                            <div className="action_buttons">
                                <button className="contact_seller_btn" onClick={() => onContactSeller(product)}>Связаться с продавцом</button>
                                <button className="contact_seller_btn" style={{backgroundColor: '#fff', color: '#009661', border: '1px solid #009661'}}>
                                    Предложить свою цену
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="product_specs_section">
                        <h2 className="section_title">Характеристики</h2>
                        <div className="specs_grid">
                            {specs.map((spec, index) => (
                                <div className="spec_item" key={index}>
                                    <span className="spec_label">{spec.label}</span>
                                    <span className="spec_value">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product_description_section">
                        <h2 className="section_title">Описание</h2>
                        <p style={{lineHeight: '1.6', color: '#444'}}>
                            Продается надежный {product.title}. Техника находится в отличном состоянии, 
                            регулярно проходила техническое обслуживание. Один владелец. 
                            Готова к эксплуатации без дополнительных вложений. 
                            Возможен торг при осмотре.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
