import { useState, useEffect } from 'react';

/**
 * Modal để tạo hoặc chỉnh sửa bài học
 */
const CreateLessonModal = ({
    isOpen,
    onClose,
    onSubmit,
    isEdit = false,
    initialData = {}
}) => {
    const [formData, setFormData] = useState({
        lesson_title: '',
        lesson_description: '',
    });

    const [files, setFiles] = useState({
        videoFile: null,
        documentFiles: [], // Array for multiple documents
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // File size limit: 10MB for documents only
    const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;

    // Populate form data if editing
    useEffect(() => {
        if (isEdit && initialData) {
            setFormData({
                lesson_title: initialData.lesson_title || '',
                lesson_description: initialData.lesson_description || '',
            });
        }
    }, [isEdit, initialData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Helper function to format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Helper function to validate document file size (only for documents)
    const validateDocumentSize = (file) => {
        return file.size <= MAX_DOCUMENT_SIZE;
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles.length === 0) return;

        const fileArray = Array.from(selectedFiles);

        if (name === 'lesson_video') {
            // For video, no size limit - just take the first file
            setFiles(prev => ({ ...prev, videoFile: fileArray[0] }));
            setErrors(prev => ({ ...prev, [name]: null }));
        } else if (name === 'lesson_documents') {
            // For documents, validate size limit
            const invalidFiles = [];
            const validFiles = [];

            fileArray.forEach(file => {
                if (validateDocumentSize(file)) {
                    validFiles.push(file);
                } else {
                    invalidFiles.push(`${file.name} (${formatFileSize(file.size)})`);
                }
            });

            if (invalidFiles.length > 0) {
                setErrors(prev => ({
                    ...prev,
                    [name]: `Các file sau vượt quá giới hạn 10MB: ${invalidFiles.join(', ')}`
                }));
            } else {
                setErrors(prev => ({ ...prev, [name]: null }));
            }

            // Append valid files to existing documents
            setFiles(prev => ({
                ...prev,
                documentFiles: [...prev.documentFiles, ...validFiles]
            }));
        }

        // Clear general file error if any file is uploaded
        if (errors.files && fileArray.length > 0) {
            setErrors(prev => ({ ...prev, files: null }));
        }

        // Reset input to allow re-selecting same files
        e.target.value = '';
    };

    // Function to remove a document file
    const removeDocumentFile = (indexToRemove) => {
        setFiles(prev => ({
            ...prev,
            documentFiles: prev.documentFiles.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Function to remove video file
    const removeVideoFile = () => {
        setFiles(prev => ({ ...prev, videoFile: null }));
    };

    // Function to clear all document files
    const clearAllDocuments = () => {
        setFiles(prev => ({ ...prev, documentFiles: [] }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.lesson_title.trim()) {
            newErrors.lesson_title = 'Tiêu đề không được để trống';
        }

        if (!formData.lesson_description.trim()) {
            newErrors.lesson_description = 'Mô tả không được để trống';
        }

        // If creating new lesson, require at least one file upload
        if (!isEdit && !files.videoFile && (!files.documentFiles || files.documentFiles.length === 0)) {
            newErrors.files = 'Phải tải lên ít nhất một video hoặc tài liệu';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);

            // Create FormData object to match backend expectations
            const lessonFormData = new FormData();

            // Add text fields
            lessonFormData.append('lesson_title', formData.lesson_title);
            lessonFormData.append('lesson_description', formData.lesson_description);

            // Add binary files with correct field names
            if (files.videoFile) {
                lessonFormData.append('lesson_video', files.videoFile);
            }

            // Add document files as an array
            if (files.documentFiles && files.documentFiles.length > 0) {
                files.documentFiles.forEach(doc => {
                    lessonFormData.append('lesson_documents', doc);
                });
            }

            await onSubmit(lessonFormData);
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-900">
                        {isEdit ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="lesson_title" className="block text-sm font-medium text-gray-700">
                            Tiêu đề bài học <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="lesson_title"
                            name="lesson_title"
                            value={formData.lesson_title}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.lesson_title ? 'border-red-300' : 'border-gray-300'
                                } shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500`}
                            placeholder="Nhập tiêu đề bài học"
                        />
                        {errors.lesson_title && (
                            <p className="mt-1 text-sm text-red-600">{errors.lesson_title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="lesson_description" className="block text-sm font-medium text-gray-700">
                            Mô tả bài học <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="lesson_description"
                            name="lesson_description"
                            value={formData.lesson_description}
                            onChange={handleInputChange}
                            rows={4}
                            className={`mt-1 block w-full rounded-md border ${errors.lesson_description ? 'border-red-300' : 'border-gray-300'
                                } shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500`}
                            placeholder="Nhập mô tả ngắn về bài học"
                        />
                        {errors.lesson_description && (
                            <p className="mt-1 text-sm text-red-600">{errors.lesson_description}</p>
                        )}
                    </div>

                    {/* File Uploads */}
                    <div className="mb-6 border rounded-md p-4 bg-gray-50">
                        <h4 className="text-md font-medium text-gray-700 mb-3">Tải lên tài nguyên</h4>

                        {/* Video Upload */}
                        <div className="mb-4">
                            <label htmlFor="lesson_video" className="block text-sm font-medium text-gray-700 mb-2">
                                Video bài học {!isEdit && <span className="text-sm text-gray-500">(bắt buộc nếu không có tài liệu)</span>}
                            </label>
                            <input
                                type="file"
                                id="lesson_video"
                                name="lesson_video"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            <p className="mt-1 text-xs text-gray-500">Chấp nhận tất cả định dạng video</p>

                            {files.videoFile && (
                                <div className="mt-2 p-2 bg-white border rounded-md">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-700">{files.videoFile.name}</span>
                                            <span className="text-xs text-gray-500 ml-2">({formatFileSize(files.videoFile.size)})</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeVideoFile}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {isEdit && initialData.lesson_video && !files.videoFile && (
                                <p className="mt-1 text-sm text-green-600">Đã có video (giữ video cũ nếu không tải lên mới)</p>
                            )}

                            {errors.lesson_video && (
                                <p className="mt-1 text-sm text-red-600">{errors.lesson_video}</p>
                            )}
                        </div>

                        {/* Document Upload */}
                        <div className="mb-3">
                            <label htmlFor="lesson_documents" className="block text-sm font-medium text-gray-700 mb-2">
                                Tài liệu {!isEdit && <span className="text-sm text-gray-500">(bắt buộc nếu không có video)</span>}
                                {files.documentFiles.length > 0 && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {files.documentFiles.length} file(s)
                                    </span>
                                )}
                            </label>
                            <input
                                type="file"
                                id="lesson_documents"
                                name="lesson_documents"
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.xlsx,.xls"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                multiple
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Có thể chọn nhiều file cùng lúc. Mỗi file tối đa 10MB.
                                <br />
                                Định dạng hỗ trợ: PDF, Word, PowerPoint, Excel, Text, ZIP, RAR
                            </p>

                            {files.documentFiles.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">Đã chọn {files.documentFiles.length} file(s)</span>
                                        <button
                                            type="button"
                                            onClick={clearAllDocuments}
                                            className="text-xs text-red-600 hover:text-red-800 underline"
                                        >
                                            Xóa tất cả
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {files.documentFiles.map((file, index) => (
                                            <div key={index} className="p-2 bg-white border rounded-md">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-700">{file.name}</span>
                                                        <span className="text-xs text-gray-500 ml-2">({formatFileSize(file.size)})</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDocumentFile(index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isEdit && initialData.lesson_documents && initialData.lesson_documents.length > 0 && files.documentFiles.length === 0 && (
                                <p className="mt-1 text-sm text-green-600">Đã có {initialData.lesson_documents.length} tài liệu (giữ tài liệu cũ nếu không tải lên mới)</p>
                            )}

                            {errors.lesson_documents && (
                                <p className="mt-1 text-sm text-red-600">{errors.lesson_documents}</p>
                            )}
                        </div>

                        {errors.files && (
                            <p className="text-sm text-red-600">{errors.files}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
                        >
                            {isSubmitting && (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {isEdit ? 'Cập nhật bài học' : 'Tạo bài học'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLessonModal;