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
    const navigate = useNavigate();

    // Danh sách danh mục
    const categories = [
        { id: 'all', name: 'Tất cả' },
        { id: 'programming', name: 'Lập trình' },
        { id: 'database', name: 'Cơ sở dữ liệu' },
        { id: 'devops', name: 'DevOps' },
        { id: 'cloud', name: 'Điện toán đám mây' },
        { id: 'ai', name: 'Trí tuệ nhân tạo' },
        { id: 'web', name: 'Phát triển Web' },
        { id: 'mobile', name: 'Phát triển Mobile' },
    ];

    // Danh sách bộ lọc
    const filters = [
        { id: 'popular', name: 'Phổ biến' },
        { id: 'newest', name: 'Mới nhất' },
        { id: 'free', name: 'Miễn phí' },
        { id: 'paid', name: 'Trả phí' },
    ];

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
        <div className="container mx-auto px-4 py-8">
            {/* Hero section */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 mb-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Khám phá kiến thức mới</h1>
                <p className="text-lg mb-6 max-w-2xl">Hàng nghìn khóa học từ các chuyên gia hàng đầu để giúp bạn học và phát triển kỹ năng mới.</p>
                <div className="max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border-0 rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Tìm kiếm khóa học..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Sắp xếp:</span>
                        <select
                            className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            {filters.map(filter => (
                                <option key={filter.id} value={filter.id}>
                                    {filter.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Series List */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            ) : filteredSeries.length > 0 ? (
                <>
                    <SeriesList series={filteredSeries} />
                    {/* Phân trang */}
                    <div className="mt-8 flex justify-center">
                        <nav className="inline-flex rounded-md shadow">
                            <a
                                href="#"
                                className="inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-indigo-50"
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
                                className="inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a1 1 0 110-2 1 1 0 010 2z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy kết quả</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Không có series nào phù hợp với tiêu chí tìm kiếm.
                    </p>
                    <div className="mt-6">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchTerm('');
                                setSelectedFilter('popular');
                            }}
                        >
                            Xem tất cả series
                        </button>
                    </div>
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
                        onClick={() => navigate('/create-series')}
                        className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Bắt đầu tạo nội dung
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
