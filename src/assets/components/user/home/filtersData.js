export const transportFilters = [
    {
        label: 'home.filters.category',
        options: [
            { value: 'cat1', label: 'home.filters.options.tractor', translate: true },
            { value: 'cat2', label: 'home.filters.options.trailer', translate: true },
        ]
    },
    {
        label: 'home.filters.country',
        options: [
            { value: 'de', label: 'home.filters.options.germany', translate: true },
            { value: 'pl', label: 'home.filters.options.poland', translate: true },
        ]
    },
    {
        label: 'home.filters.brand',
        options: [
            { value: 'volvo', label: 'Volvo', translate: false },
            { value: 'daf', label: 'DAF', translate: false },
        ]
    },
    {
        label: 'home.filters.model',
        options: []
    },
    {
        label: 'home.filters.year',
        options: [
            { value: '2023', label: '2023', translate: false },
            { value: '2020', label: '2020', translate: false },
        ]
    },
    {
        label: 'home.filters.price',
        options: [
            { value: '50000', label: '50 000', translate: false },
            { value: '100000', label: '100 000', translate: false },
        ]
    },
    {
        label: 'home.filters.mileage',
        options: [
            { value: '3500', label: '3 500', translate: false },
            { value: '20000', label: '20 000', translate: false },
        ]
    },
    {
        label: 'home.filters.weight',
        options: [
            { value: '3500', label: '3 500', translate: false },
            { value: '20000', label: '20 000', translate: false },
        ]
    },
];

// Exporting copies for other tabs for now - these can be customized individually later
export const agricultureFilters = [...transportFilters]; 
export const constructionFilters = [...transportFilters];
export const warehouseFilters = [
    
     {
        label: 'home.filters.category',
        options: [
            { value: 'cat1', label: 'home.filters.options.tractor', translate: true },
            { value: 'cat2', label: 'home.filters.options.trailer', translate: true },
        ]
    },
    {
        label: 'home.filters.country',
        options: [
            { value: 'de', label: 'home.filters.options.germany', translate: true },
            { value: 'pl', label: 'home.filters.options.poland', translate: true },
            { value: 'ua', label: 'home.filters.options.germany', translate: true },
            { value: 'uk', label: 'home.filters.options.poland', translate: true },
        ]
    },
    {
        label: 'home.filters.brand',
        options: [
            { value: 'volvo', label: 'Volvo', translate: false },
            { value: 'daf', label: 'DAF', translate: false },
            { value: 'reno', label: 'Reno', translate: false },
            { value: 'mersedes-bens', label: 'Mersedes-Bens', translate: false },
        ]
    },
    {
        label: 'home.filters.model',
        options: []
    },
    {
        label: 'home.filters.year',
        options: [
            { value: '2023', label: '2023', translate: false },
            { value: '2020', label: '2020', translate: false },
        ]
    },
    {
        label: 'home.filters.price',
        options: [
            { value: '50000', label: '50 000', translate: false },
            { value: '100000', label: '100 000', translate: false },
        ]
    },
    {
        label: 'home.filters.mileage',
        options: [
            { value: '3500', label: '3 500', translate: false },
            { value: '20000', label: '20 000', translate: false },
        ]
    },
    {
        label: 'home.filters.weight',
        options: [
            { value: '3500', label: '3 500', translate: false },
            { value: '20000', label: '20 000', translate: false },
        ]
    },
];