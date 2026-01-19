import React, { useState, useEffect, useRef } from 'react';
import Header from '../../header/Header.jsx';
import Footer from '../../footer/footer.jsx';
import './Chat.css';

export default function Chat({ currentUser, initialChatContext, onNavigateToHome, onNavigateBack, onNavigateToFavorites, onNavigateToChat, onNavigateToProfile }) {
    // initialChatContext contains { product, sellerId, etc. } passed from ProductDetails
    
    // Mock Data for Chats
    const [chats, setChats] = useState([
        { id: 1, sellerName: "AgroTech GmbH", lastMessage: "Здравствуйте, трактор еще в наличии?", time: "10:30", active: true },
        { id: 2, sellerName: "Ivan Ivanov", lastMessage: "Цена окончательная?", time: "Вчера", active: false },
        { id: 3, sellerName: "Petr Petrov", lastMessage: "Где можно посмотреть?", time: "Пн", active: false },
    ]);

    const [selectedChatId, setSelectedChatId] = useState(1);

    // Mock Messages Database
    const allMessages = {
        1: [
            { id: 1, text: "Добрый день! Меня интересует ваше объявление.", sender: "me", time: "10:00" },
            { id: 2, text: "Здравствуйте! Да, слушаю вас.", sender: "seller", time: "10:05" },
            { id: 3, text: "В каком состоянии гидравлика?", sender: "me", time: "10:06" },
            { id: 4, text: "Гидравлика полностью исправна, заменили насос месяц назад.", sender: "seller", time: "10:15" },
        ],
        2: [
            { id: 1, text: "Цена окончательная?", sender: "me", time: "Вчера" },
            { id: 2, text: "Да, цена окончательная. Торга нет.", sender: "seller", time: "Вчера" },
        ],
        3: [
            { id: 1, text: "Где можно посмотреть технику?", sender: "me", time: "Пн" },
        ]
    };

    const [messages, setMessages] = useState(allMessages[1]);
    const activeChat = chats.find(c => c.id === selectedChatId) || chats[0];

    // If a product context is passed, ensure a chat exists or is highlighted
    useEffect(() => {
        if (initialChatContext && initialChatContext.product) {
            // Logic to check if chat exists, if not create placeholder
            // For now, we'll just simulate selecting the first chat or "New Chat" logic
        }
    }, [initialChatContext]);

    const handleSelectChat = (id) => {
        setSelectedChatId(id);
        setMessages(allMessages[id] || []);
        setChats(prev => prev.map(chat => ({...chat, active: chat.id === id})));
    };

    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputText("");
    };

    return (
        <div className="chat_page">
            <Header 
                onNavigateToHome={onNavigateToHome}
                onNavigateToFavorites={onNavigateToFavorites}
                onNavigateToChat={onNavigateToChat}
                onNavigateToProfile={onNavigateToProfile}
                isLoggedIn={true}
            />
            
            <div style={{maxWidth: '1200px', margin: '20px auto 0', width: '95%'}}>
                <button onClick={onNavigateBack} className="back_btn">
                    ← Назад
                </button>
            </div>

            <div className="chat_container">
                {/* Conversations Sidebar */}
                <div className="chat_sidebar">
                    <div className="chat_sidebar_header">
                        Сообщения
                    </div>
                    <div className="chat_list">
                        {chats.map(chat => (
                            <div 
                                key={chat.id} 
                                className={`chat_list_item ${chat.id === selectedChatId ? 'active' : ''}`}
                                onClick={() => handleSelectChat(chat.id)}
                            >
                                <div className="avatar_circle">
                                    {chat.sellerName.charAt(0)}
                                </div>
                                <div className="chat_info">
                                    <div className="chat_name">{chat.sellerName}</div>
                                    <div className="chat_preview">{chat.lastMessage}</div>
                                </div>
                                <div className="time_info" style={{fontSize: '11px', color: '#999'}}>
                                    {chat.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Chat Window */}
                <div className="chat_main">
                    <div className="chat_header">
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                             <div className="avatar_circle" style={{background: '#009661', color: 'white'}}>
                                {activeChat?.sellerName.charAt(0)}
                            </div>
                            <div>
                                <h3 style={{margin: 0, fontSize: '16px'}}>{activeChat?.sellerName}</h3>
                                <span style={{fontSize: '12px', color: '#00af70'}}>В сети</span>
                            </div>
                        </div>

                        {initialChatContext?.product && (
                            <div className="product_snippet">
                                <img src={initialChatContext.product.image} alt="product" />
                                <div>
                                    <div style={{fontWeight: 'bold'}}>{initialChatContext.product.title}</div>
                                    <div style={{color: '#009661'}}>€ {initialChatContext.product.price.toLocaleString()}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="messages_area">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                {msg.text}
                                <div className="message_time">{msg.time}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="input_area" onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            className="chat_input" 
                            placeholder="Напишите сообщение..." 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <button type="submit" className="send_btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
