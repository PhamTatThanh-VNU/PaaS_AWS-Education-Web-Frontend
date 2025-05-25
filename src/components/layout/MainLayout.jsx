import Header from './Header';
import Footer from './Footer';
import ChatBot from '../chat/ChatBot';

const MainLayout = ({ children, fullWidth = false }) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />
            <main className={`flex-grow w-full ${!fullWidth && 'container mx-auto px-4 py-6'}`}>
                {children}
            </main>
            <Footer />
            <ChatBot />
        </div>
    );
};

export default MainLayout;
