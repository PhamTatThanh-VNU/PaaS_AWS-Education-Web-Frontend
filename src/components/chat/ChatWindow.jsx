import { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatWindow = ({
    messages,
    inputMessage,
    isLoading,
    onInputChange,
    onSendMessage,
    onClearHistory,
    messagesEndRef
}) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-white font-medium">EduConnect Assistant</h3>
                        <span className="text-white/70 text-xs">Ask me anything</span>
                    </div>
                </div>
                <button
                    onClick={toggleSettings}
                    className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </button>
            </div>

            {/* Settings Dropdown */}
            {isSettingsOpen && (
                <div className="absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-100">
                    <button
                        onClick={() => {
                            onClearHistory();
                            setIsSettingsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear Chat History
                    </button>
                </div>
            )}

            {/* Message List */}
            <MessageList messages={messages} messagesEndRef={messagesEndRef} isLoading={isLoading} />

            {/* Input Area */}
            <ChatInput
                inputMessage={inputMessage}
                isLoading={isLoading}
                onInputChange={onInputChange}
                onSendMessage={onSendMessage}
            />
        </div>
    );
};

export default ChatWindow;
