import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SeriesManagerPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('mySeries'); // 'mySeries' hoặc 'createNew'
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSeries, setFilteredSeries] = useState([]);

    // Form state cho việc tạo series mới
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        coverImage: null,
        coverImagePreview: null
    });

    const categories = [
        { id: 'programming', name: 'Lập trình' },
        { id: 'database', name: 'Cơ sở dữ liệu' },
        { id: 'devops', name: 'DevOps' },
        { id: 'cloud', name: 'Điện toán đám mây' },
        { id: 'ai', name: 'Trí tuệ nhân tạo' },
        { id: 'web', name: 'Phát triển Web' },
        { id: 'mobile', name: 'Phát triển Mobile' },
        { id: 'other', name: 'Khác' }
    ];

    useEffect(() => {
        if (activeTab === 'mySeries') {
            fetchMySeries();
        }
    }, [activeTab]);

    useEffect(() => {
        // Filter series when search term changes
        if (series.length > 0) {
            const filtered = series.filter(s =>
                s.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSeries(filtered);
        }
    }, [searchTerm, series]);

    const fetchMySeries = async () => {
        setLoading(true);
        try {
            // Giả lập API call, thực tế sẽ gọi đến backend
            setTimeout(() => {
                // Mock data
                const mockSeries = [
                    {
                        id: 1,
                        title: 'AWS từ cơ bản đến nâng cao',
                        description: 'Khám phá các dịch vụ của AWS từ cơ bản đến nâng cao...',
                        coverImage: 'https://img-c.udemycdn.com/course/750x422/2381802_d805_10.jpg',
                        category: 'cloud',
                        lessonCount: 24,
                        studentsCount: 1520,
                        publishStatus: 'published',
                        createdAt: '2023-04-15'
                    },
                    {
                        id: 2,
                        title: 'Docker và Kubernetes cho người mới bắt đầu',
                        description: 'Làm quen với container và orchestration...',
                        coverImage: 'https://img-c.udemycdn.com/course/750x422/2463614_6ed6_5.jpg',
                        category: 'devops',
                        lessonCount: 18,
                        studentsCount: 850,
                        publishStatus: 'published',
                        createdAt: '2023-05-20'
                    },
                    {
                        id: 3,
                        title: 'Lập trình React Native',
                        description: 'Xây dựng ứng dụng di động đa nền tảng...',
                        coverImage: 'https://img-c.udemycdn.com/course/750x422/959700_8bd2_11.jpg',
                        category: 'mobile',
                        lessonCount: 32,
                        studentsCount: 2100,
                        publishStatus: 'draft',
                        createdAt: '2023-06-10'
                    }
                ];

                setSeries(mockSeries);
                setFilteredSeries(mockSeries);
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error('Error fetching series:', error);
            setLoading(false);
        }
    };

    // Xử lý form tạo series mới
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                coverImage: file,
                coverImagePreview: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Giả lập API call để tạo series mới
            console.log('Submitting form data:', formData);

            // Đây là nơi bạn sẽ gọi API để tạo series mới
            // const formDataToSend = new FormData();
            // formDataToSend.append('title', formData.title);
            // formDataToSend.append('description', formData.description);
            // formDataToSend.append('category', formData.category);
            // if (formData.coverImage) {
            //   formDataToSend.append('coverImage', formData.coverImage);
            // }

            // const response = await fetch('/api/series', {
            //   method: 'POST',
            //   body: formDataToSend
            // });

            // const data = await response.json();

            // Giả lập đã tạo series thành công
            setTimeout(() => {
                setIsSubmitting(false);
                // Thêm series mới vào danh sách và chuyển tab
                const newSeries = {
                    id: Date.now(), // Giả lập ID
                    title: formData.title,
                    description: formData.description,
                    coverImage: formData.coverImagePreview,
                    category: formData.category,
                    lessonCount: 0,
                    studentsCount: 0,
                    publishStatus: 'draft',
                    createdAt: new Date().toISOString().split('T')[0]
                };

                setSeries([newSeries, ...series]);
                setActiveTab('mySeries');

                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    coverImage: null,
                    coverImagePreview: null
                });

            }, 1500);
        } catch (error) {
            console.error('Error creating series:', error);
            setIsSubmitting(false);
            // Hiển thị thông báo lỗi
        }
    };

    const handleCancel = () => {
        if (confirm('Bạn có chắc muốn hủy? Các thay đổi sẽ không được lưu.')) {
            setActiveTab('mySeries');
            setFormData({
                title: '',
                description: '',
                category: '',
                coverImage: null,
                coverImagePreview: null
            });
        }
    };

    const handleDelete = (seriesId) => {
        if (confirm('Bạn có chắc muốn xóa series này?')) {
            setSeries(series.filter(s => s.id !== seriesId));
        }
    };

    // Render tab tạo series mới
    const renderCreateSeriesTab = () => {
        return (
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Tạo Series Bài Giảng Mới</h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    {/* Cover Image Upload */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Ảnh bìa series</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            {formData.coverImagePreview ? (
                                <div className="text-center">
                                    <img
                                        src={formData.coverImagePreview}
                                        alt="Preview"
                                        className="mx-auto h-64 w-full object-cover rounded-lg"
                                    />
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                coverImage: null,
                                                coverImagePreview: null
                                            })}
                                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-300"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Tải ảnh lên</span>
                                            <input
                                                id="file-upload"
                                                name="coverImage"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">hoặc kéo thả vào đây</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                        PNG, JPG, GIF tối đa 10MB (Kích thước khuyến nghị: 1280x720 px)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Tiêu đề series <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập tiêu đề series bài giảng"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Mô tả <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Mô tả chi tiết về series bài giảng của bạn"
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                            Danh mục <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Chọn danh mục</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submission Buttons */}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            disabled={isSubmitting}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {isSubmitting ? 'Đang xử lý...' : 'Tạo series'}
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    // Render tab quản lý series
    const renderManageSeriesTab = () => {
        return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Series của tôi</h1>
                    <button
                        onClick={() => setActiveTab('createNew')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Tạo series mới
                    </button>
                </div>

                {/* Search and filters */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm series..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredSeries.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy series nào</h3>
                        <p className="mt-1 text-sm text-gray-500">Hãy tạo series đầu tiên của bạn.</p>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setActiveTab('createNew')}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Tạo series mới
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSeries.map(item => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={item.coverImage}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                        {item.publishStatus === 'published' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Đã xuất bản
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Bản nháp
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h2>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <div className="flex items-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                            </svg>
                                            {item.lessonCount} bài học
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                            </svg>
                                            {item.studentsCount} học viên
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <Link
                                            to={`/series/${item.id}`}
                                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                        >
                                            Xem chi tiết
                                        </Link>
                                        <div className="flex space-x-3">
                                            <Link
                                                to={`/series/${item.id}/manage`}
                                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                            >
                                                Quản lý
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Tabs */}
            <div className="mb-8 border-b border-gray-200">
                <div className="flex -mb-px space-x-8">
                    <button
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'mySeries'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('mySeries')}
                    >
                        Series của tôi
                    </button>
                    <button
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'createNew'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('createNew')}
                    >
                        Tạo series mới
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'mySeries' ? renderManageSeriesTab() : renderCreateSeriesTab()}
        </div>
    );
};

export default SeriesManagerPage;
