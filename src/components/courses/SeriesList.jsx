import React from 'react';
import { Link } from 'react-router-dom';

const SeriesList = ({ series }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                        <img
                            src={item.coverImage || 'https://via.placeholder.com/600x340/5a67d8/ffffff?text=Series+Cover'}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                            {item.lessonCount} bài giảng
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="flex items-center mb-3">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-2">
                                {item.author?.name?.charAt(0) || 'A'}
                            </div>
                            <span className="text-sm text-gray-600">{item.author?.name || 'Giảng viên'}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                            <Link to={`/series/${item.id}`}>{item.title}</Link>
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                <span>{item.category}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center text-amber-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 font-semibold">{item.rating || '4.5'}</span>
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {item.studentsCount || 0} học viên
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Thêm mới Series */}
            <Link
                to="/create-series"
                className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 hover:bg-gray-100 transition-colors h-full"
            >
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Tạo series mới</h4>
                <p className="text-sm text-gray-600 text-center mb-2">
                    Bắt đầu tạo series bài giảng mới
                </p>
            </Link>
        </div>
    );
};

export default SeriesList;
