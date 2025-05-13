import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, signOut } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-blue-600">AWS Education</span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <nav className="flex space-x-6 mr-6">
                            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
                            <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Courses</Link>
                            <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Resources</Link>
                        </nav>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                                        <span className="font-medium">My Account</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Dashboard</Link>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Profile</Link>
                                        <Link to="/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">Change Password</Link>
                                        <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col space-y-3 mb-4">
                            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
                            <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Courses</Link>
                            <Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Resources</Link>
                        </nav>

                        {isAuthenticated ? (
                            <div className="flex flex-col space-y-3">
                                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">My Dashboard</Link>
                                <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Profile</Link>
                                <Link to="/change-password" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Change Password</Link>
                                <button onClick={handleSignOut} className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-3">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors focus:outline-none w-full justify-center"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none w-full justify-center"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
