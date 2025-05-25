import { memo, useRef, useEffect } from 'react';

const ChatInput = memo(({ inputMessage, isLoading, onInputChange, onSendMessage }) => {
    const inputRef = useRef(null);

    // Focus the input when component mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <form
            onSubmit={onSendMessage}
            className="p-3 border-t border-gray-200 bg-white"
        >
            <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={onInputChange}
                        disabled={isLoading}
                        placeholder="Type your message..."
                        className="w-full p-3 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400 shadow-sm"
                    />
                    {isLoading && (
                        <div className="absolute right-3 top-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className={`flex-shrink-0 p-3 rounded-full ${!isLoading && inputMessage.trim()
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        } transition-all hover:shadow-lg`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </form>
    );
});

export default ChatInput;
