/* ==========================================================================
   --- BI?N TOÀN C?C ---
   ========================================================================== */
let sanPhamDangChon = "";
let isDragging = false; 

/* ==========================================================================
   --- HÀM X? LÝ POP-UP MUA HÀNG ---
   ========================================================================== */
function moXacNhan(tenSanPham) {
    sanPhamDangChon = tenSanPham;
    document.getElementById('modal-text').innerText = `Nàng có mu?n mua s?n ph?m "${tenSanPham}" này không?`;
    document.getElementById('buy-modal').style.display = 'flex';
}

function dongXacNhan() {
    document.getElementById('buy-modal').style.display = 'none';
}

function xacNhanMua() {
    document.getElementById('buy-modal').style.display = 'none';
    alert(`?? Chúc m?ng Nàng! Ðã d?t hàng thành công s?n ph?m: ${sanPhamDangChon}. Luxury Bride s? liên h? xác nh?n trong ít phút.`);
}

/* ==========================================================================
   --- HÀM ÐÓNG / M? KHUNG CHAT ---
   ========================================================================== */
function toggleChat() {
    if (isDragging) return; 
    const chatBody = document.getElementById('chat-body');
    const toggleBtn = document.getElementById('chat-toggle-btn');
    if (chatBody.style.display === 'none') {
        chatBody.style.display = 'flex';
        toggleBtn.innerText = '-';
    } else {
        chatBody.style.display = 'none';
        toggleBtn.innerText = '+';
    }
}

/* ==========================================================================
   --- HÀM G?I TIN NH?N CHAT (CÓ KI?M TRA Ð?U VÀO) ---
   ========================================================================== */
function sendMessage() {
    const input = document.getElementById('user-input');
    const messageText = input.value.trim();

    // 1. Ki?m tra b? tr?ng
    if (messageText === '') {
        alert("?? Vui lòng nh?p n?i dung tin nh?n, không du?c b? tr?ng thông tin!");
        input.focus();
        return;
    }

    // 2. Ð?nh nghia m?u ki?m tra d?nh d?ng d? li?u (Regex)
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(?:\+84|0)[35789]\d{8}\b/; // Chu?n s? di?n tho?i VN

    const containsAtSign = messageText.includes('@');
    const containsNumbersOnly = /^\d+$/.test(messageText);

    // Ki?m tra d?nh d?ng n?u nghi v?n là Email
    if (containsAtSign && !emailRegex.test(messageText)) {
        alert("?? Ð?nh d?ng Email không h?p l?! Vui lòng ki?m tra l?i (Ví d?: luxury@gmail.com).");
        input.focus();
        return;
    }

    // Ki?m tra d?nh d?ng n?u nghi v?n là S? di?n tho?i
    if (containsNumbersOnly && !phoneRegex.test(messageText)) {
        alert("?? S? di?n tho?i không h?p l?! Vui lòng nh?p dúng s? di?n tho?i di d?ng Vi?t Nam (9 - 11 ch? s?).");
        input.focus();
        return;
    }

    // --- Th?c hi?n g?i tin nh?n khi m?i d? li?u dã h?p l? ---
    const chatBox = document.getElementById('chat-box');
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.innerText = messageText;
    chatBox.appendChild(userMsg);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Bot tr? l?i t? d?ng sau 1 giây
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'msg bot';
        botMsg.innerText = "Yêu c?u c?a Nàng dã du?c ti?p nh?n. Chuyên viên tu v?n riêng s? nh?n tin qua S? di?n tho?i/Zalo h? tr? Nàng l?a ch?n m?u váy hoàn h?o nh?t l?p t?c ?! ?";
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage();
}

/* ==========================================================================
   --- THU?T TOÁN KÉO TH? DI CHUY?N KHUNG CHAT ---
   ========================================================================== */
const chatContainer = document.getElementById('chat-container');
const dragHandle = document.getElementById('chat-drag-handle');
let startX, startY, initialLeft, initialTop;

// L?ng nghe s? ki?n b?t d?u kéo chu?t
if (dragHandle) {
    dragHandle.addEventListener('mousedown', (e) => {
        if (e.target.id === 'chat-toggle-btn') return;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        const rect = chatContainer.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        
        chatContainer.style.bottom = 'auto';
        chatContainer.style.right = 'auto';
        chatContainer.style.left = initialLeft + '