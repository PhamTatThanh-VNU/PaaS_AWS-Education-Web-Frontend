import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSeriesPage = () => {
    const navigate = useNavigate();
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
                // Chuyển hướng đến trang chi tiết series giả định
                navigate('/series/7');
            }, 1500);
        } catch (error) {
            console.error('Error creating series:', error);
            setIsSubmitting(false);
            // Hiển thị thông báo lỗi
        }
    };

    const handleCancel = () => {
        navigate('/series');
    };

    return (
        <div className="container mx-auto px-4 py-8">
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
        </div>
    );
};

export default CreateSeriesPage;
