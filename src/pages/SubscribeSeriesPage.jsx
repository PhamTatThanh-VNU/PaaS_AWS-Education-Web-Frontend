import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import SeriesCard from '../components/explore/SeriesCard';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import ErrorAlert from '../components/common/ErrorAlert';
import seriesService from '../services/SeriesService';
import '../styles/SubscribeSeriesPage.css';

const SubscribedSeriesPage = () => {
    const [subscribedSeries, setSubscribedSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubscribedSeries();
    }, []);

    const fetchSubscribedSeries = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await seriesService.getAllSeriesSubscribe();

            // Đảm bảo subscribedSeries luôn là một mảng
            const data = response?.data || response || [];
            setSubscribedSeries(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Không thể tải danh sách series đã đăng ký');
            // Đặt về mảng rỗng khi có lỗi
            setSubscribedSeries([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchSubscribedSeries();
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loading text="Đang tải danh sách series đã đăng ký..." />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout fullWidth>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/20" />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Series <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">Yêu Thích</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Khám phá lại những khóa học bạn đang theo dõi và tiếp tục hành trình học tập của mình
                        </p>

                        {/* Stats */}
                        <div className="flex justify-center items-center space-x-8 text-white/70">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{Array.isArray(subscribedSeries) ? subscribedSeries.length : 0} khóa học đã đăng ký</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                                <span>Học tập cá nhân hóa</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {error && (
                    <div className="mb-8">
                        <ErrorAlert
                            message={error}
                            onRetry={handleRefresh}
                            retryText="Thử lại"
                        />
                    </div>
                )}

                {!error && (!Array.isArray(subscribedSeries) || subscribedSeries.length === 0) ? (
                    <EmptyState
                        icon={
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                        }
                        title="Chưa có series nào được đăng ký"
                        description="Bạn chưa đăng ký theo dõi series nào. Hãy khám phá và đăng ký những khóa học thú vị để bắt đầu hành trình học tập!"
                        actionText="Khám phá series"
                        actionUrl="/explore"
                    />
                ) : (
                    <>
                        {/* Filter and Sort Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Danh sách theo dõi của bạn
                                </h2>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                                    {Array.isArray(subscribedSeries) ? subscribedSeries.length : 0} khóa học
                                </span>
                            </div>

                            <button
                                onClick={handleRefresh}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Làm mới</span>
                            </button>
                        </div>

                        {/* Series Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {Array.isArray(subscribedSeries) && subscribedSeries.map((series, index) => (
                                <div
                                    key={series._id || series.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <SeriesCard series={series} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination could be added here if needed */}
                    </>
                )}
            </div>
        </MainLayout>
    );
};

export default SubscribedSeriesPage;