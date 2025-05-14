import React from 'react';
import { Link } from 'react-router-dom';

const SeriesDetail = ({ series, lessons }) => {
    if (!series) {
        return <div className="p-4 text-center">Loading series details...</div>;
    }

    // Sử dụng cấu trúc sections nếu có, hoặc tạo một section mặc định từ mảng lessons
    const sectionsToRender = series.sections && series.sections.length > 0
        ? series.sections
        : lessons && lessons.length > 0
            ? [{ id: 'default', title: 'Bài học', lessons: lessons }]
            : [];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{series.title}</h1>
                <p className="text-gray-600 mb-4">{series.description}</p>

                <div className="flex items-center mb-4">
                    <div className="text-sm text-gray-500">
                        <span className="mr-4">Created by: {series.author?.name || 'Unknown'}</span>
                        <span className="mr-4">Category: {series.category || 'Uncategorized'}</span>
                        <span>Last Updated: {series.updatedAt || 'N/A'}</span>
                    </div>
                </div>

                {series.coverImage && (
                    <img
                        src={series.coverImage}
                        alt={series.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Thông tin khóa học</h2>
                    {series.isAuthor && (
                        <Link
                            to={`/series/${series.id}/add-lesson`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                            Thêm bài học
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Tổng thời gian</p>
                        <p className="text-xl font-semibold">{series.totalDuration || '0h'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Số bài học</p>
                        <p className="text-xl font-semibold">{series.lessonCount || lessons?.length || '0'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Học viên</p>
                        <p className="text-xl font-semibold">{series.studentsCount?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Đánh giá</p>
                        <p className="text-xl font-semibold">{series.rating || '0'} ⭐ ({series.reviewCount || '0'})</p>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nội dung khóa học</h2>
                {sectionsToRender.length > 0 ? (
                    <div className="space-y-4">
                        {sectionsToRender.map((section) => (
                            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="font-medium text-gray-800">{section.title}</h3>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {section.lessons.map((lesson) => (
                                        <div key={lesson.id} className="px-4 py-3 hover:bg-gray-50">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    {lesson.completed ? (
                                                        <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                    <div>
                                                        <h4 className="text-gray-800">{lesson.title}</h4>
                                                        <p className="text-gray-500 text-sm">{lesson.duration}</p>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/lessons/${lesson.id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Xem bài học
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">Chưa có bài học nào.</p>
                )}
            </div>

            {series.author && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Về giảng viên</h2>
                    <div className="flex items-start">
                        {series.author.avatar && (
                            <img
                                src={series.author.avatar}
                                alt={series.author.name}
                                className="w-16 h-16 rounded-full mr-4 object-cover"
                            />
                        )}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">{series.author.name}</h3>
                            <p className="text-blue-600">{series.author.title}</p>
                            <p className="text-gray-600 mt-2">
                                {series.author.bio || 'Giảng viên có nhiều kinh nghiệm trong lĩnh vực này.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeriesDetail;