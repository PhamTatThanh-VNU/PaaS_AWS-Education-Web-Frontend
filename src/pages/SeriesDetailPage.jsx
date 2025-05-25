import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import SeriesService from '../services/SeriesService';
import LessonService from '../services/LessonService';
import Loading from '../components/common/Loading';
import ErrorAlert from '../components/common/ErrorAlert';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import CreateLessonModal from '../components/lessons/CreateLessonModal';
import DeleteLessonModal from '../components/lessons/DeleteLessonModal';
import EditSeriesModal from '../components/series/EditSeriesModal';
import SuccessModal from '../components/common/SuccessModal';
import ConfirmationModal from '../components/common/ConfirmationModal';
import ErrorModal from '../components/common/ErrorModal';

const SeriesDetailPage = () => {
    const { seriesId } = useParams();
    const { user } = useContext(AuthContext);

    const [state, setState] = useState({
        series: null, lessons: [], loading: true, error: null,
        isOwner: false, isSubmitting: false, isSubscribed: false
    });

    const [modals, setModals] = useState({
        createLesson: false, deleteLesson: false, editSeries: false, editLesson: false,
        selectedLesson: null, subscribeSuccess: false, unsubscribeConfirm: false, subscribeError: null
    });

    const [formData, setFormData] = useState({
        lesson: { lesson_title: '', lesson_description: '' },
        series: { serie_title: '', serie_description: '', serie_category: '' },
        errors: {}
    });

    // Fetch data & handlers
    useEffect(() => {
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));

                // Fetch series data, lessons, and check if user is subscribed
                const [seriesData, lessonsData] = await Promise.all([
                    SeriesService.getSeriesById(seriesId),
                    LessonService.getAllLessons(seriesId)
                ]);

                // Check if current user is subscribed to this series
                let isSubscribed = false;
                if (user && user.data.serie_subcribe) {
                    isSubscribed = user.data.serie_subcribe.includes(seriesId);
                }
                setState(prev => ({
                    ...prev,
                    series: seriesData,
                    lessons: lessonsData,
                    loading: false,
                    error: null,
                    isOwner: user?.data?._id === seriesData.serie_user,
                    isSubscribed
                }));

                setFormData(prev => ({
                    ...prev, series: {
                        serie_title: seriesData.serie_title || seriesData.title,
                        serie_description: seriesData.serie_description,
                        serie_category: seriesData.serie_category,
                        isPublish: seriesData.isPublish
                    }
                }));
            } catch (err) {
                setState(prev => ({ ...prev, loading: false, error: 'Không thể tải thông tin khóa học' }));
            }
        };
        if (seriesId) fetchData();
    }, [seriesId, user]);

    const handlers = {
        createLesson: async (data) => {
            setState(prev => ({ ...prev, isSubmitting: true }));
            try {
                const newLesson = await LessonService.createLesson(seriesId, data);
                setState(prev => ({ ...prev, lessons: [...prev.lessons, newLesson], isSubmitting: false }));
                setModals(prev => ({ ...prev, createLesson: false }));
            } catch (error) {
                setState(prev => ({ ...prev, isSubmitting: false }));
                setFormData(prev => ({ ...prev, errors: { general: 'Lỗi tạo bài học' } }));
            }
        },

        deleteLesson: async () => {
            setState(prev => ({ ...prev, isSubmitting: true }));
            try {
                await LessonService.deleteLesson(state.series._id, modals.selectedLesson._id);
                setState(prev => ({
                    ...prev, lessons: prev.lessons.filter(l => l._id !== modals.selectedLesson._id), isSubmitting: false
                }));
                setModals(prev => ({ ...prev, deleteLesson: false, selectedLesson: null }));
            } catch (error) {
                setState(prev => ({ ...prev, isSubmitting: false }));
            }
        },

        togglePublish: async () => {
            setState(prev => ({ ...prev, isSubmitting: true }));
            try {
                const updatedSeries = await SeriesService.updateSeries(seriesId, {
                    ...formData.series, isPublish: !state.series.isPublish
                });
                setState(prev => ({ ...prev, series: updatedSeries, isSubmitting: false }));
            } catch (error) {
                setState(prev => ({ ...prev, isSubmitting: false, error: 'Lỗi cập nhật trạng thái' }));
            }
        },

        editSeries: async (data, thumbnail) => {
            setState(prev => ({ ...prev, isSubmitting: true }));
            try {
                const updatedSeries = await SeriesService.updateSeries(seriesId, data, thumbnail);
                setState(prev => ({ ...prev, series: updatedSeries, isSubmitting: false }));
                setModals(prev => ({ ...prev, editSeries: false }));
            } catch (error) {
                setState(prev => ({ ...prev, isSubmitting: false }));
                setFormData(prev => ({ ...prev, errors: { general: 'Lỗi cập nhật khóa học' } }));
            }
        },

        editLesson: async (data) => {
            setState(prev => ({ ...prev, isSubmitting: true }));
            try {
                const updatedLesson = await LessonService.updateLesson(seriesId, modals.selectedLesson._id, data);
                setState(prev => ({
                    ...prev,
                    lessons: prev.lessons.map(l => l._id === modals.selectedLesson._id ? updatedLesson : l),
                    isSubmitting: false
                }));
                setModals(prev => ({ ...prev, editLesson: false, selectedLesson: null }));
            } catch (error) {
                setState(prev => ({ ...prev, isSubmitting: false }));
                setFormData(prev => ({ ...prev, errors: { general: 'Lỗi cập nhật bài học' } }));
            }
        },

        subscribe: async () => {
            setState(prev => ({ ...prev, isSubmitting: true }));
            try {
                // Call API to subscribe
                const result = await SeriesService.subscribeSeries(seriesId);

                // Update local state to reflect subscription
                setState(prev => ({ ...prev, isSubmitting: false, isSubscribed: true }));
                setModals(prev => ({ ...prev, subscribeSuccess: true }));

                // You might want to refresh user context if needed
                // This depends on your app architecture
            } catch (error) {
                setState(prev => ({ ...prev, isSubmitting: false }));
                setModals(prev => ({ ...prev, subscribeError: error.message || 'Lỗi khi đăng ký theo dõi' }));
            }
        },

        unsubscribe: async () => {
            setState(prev => ({ ...prev, isSubmitting: true }));
            try {
                await SeriesService.unsubscribeSeries(seriesId);
                setState(prev => ({ ...prev, isSubmitting: false, isSubscribed: false }));
                setModals(prev => ({ ...prev, unsubscribeConfirm: false }));
            } catch (error) {
                setState(prev => ({ ...prev, isSubmitting: false }));
                setModals(prev => ({
                    ...prev,
                    unsubscribeConfirm: false,
                    subscribeError: error.message || 'Lỗi khi hủy đăng ký theo dõi'
                }));
                console.log(error);
            }
        }
    };

    const { series, lessons, loading, error, isOwner, isSubmitting, isSubscribed } = state;

    if (loading) return <MainLayout><div className="flex justify-center items-center h-64"><Loading /></div></MainLayout>;
    if (error) return <MainLayout><div className="my-8"><ErrorAlert message={error} /></div></MainLayout>;
    if (!series) return (
        <MainLayout>
            <div className="my-8">
                <EmptyState
                    title="Không tìm thấy khóa học"
                    description="Khóa học này không tồn tại hoặc đã bị xóa."
                    actionText="Quay lại danh sách khóa học"
                    actionUrl="/explore"
                />
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            {/* Hero Section */}
            <div className="relative h-96 mb-8 rounded-3xl overflow-hidden shadow-2xl">
                {series.serie_thumbnail ? (
                    <img src={series.serie_thumbnail} alt={series.serie_title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500" />
                )}

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex justify-between items-end">
                        <div className="max-w-3xl">
                            <div className="flex gap-2 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${series.isPublish ? 'bg-green-500' : 'bg-amber-500'
                                    }`}>
                                    {series.isPublish ? '✅ Đã xuất bản' : '⏳ Bản nháp'}
                                </span>
                                {series.serie_category && (
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs">#{series.serie_category}</span>
                                )}
                                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">📚 {lessons.length} bài học</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
                                {series.serie_title}
                            </h1>

                            {series.serie_description && (
                                <p className="text-lg opacity-90 mb-4 max-w-2xl">{series.serie_description}</p>
                            )}

                            {series.owner && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center font-bold">
                                        {series.owner.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-medium">Giảng viên</p>
                                        <p className="text-sm opacity-80">{series.owner.name || series.owner.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {isOwner ? (
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setModals(prev => ({ ...prev, editSeries: true }))}
                                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                                >
                                    ✏️ Chỉnh sửa
                                </Button>
                                <Button
                                    onClick={handlers.togglePublish}
                                    className={`${series.isPublish ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                                    disabled={isSubmitting}
                                >
                                    {series.isPublish ? '❌ Hủy xuất bản' : '✅ Xuất bản'}
                                </Button>
                            </div>
                        ) : user && (
                            <div>
                                {isSubscribed ? (
                                    <Button
                                        onClick={() => setModals(prev => ({ ...prev, unsubscribeConfirm: true }))}
                                        className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                                        disabled={isSubmitting}
                                    >
                                        <span className="animate-pulse">❤️</span> Đang theo dõi
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handlers.subscribe}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                        disabled={isSubmitting}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Theo dõi
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section with Modern Cards */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Lessons List */}
                    <div className="flex-1">
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    📚 Danh sách bài học
                                </h2>
                                {isOwner && (
                                    <Button
                                        onClick={() => setModals(prev => ({ ...prev, createLesson: true }))}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        ➕ Thêm bài học
                                    </Button>
                                )}
                            </div>

                            {lessons.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-3xl">
                                        📚
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Chưa có bài học nào</h3>
                                    <p className="text-gray-600 mb-6">
                                        {isOwner ? 'Hãy tạo bài học đầu tiên để bắt đầu khóa học!' : 'Khóa học đang được cập nhật, vui lòng quay lại sau'}
                                    </p>
                                    {isOwner && (
                                        <Button
                                            onClick={() => setModals(prev => ({ ...prev, createLesson: true }))}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            🚀 Tạo bài học đầu tiên
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {lessons.map((lesson, index) => (
                                        <Link
                                            key={lesson._id}
                                            to={`/series/${seriesId}/lessons/${lesson._id}`}
                                            className="block group"
                                        >
                                            <div className="flex items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold mr-6 group-hover:scale-110 transition-transform duration-300">
                                                    {index + 1}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg mb-1">
                                                        {lesson.lesson_title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                        {lesson.lesson_description}
                                                    </p>

                                                    <div className="flex items-center gap-3">
                                                        {lesson.lesson_video && (
                                                            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                🎥 Video
                                                            </span>
                                                        )}
                                                        {lesson.lesson_documents?.length > 0 && (
                                                            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                                📄 {lesson.lesson_documents.length} tài liệu
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {isOwner && (
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setModals(prev => ({ ...prev, selectedLesson: lesson, editLesson: true }));
                                                            }}
                                                            className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                            title="Chỉnh sửa bài học"
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setModals(prev => ({ ...prev, selectedLesson: lesson, deleteLesson: true }));
                                                            }}
                                                            className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                            title="Xóa bài học"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="xl:w-80 space-y-6">
                        {/* Stats Card */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
                            <h3 className="text-lg font-bold mb-6 text-gray-800">📊 Thống kê</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Bài học', value: lessons.length, color: 'blue', icon: '📚' },
                                    { label: 'Học viên', value: series.studentsCount || 0, color: 'green', icon: '👥' },
                                    { label: 'Lượt xem', value: series.viewCount || 0, color: 'purple', icon: '👀' }
                                ].map(({ label, value, color, icon }) => (
                                    <div key={label} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{icon}</span>
                                            <span className="text-gray-700">{label}</span>
                                        </div>
                                        <span className={`font-bold text-lg text-${color}-600`}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructor Card */}
                        {series.owner && (
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
                                <h3 className="text-lg font-bold mb-6 text-gray-800">👨‍🏫 Giảng viên</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {series.owner.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{series.owner.name || 'Người dùng'}</p>
                                        <p className="text-sm text-gray-600">{series.owner.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modals */}
            {modals.createLesson && (
                <CreateLessonModal
                    isOpen={modals.createLesson}
                    onClose={() => setModals(prev => ({ ...prev, createLesson: false }))}
                    onSubmit={handlers.createLesson}
                    formData={formData.lesson}
                    setFormData={(data) => setFormData(prev => ({ ...prev, lesson: data }))}
                    formErrors={formData.errors}
                    isSubmitting={isSubmitting}
                />
            )}

            {modals.deleteLesson && modals.selectedLesson && (
                <DeleteLessonModal
                    isOpen={modals.deleteLesson}
                    onClose={() => setModals(prev => ({ ...prev, deleteLesson: false, selectedLesson: null }))}
                    onConfirm={handlers.deleteLesson}
                    lesson={modals.selectedLesson}
                    isDeleting={isSubmitting}
                />
            )}

            {modals.editLesson && modals.selectedLesson && (
                <CreateLessonModal
                    isOpen={modals.editLesson}
                    onClose={() => setModals(prev => ({ ...prev, editLesson: false, selectedLesson: null }))}
                    onSubmit={handlers.editLesson}
                    isEdit={true}
                    initialData={modals.selectedLesson}
                />
            )}

            {modals.editSeries && (
                <EditSeriesModal
                    isOpen={modals.editSeries}
                    onClose={() => setModals(prev => ({ ...prev, editSeries: false }))}
                    onSubmit={(data, thumbnail) => handlers.editSeries(data, thumbnail)}
                    formData={formData.series}
                    setFormData={(data) => setFormData(prev => ({ ...prev, series: data }))}
                    formErrors={formData.errors}
                    isSubmitting={isSubmitting}
                    series={series}
                />
            )}

            {/* Subscribe Success Modal */}
            <SuccessModal
                isOpen={modals.subscribeSuccess}
                onClose={() => setModals(prev => ({ ...prev, subscribeSuccess: false }))}
                title="Đăng ký theo dõi thành công!"
                message="Cảm ơn bạn đã đăng ký theo dõi khóa học này. Bạn sẽ nhận được thông báo qua email mỗi khi có cập nhật mới."
                buttonText="Đã hiểu"
            />

            {/* Unsubscribe Confirmation Modal */}
            <ConfirmationModal
                isOpen={modals.unsubscribeConfirm}
                onClose={() => setModals(prev => ({ ...prev, unsubscribeConfirm: false }))}
                onConfirm={handlers.unsubscribe}
                title="Xác nhận hủy đăng ký"
                message="Bạn có chắc chắn muốn hủy đăng ký theo dõi khóa học này? Bạn sẽ không còn nhận được thông báo về các cập nhật mới."
                confirmText="Xác nhận hủy"
                cancelText="Giữ đăng ký"
                isLoading={isSubmitting}
                variant="warning"
            />

            {/* Error Modal */}
            {modals.subscribeError && (
                <ErrorModal
                    isOpen={!!modals.subscribeError}
                    onClose={() => setModals(prev => ({ ...prev, subscribeError: null }))}
                    message={modals.subscribeError}
                />
            )}
        </MainLayout>
    );
};

export default SeriesDetailPage;