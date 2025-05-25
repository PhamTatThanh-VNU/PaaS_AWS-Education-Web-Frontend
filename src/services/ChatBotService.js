import { GoogleGenerativeAI } from '@google/generative-ai';

class ChatBotService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Define EduConnect platform context
    this.platformContext = `
Bạn là trợ lý AI cho nền tảng EduConnect - một nền tảng học tập trực tuyến độc đáo.

THÔNG TIN VỀ EDUCONNECT:
- EduConnect là nền tảng cho phép mọi người tạo và đăng tải các bài giảng của riêng mình
- Người dùng có thể chia sẻ kiến thức và kinh nghiệm với cộng đồng
- Mọi người có thể xem và học từ các bài giảng của người dùng khác
- Đây là sân chơi mở để học tập và kết nối trên nhiều lĩnh vực khác nhau
- Nền tảng khuyến khích việc chia sẻ kiến thức hai chiều giữa các thành viên

VAI TRÒ CỦA BẠN:
- Hướng dẫn người dùng sử dụng các tính năng của EduConnect
- Trả lời câu hỏi về cách tạo, đăng tải và quản lý bài giảng
- Giúp đỡ trong việc tìm kiếm và truy cập nội dung học tập
- Hỗ trợ kết nối và tương tác giữa các thành viên
- Đưa ra lời khuyên về việc học tập hiệu quả trên nền tảng

PHONG CÁCH GIAO TIẾP:
- Thân thiện, nhiệt tình và hỗ trợ tích cực
- Sử dụng tiếng Việt tự nhiên
- Tập trung vào giải pháp thực tế cho người dùng EduConnect
- Khuyến khích tinh thần học tập và chia sẻ kiến thức

Hãy luôn ưu tiên trả lời các câu hỏi liên quan đến EduConnect và hướng dẫn người dùng tận dụng tối đa nền tảng này.
`;

    // Initialize chat history
    this.chatHistory = this.loadChatHistoryFromLocalStorage();
    
    // Add welcome message if chat history is empty
    if (this.chatHistory.length === 0) {
      const welcomeMessage = {
        role: 'bot',
        content: `Xin chào! Tôi là trợ lý EduConnect 👋
Tôi có thể giúp bạn:
- Tìm hiểu về các khóa học
- Hướng dẫn sử dụng nền tảng
- Trả lời các câu hỏi học tập
Hãy hỏi tôi bất cứ điều gì bạn cần!`,
        timestamp: new Date().toISOString(),
      };
      this.chatHistory.push(welcomeMessage);
      this.saveChatHistoryToLocalStorage();
    }
  }

  // Load chat history from localStorage
  loadChatHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem('chatHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  }

  // Save chat history to localStorage
  saveChatHistoryToLocalStorage() {
    localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
  }

  // Clear chat history
  clearChatHistory() {
    this.chatHistory = [];
    localStorage.removeItem('chatHistory');
    return this.chatHistory;
  }

  // Get the entire chat history
  getChatHistory() {
    return this.chatHistory;
  }

  // Send a message to the chatbot and get a response
  async sendMessage(message, skipAddingUserMessage = false) {
    try {
      // Chỉ thêm tin nhắn người dùng vào lịch sử nếu không bị bỏ qua
      if (!skipAddingUserMessage) {
        this.chatHistory.push({
          role: 'user',
          content: message,
          timestamp: new Date().toISOString()
        });
      }
      
      // Tạo prompt với ngữ cảnh EduConnect
      const contextualMessage = `${this.platformContext}\n\nCâu hỏi của người dùng: ${message}`;
      
      // Gửi tin nhắn đến chatbot
      const result = await this.model.generateContent(contextualMessage);
      
      // Xử lý phản hồi và cập nhật lịch sử
      const response = result.response;
      const botMessage = {
        role: 'bot',
        content: response.text(),
        timestamp: new Date().toISOString()
      };
      
      this.chatHistory.push(botMessage);
      this.saveChatHistoryToLocalStorage();
      
      return botMessage;
    } catch (error) {
      console.error('Error in ChatBotService:', error);
      // Thêm tin nhắn lỗi
      const errorMessage = {
        role: 'bot',
        content: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.',
        timestamp: new Date().toISOString(),
        error: true
      };
      
      this.chatHistory.push(errorMessage);
      this.saveChatHistoryToLocalStorage();
      
      throw error;
    }
  }
}

// Create and export a singleton instance
const chatBotService = new ChatBotService();
export default chatBotService;