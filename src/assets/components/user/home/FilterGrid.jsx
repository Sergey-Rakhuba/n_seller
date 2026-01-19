import React from 'react';
import { useLanguage } from '../../../../context/LanguageContext';

export default function FilterGrid({ filters = [] }) {
    const { t } = useLanguage();

    if (!filters || filters.length === 0) return null;

    return (
        <div className="filters_grid">
            {filters.map((filter, index) => (
                <div className="grid_itm flex_column" key={index}>
                    <span>{t(filter.label)}</span>
                    <select defaultValue="" onClick={(e) => e.stopPropagation()}>
                        <option value="" disabled> </option>
                        {filter.options.map((opt, i) => (
                            <option key={i} value={opt.value}>
                                {opt.translate ? t(opt.label) : opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}