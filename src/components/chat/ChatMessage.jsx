import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = memo(({ message }) => {
    const { role, content, timestamp, error } = message;
    const isUser = role === 'user';

    const formattedTime = new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-message-appear`}>
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : error
                        ? 'bg-red-50 text-red-700 border border-red-100'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-sm'
                    }`}
            >
                <div className={`text-sm break-words markdown-content ${isUser ? 'markdown-light' : 'markdown-dark'}`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Customize heading styles
                            h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-2" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-base font-bold my-1" {...props} />,
                            // Customize link styles
                            a: ({ node, ...props }) => <a className={`${isUser ? 'text-white underline' : 'text-indigo-600 hover:text-indigo-800'}`} target="_blank" rel="noopener noreferrer" {...props} />,
                            // Customize code block styles
                            code: ({ node, inline, ...props }) =>
                                inline
                                    ? <code className={`px-1 py-0.5 rounded text-xs ${isUser ? 'bg-indigo-800 text-white' : 'bg-gray-200 text-gray-800'}`} {...props} />
                                    : <code className={`block p-2 rounded text-xs my-2 ${isUser ? 'bg-indigo-800 text-white' : 'bg-gray-200 text-gray-800'}`} {...props} />,
                            // Customize list styles
                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                            // Customize table styles
                            table: ({ node, ...props }) => <table className="border-collapse border border-gray-300 my-2" {...props} />,
                            tr: ({ node, ...props }) => <tr className="border border-gray-300" {...props} />,
                            td: ({ node, ...props }) => <td className="border border-gray-300 px-2 py-1" {...props} />,
                            th: ({ node, ...props }) => <th className="border border-gray-300 px-2 py-1 bg-gray-100" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
                <div className={`text-xs ${isUser ? 'text-indigo-200' : 'text-gray-500'} mt-1 flex items-center`}>
                    {formattedTime}
                    {isUser && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ChatMessage;
