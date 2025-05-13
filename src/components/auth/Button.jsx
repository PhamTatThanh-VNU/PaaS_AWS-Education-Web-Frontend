const Button = ({
    children,
    type = 'button',
    onClick = () => { },
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    className = '',
    isLoading = false,
}) => {
    // Variant styles
    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
        danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
    };

    // Size styles
    const sizeClasses = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-3',
        large: 'px-6 py-4 text-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''} 
        rounded-md font-semibold transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
        transform hover:translate-y-[-1px] active:translate-y-[1px]
        ${className}
      `}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    );
};

export default Button;
