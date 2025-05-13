import { useState } from 'react';

const FormInput = ({
    id,
    label,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    error = '',
    required = false,
    autoComplete = 'on',
    icon = null,
}) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className={`relative rounded-md shadow-sm ${error ? 'ring-1 ring-red-500' : ''}`}>
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    name={id}
                    type={type}
                    autoComplete={autoComplete}
                    required={required}
                    className={`block w-full px-4 py-3 ${icon ? 'pl-10' : ''} 
                    rounded-md border-2 focus:outline-none 
                    ${focused ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'} 
                    ${error ? 'border-red-500 text-red-900 placeholder-red-300' : 'placeholder-gray-400'}
                    transition-all duration-300 bg-white shadow-sm
                    hover:shadow focus:shadow-md`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;
