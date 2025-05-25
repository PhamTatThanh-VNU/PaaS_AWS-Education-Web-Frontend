import { useState, useEffect, useRef } from 'react';
import ChatWindow from './ChatWindow';
import chatBotService from '../../services/ChatBotService';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Load chat history when component mounts
    useEffect(() => {
        setMessages(chatBotService.getChatHistory());
    }, []);

    // Scroll to bottom of messages whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const currentMessage = inputMessage;
        setInputMessage('');
        
        const userMessage = {
            role: 'user',
            content: currentMessage,
            timestamp: new Date().toISOString(),
        };        
        setMessages(prevMessages => [...prevMessages, userMessage]);

        setIsLoading(true);

        try {            
            const botResponse = await chatBotService.sendMessage(currentMessage, true);            
            setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);

            // Thêm tin nhắn lỗi
            setMessages(prevMessages => [...prevMessages, {
                role: 'bot',
                content: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.',
                timestamp: new Date().toISOString(),
                error: true
            }]);
        } finally {
            setIsLoading(false);
            // Cuộn xuống sau khi xử lý xong
            setTimeout(scrollToBottom, 100);
        }
    };

    const handleClearHistory = () => {
        chatBotService.clearChatHistory();
        setMessages([]);
    };

    return (
        <div className="fixed right-6 bottom-6 z-50">
            {/* Chat Icon Button */}
            <button
                onClick={toggleChatWindow}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative group animate-pulse"
                aria-label="Open chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {messages.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                                {messages.filter(m => m.role === 'bot' && !m.read).length || ''}
                            </span>
                        )}
                    </>
                )}

                <span className="absolute -top-10 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {isOpen ? 'Close Chat' : 'Open Chat'}
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <ChatWindow
                    messages={messages}
                    inputMessage={inputMessage}
                    isLoading={isLoading}
                    onInputChange={handleInputChange}
                    onSendMessage={handleSendMessage}
                    onClearHistory={handleClearHistory}
                    messagesEndRef={messagesEndRef}
                />
            )}
        </div>
    );
};

export default ChatBot;
