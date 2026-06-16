// JavaScript Document

/* ==========================================================================
   --- 1. HIỆU ỨNG ĐỔI MÀU MENU KHI CUỘN MAN HÌNH ---
   ========================================================================== */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

/* ==========================================================================
   --- 2. LOGIC VẬN HÀNH TRỢ LÝ ẢO AI CHATBOT ---
   ========================================================================== */

// Ẩn/Hiện khung Chat
function toggleChatbot() {
    const chatBox = document.getElementById('aiChatBox');
    if (chatBox) {
        chatBox.classList.toggle('open');
        
        // Xóa dấu thông báo tin nhắn mới khi mở hộp thoại
        const badge = document.querySelector('.ai-badge');
        if (badge) badge.style.display = 'none';
    }
}

// Xử lý gửi tin nhắn của người dùng
function sendChatMessage() {
    const inputElement = document.getElementById('aiInput');
    const chatBody = document.getElementById('aiChatBody');
    
    if (!inputElement || !chatBody) return;
    
    const text = inputElement.value.trim();
    if (text === '') return;

    // 1. Thêm tin nhắn của User vào màn hình
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user';
    userMsg.innerText = text;
    chatBody.appendChild(userMsg);
    
    // Xóa nội dung trong ô nhập liệu
    inputElement.value = '';
    
    // Tự động cuộn xuống tin nhắn mới nhất
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Tạo hiệu ứng phản hồi tự động từ Trợ lý ảo sau 1 giây
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'ai-msg bot';
        
        // Phân tích câu trả lời giả lập thông minh theo từ khóa
        const userText = text.toLowerCase();
        if (userText.includes('giá') || userText.includes('bao nhiêu') || userText.includes('vnd')) {
            botMsg.innerText = "✨ Các tuyệt tác dòng Haute Couture của Luxury Bride dao động từ 15.000.000 VNĐ đến 32.000.000 VNĐ tùy độ tinh xảo tơ ren. Nàng có thể nhấn vào mục 'Xem Bộ Sưu Tập' trên banner để tham khảo bảng giá công khai nhé!";
        } else if (userText.includes('hẹn') || userText.includes('tư vấn') || userText.includes('thử váy')) {
            botMsg.innerText = "👑 Dạ Luxury Bride rất vinh hạnh được đón tiếp Nàng! Nàng có thể đi tới khối 'Liên Hệ' ở dưới hoặc để lại số điện thoại tại đây, chuyên viên tư vấn sẽ đặt lịch sớm nhất cho Nàng ạ!";
        } else {
            botMsg.innerText = "❤️ Cảm ơn chia sẻ của Nàng! Ý tưởng cưới của Nàng thật tuyệt vời. Để trợ giúp tốt nhất, Nàng muốn ghé thăm trực tiếp Showroom để chiêm ngưỡng hay muốn nhận catalogue điện tử trước ạ?";
        }
        
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Bấm phím Enter để gửi nhanh
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}