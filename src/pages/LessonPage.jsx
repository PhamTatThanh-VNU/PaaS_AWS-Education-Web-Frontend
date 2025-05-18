import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LessonViewer from '../components/courses/LessonViewer';

const LessonPage = () => {
    const { seriesId, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [series, setSeries] = useState(null);
    const [allLessons, setAllLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Giả lập API call
                setTimeout(() => {
                    // Mock dữ liệu series
                    const mockSeries = {
                        id: parseInt(seriesId),
                        title: 'AWS từ cơ bản đến nâng cao',
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

                    // Tạo danh sách phẳng tất cả các bài học từ các sections
                    const flattenedLessons = mockSeries.sections.reduce((acc, section) => {
                        return [...acc, ...section.lessons];
                    }, []);
                    setAllLessons(flattenedLessons);

                    // Tìm bài học hiện tại dựa trên lessonId
                    const currentLesson = flattenedLessons.find(l => l.id === parseInt(lessonId));

                    // Nếu tìm thấy bài học, thêm thông tin chi tiết
                    if (currentLesson) {
                        // Thêm thông tin chi tiết cho bài học hiện tại
                        const detailedLesson = {
                            ...currentLesson,
                            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                            documentUrl: currentLesson.type === 'document' ? 'https://docs.google.com/viewer?embedded=true&url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' : null,
                            thumbnailUrl: 'https://via.placeholder.com/1280x720/5a67d8/ffffff?text=AWS+Course',
                            description: 'Trong bài học này, chúng ta sẽ tìm hiểu chi tiết về dịch vụ này của AWS và cách triển khai nó trong thực tế. Bạn sẽ được học cách cấu hình, tối ưu và khắc phục sự cố thường gặp.',
                            difficulty: 'Trung bình',
                            content: `
                <div>
                  <h2>Nội dung chính</h2>
                  <ul>
                    <li>Giới thiệu về dịch vụ</li>
                    <li>Cấu hình và thiết lập</li>
                    <li>Các use cases phổ biến</li>
                    <li>Best practices</li>
                    <li>Khắc phục sự cố thường gặp</li>
                  </ul>

                  <h2>Chi tiết kỹ thuật</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vestibulum magna at magna ullamcorper, vel gravida nunc sodales. Donec ac aliquam sem. Quisque at magna tellus. Integer scelerisque sem ac mi faucibus ornare. Nullam tincidunt gravida libero, ut interdum velit vehicula sit amet.
                  </p>
                  <p>
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse et rhoncus mauris, nec placerat orci. Nulla facilisi. Fusce molestie, purus id commodo mollis, ligula lacus sollicitudin justo, quis pulvinar enim sapien nec est.
                  </p>
                </div>
              `,
                            resources: [
                                {
                                    id: 201,
                                    name: 'Slide bài giảng',
                                    type: 'pdf',
                                    url: 'https://example.com/slides.pdf',
                                    size: '2.4 MB'
                                },
                                {
                                    id: 202,
                                    name: 'Code mẫu',
                                    type: 'code',
                                    url: 'https://github.com/example/aws-demo',
                                    size: '1.2 MB'
                                },
                                {
                                    id: 203,
                                    name: 'Tài liệu tham khảo',
                                    type: 'link',
                                    url: 'https://aws.amazon.com/documentation',
                                    size: 'Trang web'
                                }
                            ]
                        };

                        setLesson(detailedLesson);
                        setSeries(mockSeries);
                        setLoading(false);
                    } else {
                        setError('Không tìm thấy bài học');
                        setLoading(false);
                    }
                }, 800);
            } catch (error) {
                console.error('Error fetching lesson:', error);
                setError('Không thể tải thông tin bài học. Vui lòng thử lại sau.');
                setLoading(false);
            }
        };

        fetchData();
    }, [seriesId, lessonId]);

    if (loading) {
        return (
            <div className="container mx-auto flex justify-center items-center h-screen">
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
                        onClick={() => navigate(`/series/${seriesId}`)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Quay lại series
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <LessonViewer lesson={lesson} series={series} allLessons={allLessons} />
        </div>
    );
};

export default LessonPage;
