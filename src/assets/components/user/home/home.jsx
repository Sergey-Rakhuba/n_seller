import React, { useState } from 'react';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/footer.jsx';
import Card from '../../card/card.jsx';
import Slider from '../../slider/slider.jsx';
import FilterGrid from './FilterGrid.jsx';
import { transportFilters, agricultureFilters, constructionFilters, warehouseFilters } from './filtersData.js';
import { useLanguage } from '../../../../context/LanguageContext';
import './home.css';

export default function Home({ onNavigateToRegistration, onNavigateToHome, onNavigateToSearchResult, onNavigateToFavorites, onNavigateToChat, onNavigateToProfile }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('ads');

    return (
        <div className='home_body'>
             <Header 
                onNavigateToRegistration={onNavigateToRegistration} 
                onNavigateToHome={onNavigateToHome} 
                onNavigateToFavorites={onNavigateToFavorites}
                onNavigateToChat={onNavigateToChat}
                onNavigateToProfile={onNavigateToProfile}
                isLoggedIn={true}
            />
            <div className="home_pag">
                <section>
                    <div className="container">
                        <div className="flex_btw align-ctr home_srch-block">
                            <div className="home_srch">
                                <div className="home_srch-tabs flex_row home_bg-color">
                                    <div
                                        className={`home_srch-tab ${activeTab === 'ads' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('ads')}
                                    >
                                        {t('home.tabs.transport')}
                                    </div>
                                    <div
                                        className={`home_srch-tab ${activeTab === 'messages' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('messages')}
                                    >
                                        {t('home.tabs.agriculture')}
                                    </div>
                                    <div
                                        className={`home_srch-tab ${activeTab === 'subscription' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('subscription')}
                                    >
                                        {t('home.tabs.construction')}
                                    </div>
                                    <div
                                        className={`home_srch-tab ${activeTab === 'settings' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('settings')}
                                    >
                                        {t('home.tabs.warehouse')}
                                    </div>
                                </div>

                                {activeTab === 'ads' && (
                                    <div className="home_srch-itm_card home_bg-color">
                                        <div className="auto_search">
                                            <FilterGrid filters={transportFilters} />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'messages' && (
                                    <div className="home_srch-itm_card home_bg-color">
                                        <div className="auto_search">
                                            <FilterGrid filters={agricultureFilters} />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'subscription' && (
                                    <div className="home_srch-itm_card home_bg-color">
                                        <div className="auto_search">
                                            <FilterGrid filters={constructionFilters} />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'settings' && (
                                    <div className="home_srch-itm_card home_bg-color">
                                        <div className="auto_search">
                                            <FilterGrid filters={warehouseFilters} />
                                        </div>
                                    </div>
                                )}

                            </div>
                            <div className="home_srch ">
                                <div className="home_srch-itm_card home_bg-color">
                                    <Card />
                                </div>
                            </div>

                        </div>

                        <div className="home_srch">
                            <button className="search_btn_main" onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToSearchResult();
                            }}>{t('home.searchBtn')}</button>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="home_top-block ">
                            <h1>{t('home.topAds')}</h1>
                            <div className="top_content flex_row flex_btw align-ctr flex_wrap">
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />

                            </div>
                            <div className="home_srch">
                                <button className='search_btn_main'>{t('home.showMore')}</button>
                            </div>
                        </div>
                    </div>

                </section>
                <section>
                    <div className="container">
                        <div className="home_sall-block  flex_ctr align-ctr">
                            <div className="sall_content">
                                
                                <h1>{t('home.sellers.title')}</h1>
                                <p>{t('home.sellers.subtitle')}</p>
                                <br />
                                <button  className='search_btn_main'>{t('home.sellers.btn')}</button>

                            </div>
                            <div className="sall_content grid_row flex_btw align-ctr flex_wrap">
                                <div className="item_img"><img src="../../../../public/partners/logo1.png" alt="" /></div>
                                <div className="item_img"><img src="../../../../public/partners/logo2.png" alt="" /></div>
                                <div className="item_img"><img src="../../../../public/partners/logo3.png" alt="" /></div>
                                <div className="item_img"><img src="../../../../public/partners/logo4.png" alt="" /></div>

                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container1">
                        <Slider title={t('home.recentlyViewed')} />
                    </div>
                </section>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  
                </div>
            </div >
            <Footer />
        </div >
    );
}
