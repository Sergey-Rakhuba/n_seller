import React, { useState, useEffect } from 'react';
import './FilterSidebar.css';

export default function FilterSidebar({ onFilterChange }) {
    // Accordion state
    const [openSections, setOpenSections] = useState({
        main: true,
        price: true,
        details: true,
        tech: false
    });

    // Filter values state
    const [filters, setFilters] = useState({
        category: 'transport', // 'transport', 'agriculture', 'construction', 'warehouse'
        type: '',       // 'truck', 'car', 'tractor', etc.
        priceMin: 0,
        priceMax: 500000,
        brand: [],
        model: '',
        yearFrom: '',
        yearTo: '',
        country: [],
        transmission: '',
        fuel: '',
        hoursMax: ''
    });

    // Sub-accordion state for inner filters
    const [subSections, setSubSections] = useState({
        brand: false,
        country: false
    });

    const toggleSubSection = (section) => {
        setSubSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const categories = [
        { value: 'transport', label: 'Транспорт' },
        { value: 'agriculture', label: 'Сельхозтехника' },
        { value: 'construction', label: 'Строительная техника' },
        { value: 'warehouse', label: 'Складское оборудование' }
    ];

    const typesMap = {
        transport: [
            { value: 'truck', label: 'Грузовой транспорт' },
            { value: 'car', label: 'Легковой транспорт' },
            { value: 'motorcycle', label: 'Мотоциклы' }
        ],
        agriculture: [
            { value: 'tractor', label: 'Тракторы' },
            { value: 'combine', label: 'Комбайны' },
            { value: 'general', label: 'Прочее' }
        ],
        construction: [
            { value: 'excavator', label: 'Экскаваторы' },
            { value: 'crane', label: 'Краны' },
            { value: 'general', label: 'Прочее' }
        ],
        warehouse: [
            { value: 'forklift', label: 'Погрузчики' },
            { value: 'general', label: 'Прочее' }
        ]
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        
        // Reset type if category changes
        if (key === 'category') {
            newFilters.type = '';
        }

        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleMultiSelectChange = (key, value) => {
        const currentValues = filters[key] || [];
        let newValues;
        
        if (currentValues.includes(value)) {
            newValues = currentValues.filter(v => v !== value);
        } else {
            newValues = [...currentValues, value];
        }
        
        handleFilterChange(key, newValues);
    };

    return (
        <div className="product_filter_sidebar">
            <h3>Фильтры</h3>
            
            {/* Category Section */}
            <div className="filter_section">
                <div className="filter_header" onClick={() => toggleSection('main')}>
                    <span>Тип техники</span>
                    <span>{openSections.main ? '−' : '+'}</span>
                </div>
                <div className={`filter_content ${openSections.main ? 'open' : ''}`}>
                    <div className="filter_group">
                        <label>Раздел</label>
                        <select 
                            value={filters.category} 
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>

                    <div className="filter_group">
                        <label>Вид техники</label>
                        <select 
                            value={filters.type} 
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            disabled={!filters.category}
                        >
                            <option value="">Все</option>
                            {filters.category && typesMap[filters.category]?.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Price Section */}
            <div className="filter_section">
                <div className="filter_header" onClick={() => toggleSection('price')}>
                    <span>Цена</span>
                    <span>{openSections.price ? '−' : '+'}</span>
                </div>
                <div className={`filter_content ${openSections.price ? 'open' : ''}`}>
                    <div className="price_range_inputs">
                        <input 
                            type="number" 
                            placeholder="От" 
                            value={filters.priceMin} 
                            onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
                        />
                        <input 
                            type="number" 
                            placeholder="До" 
                            value={filters.priceMax} 
                            onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
                        />
                    </div>
                    <div className="price_slider_container">
                        <div className="slider_track"></div>
                         <div 
                            className="slider_range"
                            style={{
                                left: `${(filters.priceMin / 500000) * 100}%`,
                                width: `${((filters.priceMax - filters.priceMin) / 500000) * 100}%`
                            }}
                        ></div>
                        <input 
                            type="range" 
                            min="0" 
                            max="500000" 
                            value={filters.priceMin}
                            onChange={(e) => {
                                const val = Math.min(Number(e.target.value), filters.priceMax - 1000);
                                handleFilterChange('priceMin', val);
                            }}
                        />
                         <input 
                            type="range" 
                            min="0" 
                            max="500000" 
                            value={filters.priceMax}
                            onChange={(e) => {
                                const val = Math.max(Number(e.target.value), filters.priceMin + 1000);
                                handleFilterChange('priceMax', val);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Details Section (Dynamic) */}
            <div className="filter_section">
                <div className="filter_header" onClick={() => toggleSection('details')}>
                    <span>Характеристики</span>
                    <span>{openSections.details ? '−' : '+'}</span>
                </div>
                <div className={`filter_content ${openSections.details ? 'open' : ''}`}>
                    
                    {/* Brand Sub-Accordion */}
                    <div className="sub_filter_accordion">
                        <div className="sub_filter_header" onClick={() => toggleSubSection('brand')}>
                            <span>Марка</span>
                            <span>{subSections.brand ? '−' : '+'}</span>
                        </div>
                        {subSections.brand && (
                            <div className="sub_filter_content">
                                {['Volvo', 'Scania', 'MAN', 'John Deere', 'CAT', 'Toyota', 'Mercedes', 'BMW', 'Honda'].map(brand => (
                                    <div className="checkbox_row" key={brand}>
                                        <input 
                                            type="checkbox" 
                                            id={`brand-${brand}`}
                                            checked={filters.brand.includes(brand)}
                                            onChange={() => handleMultiSelectChange('brand', brand)}
                                        />
                                        <label htmlFor={`brand-${brand}`}>{brand}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Country Sub-Accordion */}
                    <div className="sub_filter_accordion">
                        <div className="sub_filter_header" onClick={() => toggleSubSection('country')}>
                            <span>Страна</span>
                            <span>{subSections.country ? '−' : '+'}</span>
                        </div>
                        {subSections.country && (
                            <div className="sub_filter_content">
                                {['Germany', 'Poland', 'Netherlands', 'France', 'Belgium'].map(country => (
                                    <div className="checkbox_row" key={country}>
                                        <input 
                                            type="checkbox" 
                                            id={`country-${country}`}
                                            checked={filters.country.includes(country)}
                                            onChange={() => handleMultiSelectChange('country', country)}
                                        />
                                        <label htmlFor={`country-${country}`}>{country}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="filter_group">
                         <label>Год выпуска</label>
                         <div className="price_range_inputs">
                            <input 
                                type="number" 
                                placeholder="С" 
                                value={filters.yearFrom}
                                onChange={(e) => handleFilterChange('yearFrom', e.target.value)} 
                            />
                            <input 
                                type="number" 
                                placeholder="По" 
                                value={filters.yearTo}
                                onChange={(e) => handleFilterChange('yearTo', e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Specs (Dynamic based on Category) */}
            <div className="filter_section">
                 <div className="filter_header" onClick={() => toggleSection('tech')}>
                    <span>Технические данные</span>
                    <span>{openSections.tech ? '−' : '+'}</span>
                </div>
                <div className={`filter_content ${openSections.tech ? 'open' : ''}`}>
                    {filters.category === 'transport' && (
                        <>
                             <div className="filter_group">
                                <label>Коробка передач</label>
                                <select 
                                     value={filters.transmission} 
                                     onChange={(e) => handleFilterChange('transmission', e.target.value)}
                                >
                                    <option value="">Любая</option>
                                    <option value="manual">МКПП</option>
                                    <option value="auto">АКПП</option>
                                </select>
                            </div>
                             <div className="filter_group">
                                <label>Топливо</label>
                                <select
                                     value={filters.fuel} 
                                     onChange={(e) => handleFilterChange('fuel', e.target.value)}
                                >
                                    <option value="">Любое</option>
                                    <option value="diesel">Дизель</option>
                                    <option value="petrol">Бензин</option>
                                    <option value="electric">Электро</option>
                                </select>
                            </div>
                        </>
                    )}

                    {filters.category === 'agriculture' && (
                         <div className="filter_group">
                            <label>Моточасы (до)</label>
                            <input 
                                type="number" 
                                placeholder="Макс. часов" 
                                value={filters.hoursMax || ''}
                                onChange={(e) => handleFilterChange('hoursMax', e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>

            <button className="apply_filters_btn">Применить фильтры</button>
        </div>
    );
}
