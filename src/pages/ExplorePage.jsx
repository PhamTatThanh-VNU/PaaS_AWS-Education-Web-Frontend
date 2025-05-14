import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeriesList from '../components/courses/SeriesList';

const ExplorePage = () => {
    const [allSeries, setAllSeries] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFilter, setSelectedFilter] = useState('popular');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const navigate = useNavigate();

    // Danh sách danh mục
    const categories = [
        { id: 'all', name: 'Tất cả', icon: '🌐' },
        { id: 'programming', name: 'Lập trình', icon: '💻' },
        { id: 'database', name: 'Cơ sở dữ liệu', icon: '🗄️' },
        { id: 'devops', name: 'DevOps', icon: '🔄' },
        { id: 'cloud', name: 'Điện toán đám mây', icon: '☁️' },
        { id: 'ai', name: 'Trí tuệ nhân tạo', icon: '🤖' },
        { id: 'web', name: 'Phát triển Web', icon: '🌐' },
        { id: 'mobile', name: 'Phát triển Mobile', icon: '📱' },
    ];

    // Danh sách bộ lọc
    const filters = [
        { id: 'popular', name: 'Phổ biến', icon: '🔥' },
        { id: 'newest', name: 'Mới nhất', icon: '🆕' },
        { id: 'free', name: 'Miễn phí', icon: '🎁' },
        { id: 'paid', name: 'Trả phí', icon: '💰' },
    ];
    
    // Kiểm tra vị trí cuộn
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Giả lập API call
        const fetchAllSeries = async () => {
            setLoading(true);
            try {
                // Thực tế sẽ gọi API
                setTimeout(() => {
                    // Mock data
                    const mockSeries = [
                        {
                            id: 1,
                            title: 'AWS từ cơ bản đến nâng cao',
                            description: 'Khám phá các dịch vụ của AWS từ cơ bản đến nâng cao, triển khai ứng dụng thực tế với CloudFormation.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/2381802_d805_10.jpg',
                            author: {
                                name: 'Nguyễn Văn A',
                                avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                            },
                            category: 'cloud',
                            lessonCount: 24,
                            studentsCount: 1520,
                            rating: 4.7,
                            price: 0,
                            createdAt: '2025-02-15T08:30:00Z'
                        },
                        {
                            id: 2,
                            title: 'Fullstack JavaScript với MERN Stack',
                            description: 'Xây dựng ứng dụng web hoàn chỉnh với MongoDB, Express, React và Node.js. Từ cấu hình môi trường đến triển khai trên thực tế.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/1646980_23f7_2.jpg',
                            author: {
                                name: 'Trần Thị B',
                                avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                            },
                            category: 'web',
                            lessonCount: 36,
                            studentsCount: 2450,
                            rating: 4.9,
                            price: 799000,
                            createdAt: '2025-03-05T10:15:00Z'
                        },
                        {
                            id: 3,
                            title: 'Python cho Data Science và Machine Learning',
                            description: 'Học cách sử dụng Python và các thư viện như NumPy, Pandas, Scikit-Learn để phân tích dữ liệu và xây dựng mô hình ML.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/903744_8eb2.jpg',
                            author: {
                                name: 'Lê Văn C',
                                avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
                            },
                            category: 'ai',
                            lessonCount: 42,
                            studentsCount: 3720,
                            rating: 4.8,
                            price: 599000,
                            createdAt: '2025-01-10T14:20:00Z'
                        },
                        {
                            id: 4,
                            title: 'Docker và Kubernetes cho DevOps',
                            description: 'Nắm vững kỹ thuật container với Docker và quản lý container với Kubernetes để tối ưu quy trình CI/CD.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/1035000_c1aa_6.jpg',
                            author: {
                                name: 'Phạm Văn D',
                                avatar: 'https://randomuser.me/api/portraits/men/76.jpg'
                            },
                            category: 'devops',
                            lessonCount: 28,
                            studentsCount: 1870,
                            rating: 4.6,
                            price: 499000,
                            createdAt: '2025-04-20T11:45:00Z'
                        },
                        {
                            id: 5,
                            title: 'SQL và các kỹ thuật tối ưu truy vấn',
                            description: 'Học SQL từ cơ bản đến nâng cao và các kỹ thuật tối ưu truy vấn cho cơ sở dữ liệu lớn.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/762616_7693_3.jpg',
                            author: {
                                name: 'Hoàng Thị E',
                                avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
                            },
                            category: 'database',
                            lessonCount: 18,
                            studentsCount: 2250,
                            rating: 4.5,
                            price: 0,
                            createdAt: '2025-03-15T09:30:00Z'
                        },
                        {
                            id: 6,
                            title: 'Flutter - Phát triển ứng dụng cho iOS và Android',
                            description: 'Xây dựng ứng dụng mobile đa nền tảng với Flutter và Dart, từ thiết kế giao diện đến tích hợp API.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/1708340_7108_5.jpg',
                            author: {
                                name: 'Bùi Văn F',
                                avatar: 'https://randomuser.me/api/portraits/men/92.jpg'
                            },
                            category: 'mobile',
                            lessonCount: 32,
                            studentsCount: 1980,
                            rating: 4.7,
                            price: 699000,
                            createdAt: '2025-05-01T08:15:00Z'
                        },
                        {
                            id: 7,
                            title: 'Vue.js - Từ cơ bản đến nâng cao',
                            description: 'Học cách xây dựng ứng dụng web hiện đại với Vue.js 3, Vuex và Vue Router.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/995016_ebf4_3.jpg',
                            author: {
                                name: 'Nguyễn Văn G',
                                avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
                            },
                            category: 'web',
                            lessonCount: 24,
                            studentsCount: 1350,
                            rating: 4.6,
                            price: 0,
                            createdAt: '2025-04-05T13:20:00Z'
                        },
                        {
                            id: 8,
                            title: 'Blockchain và Cryptocurrency',
                            description: 'Tìm hiểu cơ bản về blockchain, smart contracts và cách xây dựng ứng dụng trên nền tảng Ethereum.',
                            coverImage: 'https://img-c.udemycdn.com/course/750x422/2393654_d071_6.jpg',
                            author: {
                                name: 'Trần Văn H',
                                avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
                            },
                            category: 'programming',
                            lessonCount: 30,
                            studentsCount: 850,
                            rating: 4.4,
                            price: 899000,
                            createdAt: '2025-03-25T16:40:00Z'
                        },
                    ];

                    setAllSeries(mockSeries);
                    setFilteredSeries(mockSeries);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error fetching series:', error);
                setLoading(false);
            }
        };

        fetchAllSeries();
    }, []);

    // Xử lý lọc và sắp xếp
    useEffect(() => {
        let result = [...allSeries];

        // Lọc theo category
        if (selectedCategory !== 'all') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Lọc theo searchTerm
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(lowerSearchTerm) ||
                item.description.toLowerCase().includes(lowerSearchTerm)
            );
        }

        // Lọc và sắp xếp theo selectedFilter
        switch (selectedFilter) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'popular':
                result.sort((a, b) => b.studentsCount - a.studentsCount);
                break;
            case 'free':
                result = result.filter(item => item.price === 0);
                break;
            case 'paid':
                result = result.filter(item => item.price > 0);
                break;
            default:
                break;
        }

        setFilteredSeries(result);
    }, [allSeries, selectedCategory, searchTerm, selectedFilter]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back to Dashboard button - Fixed Position */}
            <div className="fixed top-24 left-8 z-10">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all text-indigo-700 font-medium border border-indigo-100 hover:border-indigo-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Quay lại Dashboard
                </button>
            </div>

            {/* Scroll to top button */}
            {showScrollTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-10"
                    aria-label="Scroll to top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            )}

            {/* Hero section */}
            <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">Khám phá kiến thức mới</h1>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Hàng nghìn khóa học AWS từ các chuyên gia hàng đầu để giúp bạn học và phát triển kỹ năng trên đám mây.</p>
                        
                        <div className="max-w-xl mx-auto relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-4 border-0 rounded-full shadow-lg text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
                                placeholder="Tìm kiếm khóa học AWS..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter and Categories Section */}
            <div className="container mx-auto px-4 -mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:justify-between gap-6">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                        selectedCategory === category.id
                                            ? 'bg-indigo-600 text-white shadow-md hover:shadow-indigo-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                                    }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Sorting Options */}
                        <div className="flex items-center space-x-3 min-w-fit">
                            <span className="text-sm font-medium text-gray-600">Sắp xếp:</span>
                            <div className="relative">
                                <select
                                    className="appearance-none bg-white border border-gray-300 rounded-full text-sm px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                >
                                    {filters.map(filter => (
                                        <option key={filter.id} value={filter.id}>
                                            {filter.icon} {filter.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 pb-16">
                {/* Stats Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4">
                            <div className="text-3xl font-bold text-indigo-600">{allSeries.length}+</div>
                            <div className="text-gray-600">Khóa học</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-indigo-600">24/7</div>
                            <div className="text-gray-600">Truy cập</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-indigo-600">10K+</div>
                            <div className="text-gray-600">Học viên</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-indigo-600">4.8</div>
                            <div className="text-gray-600">Đánh giá trung bình</div>
                        </div>
                    </div>
                </div>

                {/* Series List */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                        <p className="text-indigo-600 font-medium">Đang tải các khóa học...</p>
                    </div>
                ) : filteredSeries.length > 0 ? (
                    <>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kết quả tìm kiếm</h2>
                            <p className="text-gray-600">Hiển thị {filteredSeries.length} khóa học</p>
                        </div>
                        
                        <SeriesList series={filteredSeries} />
                        
                        {/* Phân trang */}
                        <div className="mt-10 flex justify-center">
                            <nav className="inline-flex rounded-md shadow-sm">
                                <a
                                    href="#"
                                    className="inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-50 transition-colors"
                                >
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    3
                                </a>
                                <span className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                </span>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    8
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-50 transition-colors"
                                >
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                        <img 
                            src="https://illustrations.popsy.co/amber/student-looking-at-board.svg" 
                            alt="No results found" 
                            className="w-64 h-64 mx-auto mb-6"
                        />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy kết quả</h3>
                        <p className="text-gray-600 max-w-md mx-auto mb-8">
                            Không có khóa học nào phù hợp với tiêu chí tìm kiếm của bạn.
                        </p>
                        <button
                            type="button"
                            className="inline-flex items-center px-5 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchTerm('');
                                setSelectedFilter('popular');
                            }}
                        >
                            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            Xem tất cả khóa học
                        </button>
                    </div>
                )}

                {/* Đề xuất trở thành người sáng tạo */}
                <div className="mt-16 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-8 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Chia sẻ kiến thức của bạn với thế giới</h2>
                        <p className="text-lg mb-6">
                            Trở thành người sáng tạo nội dung trên nền tảng của chúng tôi và chia sẻ kiến thức chuyên môn của bạn với hàng nghìn người học.
                        </p>
                        <button
                            onClick={() => navigate('/series/manage')}
                            className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
                        >
                            Bắt đầu tạo nội dung
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
