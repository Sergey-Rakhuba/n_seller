import React from 'react';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/footer.jsx';

export default function UserPage({ onNavigateToRegistration, onNavigateToHome }) {
    return (
        <div>
            <Header onNavigateToRegistration={onNavigateToRegistration} onNavigateToHome={onNavigateToHome} />
            <div style={{ minHeight: '80vh', padding: '100px 0', textAlign: 'center' }}>
                <h1>User Page</h1>
            </div>
            <Footer />
        </div>
    );
}