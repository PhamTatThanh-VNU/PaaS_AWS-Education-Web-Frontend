import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { getUserById } from '../services/UserService';
import SeriesService from '../services/SeriesService';
import Loading from '../components/common/Loading';
import ErrorAlert from '../components/common/ErrorAlert';

const InstructorProfile = () => {
    const { instructorId, seriesId } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        instructor: null,
        series: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));

                // Fetch instructor info
                const instructorData = await getUserById(instructorId);
                const instructor = instructorData.data || instructorData;

                // Fetch instructor's series
                let instructorSeries = [];
                try {
                    const allSeries = await SeriesService.getAllSeries();
                    instructorSeries = allSeries.filter(series => series.serie_user === instructorId && series.isPublish);
                } catch (error) {
                    console.warn('Could not fetch instructor series:', error);
                }

                setState(prev => ({
                    ...prev,
                    instructor,
                    series: instructorSeries,
                    loading: false,
                    error: null
                }));
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Không thể tải thông tin giảng viên'
                }));
            }
        };

        if (instructorId) {
            fetchInstructorData();
        }
    }, [instructorId]);

    const handleBackToSeries = () => {
        if (seriesId) {
            navigate(`/series/${seriesId}`);
        } else {
            navigate(-1);
        }
    };

    const { instructor, series, loading, error } = state;

    if (loading) {
        return (
            <MainLayout>
                <Loading text="Đang tải thông tin giảng viên..." />
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <ErrorAlert message={error} />
                </div>
            </MainLayout>
        );
    }

    if (!instructor) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    <ErrorAlert message="Không tìm thấy thông tin giảng viên" />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Header with back button */}
                <div className="bg-white/90 backdrop-blur-xl border-b border-white/30 sticky top-0 z-10 shadow-lg">
                    <div className="container mx-auto px-4 py-4">
                        <button
                            onClick={handleBackToSeries}
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/90 to-white/70 hover:from-white hover:to-white/90 text-gray-700 hover:text-gray-900 rounded-2xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 rounded-xl flex items-center justify-center transition-all duration-300">
                                <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </div>
                            <span className="font-semibold">Quay lại</span>
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Instructor Profile Header - Enhanced with Better Contrast */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8 relative">
                        {/* Enhanced Cover Background with Better Contrast */}
                        <div className="h-40 bg-gradient-to-r from-slate-800 via-gray-900 to-black relative overflow-hidden">
                            {/* Animated Background Elements */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-4 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                                <div className="absolute top-12 right-12 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-300"></div>
                                <div className="absolute bottom-8 left-16 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-700"></div>
                                <div className="absolute bottom-6 right-20 w-20 h-20 bg-white/5 rounded-full animate-pulse delay-1000"></div>
                            </div>

                            {/* Gradient Overlays for Better Depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30"></div>
                        </div>

                        <div className="relative px-8 pb-8 bg-white">
                            {/* Enhanced Avatar Section */}
                            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 -mt-20 relative z-10">
                                <div className="relative group">
                                    {/* Main Avatar with Better Shadow */}
                                    <div className="w-36 h-36 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                                        <span className="relative z-10">{instructor.name?.charAt(0).toUpperCase() || 'U'}</span>
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                                    </div>

                                    {/* Enhanced Status Badge */}
                                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full border-4 border-white flex items-center justify-center shadow-xl">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>

                                    {/* Floating Ring Animation */}
                                    <div className="absolute inset-0 rounded-full border-2 border-blue-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                                </div>

                                <div className="flex-1 lg:mb-4">
                                    <div className="mb-6">
                                        {/* Improved Title with Better Contrast */}
                                        <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                                            {instructor.name || 'Người dùng'}
                                        </h1>

                                        {/* Better Email Display */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>
                                            <p className="text-lg text-gray-700 font-medium">
                                                {instructor.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Enhanced Badges with Better Visibility */}
                                    <div className="flex flex-wrap gap-4">
                                        <span className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 rounded-2xl text-sm font-semibold shadow-md border-2 border-emerald-200 hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 transition-all duration-300">
                                            <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            Tài khoản đã xác minh
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {[
                            {
                                title: 'Khóa học',
                                value: series.length,
                                icon: '📚',
                                color: 'blue',
                                description: 'Tổng số khóa học đã tạo',
                                gradient: 'from-blue-400 to-blue-600'
                            },
                            {
                                title: 'Học viên',
                                value: series.reduce((total, s) => total + (s.studentsCount || 0), 0),
                                icon: '👥',
                                color: 'green',
                                description: 'Tổng số học viên đã theo dõi',
                                gradient: 'from-emerald-400 to-green-600'
                            },
                            {
                                title: 'Lượt xem',
                                value: series.reduce((total, s) => total + (s.viewCount || 0), 0),
                                icon: '👀',
                                color: 'purple',
                                description: 'Tổng lượt xem các khóa học',
                                gradient: 'from-purple-400 to-indigo-600'
                            }
                        ].map((stat, index) => (
                            <div key={index} className="group bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                {/* Background Animation */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                {/* Floating Elements */}
                                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 border border-white/20`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                                                {stat.value.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                                        {stat.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>

                                {/* Subtle Bottom Border Animation */}
                                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.gradient} w-0 group-hover:w-full transition-all duration-500`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced Instructor's Courses Section */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-8 left-8 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-8 right-8 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        Khóa học của giảng viên
                                    </h2>
                                    <p className="text-gray-600 mt-1">Danh sách các khóa học do giảng viên tạo ra</p>
                                </div>
                            </div>

                            {series.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Chưa có khóa học nào</h3>
                                    <p className="text-gray-600 text-lg">Giảng viên này chưa tạo khóa học nào.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {series.map((course) => (
                                        <div key={course._id} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl border border-white/50 hover:border-blue-200/50 hover:-translate-y-2 relative overflow-hidden">
                                            {/* Course Background Animation */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <div className="relative z-10">
                                                <div className="flex items-start gap-4 mb-6">
                                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        {course.serie_title?.charAt(0).toUpperCase() || 'K'}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-800 transition-colors duration-300 line-clamp-2">
                                                            {course.serie_title || course.title}
                                                        </h3>
                                                        <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm rounded-xl font-medium border border-blue-200 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                                                            {course.serie_category || 'Chung'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                    {course.serie_description || 'Không có mô tả'}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-3 h-3 rounded-full ${course.isPublish ? 'bg-green-500' : 'bg-yellow-500'} shadow-sm`}></div>
                                                        <span className={`text-sm font-medium ${course.isPublish ? 'text-green-700' : 'text-yellow-700'}`}>
                                                            {course.isPublish ? 'Đã xuất bản' : 'Bản nháp'}
                                                        </span>
                                                    </div>

                                                    <button
                                                        onClick={() => navigate(`/series/${course._id}`)}
                                                        className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        Xem chi tiết
                                                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default InstructorProfile;
