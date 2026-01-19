import React, { useState, useEffect } from "react";
import SellerCard from "../seller_card/seller_card.jsx";
import FilterSidebar from "./FilterSidebar.jsx";
import { mockProducts } from "../../../../data/mockProducts.js"; // Adjust path as needed
import './search_result.css';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/footer.jsx';

export default function SearchResult({ onSelectAd, onNavigateToHome, onNavigateToFavorites, onNavigateToChat, onNavigateToProfile }) { // Assuming onNavigateToHome might be used later or in Header
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        // Load initial mock data
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        
        // Initial default filter (transport)
         const initialTransport = mockProducts.filter(p => p.category === 'transport');
         setFilteredProducts(initialTransport);
    }, []);

    const handleFilterChange = (filters) => {
        if (!products) return;

        let result = products;

        if (filters.category) {
            result = result.filter(item => item.category === filters.category);
        }

        if (filters.type) {
            result = result.filter(item => item.type === filters.type);
        }

        if (filters.brand && filters.brand.length > 0) {
             result = result.filter(item => filters.brand.some(b => item.brand.toLowerCase().includes(b.toLowerCase())));
        }

         if (filters.country && filters.country.length > 0) {
             result = result.filter(item => filters.country.some(c => item.location.toLowerCase() === c.toLowerCase()));
        }

        if (filters.priceMin) {
            result = result.filter(item => item.price >= filters.priceMin);
        }

        if (filters.priceMax) {
            result = result.filter(item => item.price <= filters.priceMax);
        }
        
         if (filters.yearFrom) {
            result = result.filter(item => item.year >= Number(filters.yearFrom));
        }
         if (filters.yearTo) {
            result = result.filter(item => item.year <= Number(filters.yearTo));
        }

        if (filters.fuel) {
            result = result.filter(item => 
                item.specs && 
                item.specs.fuel && 
                item.specs.fuel.toLowerCase() === filters.fuel.toLowerCase()
            );
        }

        if (filters.transmission) {
            result = result.filter(item => 
                item.specs && 
                item.specs.transmission && 
                item.specs.transmission.toLowerCase() === filters.transmission.toLowerCase()
            );
        }

        if (filters.hoursMax && filters.category === 'agriculture') {
             result = result.filter(item => 
                item.specs && 
                item.specs.mileage <= Number(filters.hoursMax)
            );
        }

        setFilteredProducts(result);
        setVisibleCount(6);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <div className="search_result_container">
            <Header 
                onNavigateToHome={onNavigateToHome}
                onNavigateToFavorites={onNavigateToFavorites}
                onNavigateToChat={onNavigateToChat}
                onNavigateToProfile={onNavigateToProfile}
                isLoggedIn={true}
            />
            <div className="search_result_body">
                <div className="location_page">
                    {/* Breadcrumbs or title could go here */}
                </div>
                <div className="flex_row" style={{ alignItems: 'flex-start', padding: '20px 0' }}>
                    <div className="section_filter">
                        <FilterSidebar onFilterChange={handleFilterChange} />
                    </div>
                    <div className="section_sort" style={{ flex: 1 }}>
                         <div className="results_header" style={{ marginBottom: '20px' }}>
                            <h2>Результаты поиска: {filteredProducts.length}</h2>
                        </div>
                        <div className="results_grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.slice(0, visibleCount).map((ad, index) => (
                                    <div key={ad.id || index} style={{ marginBottom: '0' }}> 
                                        {/* Wrapper div to ensure grid layout works well with SellerCard if it has margins */}
                                        <SellerCard ad={ad} onSelectAd={onSelectAd} />
                                    </div>
                                ))
                            ) : (
                                <p className="no_results_message">По вашему запросу ничего не найдено.</p>
                            )}
                        </div>
                        
                        {filteredProducts.length > visibleCount && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', paddingBottom: '20px' }}>
                                <button 
                                    className="search_btn_main" 
                                    onClick={handleLoadMore}
                                    style={{ minWidth: '200px' }}
                                >
                                    Загрузить ещё
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}