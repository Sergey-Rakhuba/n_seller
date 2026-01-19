import { useState } from 'react'
import Lending from './assets/components/lending/lending.jsx';
import Registration from './assets/components/registration/reg.jsx';
import Home from './assets/components/user/home/home.jsx';
import SearchResult from './assets/components/seller/search_result/search_result.jsx';
import ProductDetails from './assets/components/seller/product_details/ProductDetails.jsx';
import Chat from './assets/components/user/chat/Chat.jsx';
import Favorites from './assets/components/user/favorites/Favorites.jsx';
import ProfileSettings from './assets/components/user/profile/ProfileSettings.jsx';
import './App.css'
import { LanguageProvider } from './context/LanguageContext.jsx';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('lending');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [chatContext, setChatContext] = useState(null);

  const navigateToRegistration = () => {
    setCurrentPage('registration');
  };

  const navigateToLending = () => {
    setCurrentPage('lending');
  }

  const navigateToHome = () => {
    setCurrentPage('home');
  }
  
  const navigateToSearchResult = () => {
    setCurrentPage('searchResult');
  }

  const navigateToFavorites = () => {
    setCurrentPage('favorites');
  }

  const navigateToProfile = () => {
    setCurrentPage('profileSettings');
  }

  const navigateToProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetails');
  }

  const navigateToChat = (product = null) => {
    if (product) {
      setChatContext({ product });
    }
    setCurrentPage('chat');
  }

  const navigateBackFromChat = () => {
    if (selectedProduct) {
      setCurrentPage('productDetails');
    } else {
      setCurrentPage('home');
    }
  }

  return (
    <>
      {currentPage === 'lending' && <Lending onNavigateToRegistration={navigateToRegistration} onNavigateToHome={navigateToHome} />}
      {currentPage === 'registration' && <Registration onNavigateToHome={navigateToHome} />}
      {currentPage === 'home' && <Home onNavigateToRegistration={navigateToRegistration} onNavigateToHome={navigateToHome} onNavigateToSearchResult={navigateToSearchResult} onNavigateToFavorites={navigateToFavorites} onNavigateToChat={() => navigateToChat()} onNavigateToProfile={navigateToProfile} />}
      
      {currentPage === 'searchResult' && <SearchResult 
        onNavigateToHome={navigateToHome} 
        onSelectAd={navigateToProductDetails}
        onNavigateToFavorites={navigateToFavorites}
        onNavigateToChat={() => navigateToChat()}
        onNavigateToProfile={navigateToProfile}
      />}
      
      {currentPage === 'productDetails' && <ProductDetails 
        product={selectedProduct} 
        onNavigateBack={navigateToSearchResult} 
        onContactSeller={navigateToChat}
        onNavigateToHome={navigateToHome} 
        onNavigateToFavorites={navigateToFavorites}
        onNavigateToChat={() => navigateToChat()}
        onNavigateToProfile={navigateToProfile}
      />}
      
      {currentPage === 'chat' && <Chat 
        initialChatContext={chatContext} 
        onNavigateBack={navigateBackFromChat} 
        onNavigateToHome={navigateToHome} 
        onNavigateToFavorites={navigateToFavorites}
        onNavigateToChat={() => navigateToChat()}
        onNavigateToProfile={navigateToProfile}
      />}
      
      {currentPage === 'favorites' && <Favorites 
        onNavigateToHome={navigateToHome} 
        onSelectAd={navigateToProductDetails} 
        onNavigateToFavorites={navigateToFavorites}
        onNavigateToChat={() => navigateToChat()}
        onNavigateToProfile={navigateToProfile}
      />}
      
      {currentPage === 'profileSettings' && <ProfileSettings 
        onNavigateToHome={navigateToHome} 
        onNavigateToFavorites={navigateToFavorites} 
        onNavigateToChat={() => navigateToChat()} 
        onNavigateToProfile={navigateToProfile} 
      />}
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
