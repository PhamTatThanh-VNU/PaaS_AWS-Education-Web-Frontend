import { memo } from 'react';
import ChatMessage from './ChatMessage';

const MessageList = memo(({ messages, messagesEndRef, isLoading }) => {    
    if (messages.length === 0) {
        return (
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Welcome to EduConnect Assistant</h3>
                    <p className="text-gray-500 text-sm">
                        Ask me anything about courses, learning resources, or how to use the platform!
                    </p>
                    <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                        <p className="text-sm text-indigo-700">
                            <span className="font-medium">Tip:</span> Try asking about course recommendations, study techniques, or technical support.
                        </p>
                    </div>
                    <div className="mt-2 p-3 bg-purple-50 border border-purple-100 rounded-lg">
                        <p className="text-sm text-purple-700">
                            <span className="font-medium">Pro Tip:</span> This chat supports <code className="bg-purple-100 px-1 py-0.5 rounded">Markdown</code> formatting! Try using *italics*, **bold**, `code`, and more.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
                <div className="flex justify-start animate-message-appear">
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white text-gray-800 border border-gray-100 shadow-sm">
                        <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-600">EduConnect đang soạn trả lời</div>
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-typing-dots" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-typing-dots" style={{ animationDelay: '200ms' }}></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-typing-dots" style={{ animationDelay: '400ms' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
});

export default MessageList;
