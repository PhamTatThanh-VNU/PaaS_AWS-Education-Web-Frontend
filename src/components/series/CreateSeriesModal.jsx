import React, { useState, useRef } from 'react';

/**
 * Modal để tạo series mới
 */
const CreateSeriesModal = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    setFormData,
    formErrors,
    isSubmitting
}) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [customCategory, setCustomCategory] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle category selection
        if (name === 'serie_category') {
            if (value === 'Khác') {
                setShowCustomInput(true);
                setCustomCategory('');
                // Don't set the category value yet, wait for custom input
                setFormData({
                    ...formData,
                    [name]: '',
                });
            } else {
                setShowCustomInput(false);
                setCustomCategory('');
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const handleCustomCategoryChange = (e) => {
        const value = e.target.value;
        setCustomCategory(value);
        // Update the form data with the custom category value
        setFormData({
            ...formData,
            serie_category: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Lưu file vào state coverImage để sử dụng khi submit
            setCoverImage(file);

            // Hiển thị preview của hình ảnh
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(coverImage);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg md:max-w-xl w-full" onClick={e => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 sm:px-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-white">Tạo Series Mới</h3>
                        <button
                            onClick={onClose}
                            className="bg-transparent rounded-md text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="px-4 pt-5 pb-4 sm:p-6">
                        <div className="space-y-4">
                            {/* Cover Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ảnh bìa
                                </label>
                                <div className="flex items-center justify-center">
                                    <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden border border-dashed border-gray-300 flex items-center justify-center">
                                        {imagePreview ? (
                                            <div className="relative w-full h-full">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCoverImage(null);
                                                        setImagePreview(null);
                                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                                    }}
                                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <div className="flex justify-center text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Tải ảnh lên
                                                    </label>
                                                    <input
                                                        id="file-upload"
                                                        name="serie_thumbnail"
                                                        type="file"
                                                        className="sr-only"
                                                        ref={fileInputRef}
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF tối đa 10MB
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {formErrors.thumbnail && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.thumbnail}</p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label htmlFor="serie_title" className="block text-sm font-medium text-gray-700">
                                    Tiêu đề <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="serie_title"
                                    id="serie_title"
                                    value={formData.serie_title}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.serie_title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                    placeholder="Nhập tiêu đề series"
                                />
                                {formErrors.serie_title && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.serie_title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="serie_description" className="block text-sm font-medium text-gray-700">
                                    Mô tả <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="serie_description"
                                    id="serie_description"
                                    value={formData.serie_description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.serie_description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                    placeholder="Mô tả ngắn gọn về series"
                                />
                                {formErrors.serie_description && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.serie_description}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="serie_category" className="block text-sm font-medium text-gray-700">
                                    Danh mục <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="serie_category"
                                    id="serie_category"
                                    value={showCustomInput ? "Khác" : formData.serie_category}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.serie_category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                >
                                    <option value="">-- Chọn danh mục --</option>
                                    <option value="Lập trình">Lập trình</option>
                                    <option value="Thiết kế">Thiết kế</option>
                                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Kỹ năng mềm">Kỹ năng mềm</option>
                                    <option value="Khác">Khác</option>
                                </select>

                                {/* Custom Category Input - shown when "Khác" is selected */}
                                {showCustomInput && (
                                    <div className="mt-3">
                                        <label htmlFor="custom_category" className="block text-sm font-medium text-gray-700">
                                            Nhập danh mục mới <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="custom_category"
                                            id="custom_category"
                                            value={customCategory}
                                            onChange={handleCustomCategoryChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Ví dụ: Khoa học, Toán học, Nghệ thuật..."
                                            autoFocus
                                        />
                                    </div>
                                )}

                                {formErrors.serie_category && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.serie_category}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang tạo...
                                </>
                            ) : (
                                'Tạo Series'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSeriesModal;
