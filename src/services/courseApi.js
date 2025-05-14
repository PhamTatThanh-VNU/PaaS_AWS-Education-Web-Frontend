import axios from 'axios';
import { Auth } from 'aws-amplify';

// Tạo một instance axios với các cấu hình mặc định
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token xác thực vào mỗi request
api.interceptors.request.use(
  async (config) => {
    try {
      const currentSession = await Auth.currentSession();
      const token = currentSession.getIdToken().getJwtToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      // Nếu không có session (chưa đăng nhập), tiếp tục request mà không có token
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const seriesApi = {
  // Lấy danh sách series
  getAllSeries: async (params) => {
    try {
      const response = await api.get('/series', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy chi tiết một series
  getSeriesById: async (seriesId) => {
    try {
      const response = await api.get(`/series/${seriesId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo series mới
  createSeries: async (seriesData) => {
    try {
      const response = await api.post('/series', seriesData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật thông tin series
  updateSeries: async (seriesId, seriesData) => {
    try {
      const response = await api.put(`/series/${seriesId}`, seriesData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa series
  deleteSeries: async (seriesId) => {
    try {
      const response = await api.delete(`/series/${seriesId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload ảnh bìa cho series
  uploadSeriesCoverImage: async (seriesId, file) => {
    try {
      const formData = new FormData();
      formData.append('coverImage', file);
      
      const response = await api.post(`/series/${seriesId}/upload-cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo section mới trong series
  createSection: async (seriesId, sectionData) => {
    try {
      const response = await api.post(`/series/${seriesId}/sections`, sectionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật thông tin section
  updateSection: async (seriesId, sectionId, sectionData) => {
    try {
      const response = await api.put(`/series/${seriesId}/sections/${sectionId}`, sectionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa section
  deleteSection: async (seriesId, sectionId) => {
    try {
      const response = await api.delete(`/series/${seriesId}/sections/${sectionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

const lessonApi = {
  // Lấy chi tiết một bài học
  getLessonById: async (seriesId, lessonId) => {
    try {
      const response = await api.get(`/series/${seriesId}/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo bài học mới
  createLesson: async (seriesId, lessonData) => {
    try {
      const response = await api.post(`/series/${seriesId}/lessons`, lessonData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo bài học với các file đính kèm
  createLessonWithFiles: async (seriesId, lessonData, files) => {
    try {
      const formData = new FormData();
      
      // Thêm các trường dữ liệu cơ bản
      Object.keys(lessonData).forEach(key => {
        formData.append(key, lessonData[key]);
      });
      
      // Thêm các file nếu có
      if (files.videoFile) formData.append('videoFile', files.videoFile);
      if (files.documentFile) formData.append('documentFile', files.documentFile);
      if (files.thumbnailFile) formData.append('thumbnailFile', files.thumbnailFile);
      
      const response = await api.post(`/series/${seriesId}/lessons`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật thông tin bài học
  updateLesson: async (seriesId, lessonId, lessonData) => {
    try {
      const response = await api.put(`/series/${seriesId}/lessons/${lessonId}`, lessonData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Đánh dấu bài học đã hoàn thành
  markLessonAsCompleted: async (seriesId, lessonId) => {
    try {
      const response = await api.post(`/series/${seriesId}/lessons/${lessonId}/complete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa bài học
  deleteLesson: async (seriesId, lessonId) => {
    try {
      const response = await api.delete(`/series/${seriesId}/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

const commentApi = {
  // Lấy tất cả bình luận cho một bài học
  getCommentsByLessonId: async (lessonId) => {
    try {
      const response = await api.get(`/lessons/${lessonId}/comments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo bình luận mới
  createComment: async (lessonId, commentData) => {
    try {
      const response = await api.post(`/lessons/${lessonId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo trả lời cho bình luận
  createReply: async (lessonId, commentId, replyData) => {
    try {
      const response = await api.post(`/lessons/${lessonId}/comments/${commentId}/replies`, replyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Like/unlike một bình luận
  toggleLikeComment: async (lessonId, commentId) => {
    try {
      const response = await api.post(`/lessons/${lessonId}/comments/${commentId}/like`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Xóa một bình luận (chỉ người tạo hoặc admin)
  deleteComment: async (lessonId, commentId) => {
    try {
      const response = await api.delete(`/lessons/${lessonId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export { seriesApi, lessonApi, commentApi };
