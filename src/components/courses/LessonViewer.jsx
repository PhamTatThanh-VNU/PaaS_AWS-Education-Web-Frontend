import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';

const LessonViewer = ({ lesson, series, allLessons }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const videoRef = useRef(null);
    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
    const nextLesson = allLessons[currentIndex + 1];
    const prevLesson = allLessons[currentIndex - 1];

    // Tự động đánh dấu đã xem sau 80% thời gian video
    useEffect(() => {
        if (videoRef.current && lesson.type === 'video') {
            const video = videoRef.current;

            const handleTimeUpdate = () => {
                const progress = (video.currentTime / video.duration) * 100;
                if (progress > 80 && !lesson.completed) {
                    console.log('Marking lesson as watched');
                    // Đây là nơi bạn sẽ gọi API để đánh dấu bài học đã hoàn thành
                }
            };

            video.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [lesson, videoRef]);

    return (
        <div className="flex flex-col lg:flex-row h-full">
            {/* Main Lesson Content */}
            <div className={`flex-1 ${isSidebarOpen ? 'lg:mr-80' : ''}`}>
                {/* Video or Content Display */}
                <div className="bg-black aspect-video mb-6">
                    {lesson.type === 'video' ? (
                        <video
                            ref={videoRef}
                            src={lesson.videoUrl || 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'}
                            controls
                            className="w-full h-full"
                            poster={lesson.thumbnailUrl}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <iframe
                                src={lesson.documentUrl || 'https://docs.google.com/viewer?embedded=true&url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}
                                className="w-full h-full"
                                title={lesson.title}
                                frameBorder="0"
                            />
                        </div>
                    )}
                </div>

                {/* Lesson Navigation Buttons */}
                <div className="mb-6 flex justify-between">
                    <div>
                        {prevLesson && (
                            <Link to={`/series/${series.id}/lessons/${prevLesson.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Bài trước
                            </Link>
                        )}
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 lg:hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? 'Ẩn danh sách' : 'Hiện danh sách'}
                    </button>

                    <div>
                        {nextLesson ? (
                            <Link to={`/series/${series.id}/lessons/${nextLesson.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Bài tiếp
                                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        ) : (
                            <Link to={`/series/${series.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Hoàn thành series
                                <svg className="ml-2 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Lesson Info */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

                    <div className="flex items-center mb-4">
                        <div className="flex items-center mr-4">
                            <svg className="h-5 w-5 text-gray-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{lesson.duration || '12:45'}</span>
                        </div>

                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-gray-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-sm">{lesson.difficulty || 'Trung bình'}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <p>{lesson.description}</p>

                        {lesson.content && (
                            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                        )}
                    </div>

                    {/* Attached Resources */}
                    {lesson.resources && lesson.resources.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-bold mb-3">Tài liệu đính kèm</h3>
                            <div className="space-y-2">
                                {lesson.resources.map(resource => (
                                    <a
                                        key={resource.id}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                                    >
                                        <div className="w-10 h-10 flex-shrink-0 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                                            {resource.type === 'pdf' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {resource.type === 'code' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            )}
                                            {resource.type === 'link' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium">{resource.name}</div>
                                            <div className="text-sm text-gray-500">{resource.size}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Comment Section */}
                <CommentSection lessonId={lesson.id} />
            </div>

            {/* Side Panel - List of All Lessons */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 overflow-y-auto transform transition-transform duration-300 ease-in-out z-20 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
                <div className="bg-indigo-600 text-white p-4">
                    <button
                        type="button"
                        className="absolute top-4 right-4 lg:hidden text-white"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-bold">{series.title}</h2>
                    <p className="text-sm text-indigo-100">
                        {allLessons.filter(l => l.completed).length} / {allLessons.length} bài đã học
                    </p>
                    <div className="mt-2 bg-indigo-700 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full"
                            style={{ width: `${(allLessons.filter(l => l.completed).length / allLessons.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="mb-4">
                        <Link
                            to={`/series/${series.id}`}
                            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                        >
                            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Về trang series
                        </Link>
                    </div>

                    <h3 className="font-bold text-gray-700 mb-3">Danh sách bài học</h3>

                    <div className="space-y-1">
                        {series.sections?.map((section, sectionIndex) => (
                            <div key={section.id} className="mb-3">
                                <div className="text-sm font-medium text-gray-900 mb-2">
                                    {sectionIndex + 1}. {section.title}
                                </div>

                                <div className="ml-4 space-y-1">
                                    {section.lessons.map((item, lessonIndex) => (
                                        <Link
                                            key={item.id}
                                            to={`/series/${series.id}/lessons/${item.id}`}
                                            className={`flex items-center p-2 text-sm rounded-md ${item.id === lesson.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${item.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                                {item.completed ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <span>{sectionIndex + 1}.{lessonIndex + 1}</span>
                                                )}
                                            </div>
                                            <span className={`${item.id === lesson.id ? 'font-medium' : ''}`}>{item.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonViewer;
