import React, { useState, useEffect } from 'react';
import './slider.css';
import SellerCard from '../seller/seller_card/seller_card.jsx';

export default function Slider({ title = "Недавно просмотренные" }) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [slidesPerPage, setSlidesPerPage] = useState(4);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        // Load from LocalStorage
        const loadSlides = () => {
            const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            setSlides(viewed);
        };

        loadSlides();
        // Listen for storage changes if needed
        window.addEventListener('storage', loadSlides);
        return () => window.removeEventListener('storage', loadSlides);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setSlidesPerPage(1);
            } else if (window.innerWidth <= 768) {
                setSlidesPerPage(2);
            } else {
                setSlidesPerPage(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        if (currentSlideIndex < slides.length - slidesPerPage) {
            setCurrentSlideIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    if (slides.length === 0) return null;

    return (
        <div className="home_remember-block home_bg-color flex_row flex_btw align-ctr slider_section">
            <div className="remember_content">
                <div className="remember_left">
                    <h3>{title}</h3>
                    <div className="slider_controls">
                        <button 
                            className="slider_btn" 
                            onClick={prevSlide} 
                            disabled={currentSlideIndex === 0}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button 
                            className="slider_btn" 
                            onClick={nextSlide} 
                            disabled={currentSlideIndex >= slides.length - slidesPerPage}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="remember_right">
                    <div 
                        className="slider_track" 
                        style={{ transform: `translateX(-${currentSlideIndex * (100 / slidesPerPage)}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div 
                                className="slider_item" 
                                key={index}
                                style={{ flex: `0 0 ${100 / slidesPerPage}%`, maxWidth: `${100 / slidesPerPage}%`, padding: '0 10px', boxSizing: 'border-box' }}
                            >
                                <SellerCard ad={slide} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
