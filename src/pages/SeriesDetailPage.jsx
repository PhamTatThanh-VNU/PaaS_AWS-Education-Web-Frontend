import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeriesDetail from '../components/courses/SeriesDetail';

const SeriesDetailPage = () => {
    const { seriesId } = useParams();
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeriesDetail = async () => {
            setLoading(true);
            try {
                // Giả lập API call, thực tế sẽ gọi đến backend
                // const response = await fetch(`/api/series/${seriesId}`);
                // const data = await response.json();
                setTimeout(() => {
                    // Mock data
                    const mockSeriesDetail = {
                        id: parseInt(seriesId),
                        title: 'AWS từ cơ bản đến nâng cao',
                        description: 'Khám phá các dịch vụ của AWS từ cơ bản đến nâng cao, triển khai ứng dụng thực tế với CloudFormation, tối ưu chi phí và hiệu suất cho ứng dụng của bạn trên AWS.',
                        coverImage: 'https://img-c.udemycdn.com/course/750x422/2381802_d805_10.jpg',
                        category: 'cloud',
                        updatedAt: '15/04/2023',
                        author: {
                            name: 'Nguyễn Văn A',
                            title: 'AWS Certified Solutions Architect',
                            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                        },
                        totalDuration: '16h 45m',
                        lessonCount: 24,
                        studentsCount: 1520,
                        rating: 4.7,
                        reviewCount: 124,
                        isAuthor: true, // Giả sử người dùng hiện tại là tác giả
                        sections: [
                            {
                                id: 101,
                                title: 'Giới thiệu về AWS',
                                lessons: [
                                    {
                                        id: 1001,
                                        title: 'Tổng quan về AWS và Cloud Computing',
                                        duration: '12:45',
                                        type: 'video',
                                        completed: true
                                    },
                                    {
                                        id: 1002,
                                        title: 'Tạo tài khoản AWS và thiết lập ban đầu',
                                        duration: '18:30',
                                        type: 'video',
                                        completed: true
                                    },
                                    {
                                        id: 1003,
                                        title: 'Quản lý chi phí và tối ưu ngân sách',
                                        duration: '22:15',
                                        type: 'video',
                                        completed: false
                                    }
                                ]
                            },
                            {
                                id: 102,
                                title: 'Dịch vụ Compute',
                                lessons: [
                                    {
                                        id: 1004,
                                        title: 'Amazon EC2 - Elastic Compute Cloud',
                                        duration: '35:20',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1005,
                                        title: 'Elastic Load Balancing và Auto Scaling',
                                        duration: '28:45',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1006,
                                        title: 'AWS Lambda và Serverless',
                                        duration: '24:50',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1007,
                                        title: 'Thực hành: Triển khai ứng dụng với EC2',
                                        duration: '45:10',
                                        type: 'video',
                                        completed: false
                                    }
                                ]
                            },
                            {
                                id: 103,
                                title: 'Storage và Database',
                                lessons: [
                                    {
                                        id: 1008,
                                        title: 'Amazon S3 - Simple Storage Service',
                                        duration: '31:15',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1009,
                                        title: 'Amazon RDS và Aurora',
                                        duration: '26:40',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1010,
                                        title: 'DynamoDB và NoSQL trên AWS',
                                        duration: '29:55',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1011,
                                        title: 'Tài liệu: Best Practices cho S3 và RDS',
                                        duration: '15:00',
                                        type: 'document',
                                        completed: false
                                    }
                                ]
                            },
                            {
                                id: 104,
                                title: 'Networking & Security',
                                lessons: [
                                    {
                                        id: 1012,
                                        title: 'Amazon VPC - Virtual Private Cloud',
                                        duration: '32:20',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1013,
                                        title: 'Security Groups và Network ACLs',
                                        duration: '28:15',
                                        type: 'video',
                                        completed: false
                                    },
                                    {
                                        id: 1014,
                                        title: 'AWS IAM - Identity and Access Management',
                                        duration: '34:30',
                                        type: 'video',
                                        completed: false
                                    }
                                ]
                            }
                        ]
                    };

                    if (mockSeriesDetail.id === parseInt(seriesId)) {
                        setSeries(mockSeriesDetail);
                        setLoading(false);
                    } else {
                        setError('Series không tồn tại');
                        setLoading(false);
                    }
                }, 800);
            } catch (error) {
                console.error('Error fetching series detail:', error);
                setError('Không thể tải thông tin series. Vui lòng thử lại sau.');
                setLoading(false);
            }
        };

        fetchSeriesDetail();
    }, [seriesId]);

    // Flatten all lessons for easier access
    const allLessons = series?.sections?.reduce((acc, section) => {
        return [...acc, ...section.lessons];
    }, []) || [];

    const handleBack = () => {
        navigate('/series');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Quay lại danh sách series
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={handleBack}
                className="mb-6 inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Quay lại danh sách series
            </button>

            <SeriesDetail series={series} lessons={allLessons} />
        </div>
    );
};

export default SeriesDetailPage;
