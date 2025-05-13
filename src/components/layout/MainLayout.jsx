import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />
            <main className="flex-grow w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
