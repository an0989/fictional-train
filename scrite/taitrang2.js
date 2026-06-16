// --- ĐIỀU HƯỚNG QUAY VỀ TRANG CHỦ KHI BẤM NÚT MŨI TÊN ---
function goToHome(event) {
    if (event) event.preventDefault();
    window.location.href = "trangchu.html";
}

// --- LOGIC XỬ LÝ ĐĂNG KÝ TÀI KHOẢN ---
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn trang bị tải lại
            
            // Tham chiếu tới các thẻ đầu vào
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const rePassword = document.getElementById('re-password');
            const thongbao = document.getElementById('thongbao');
            
            // Tham chiếu tới các vùng báo lỗi
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const passwordError = document.getElementById('passwordError');
            const rePasswordError = document.getElementById('rePasswordError');
            
            // Xóa sạch thông báo cũ
            nameError.innerText = "";
            emailError.innerText = "";
            phoneError.innerText = "";
            passwordError.innerText = "";
            rePasswordError.innerText = "";
            thongbao.innerText = "";
            
            let isValid = true;
            
            // 1. Kiểm tra Họ và tên
            if (fullname.value.trim() === "") {
                nameError.innerText = "⚠️ Nàng vui lòng nhập họ và tên của mình.";
                isValid = false;
            }
            
            // 2. Kiểm tra Email
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email.value.trim() === "") {
                emailError.innerText = "⚠️ Địa chỉ email không được bỏ trống.";
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                emailError.innerText = "⚠️ Định dạng email chưa hợp lệ (Ví dụ: tên@gmail.com).";
                isValid = false;
            }
            
            // 3. Kiểm tra Số điện thoại
            const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
            if (phone.value.trim() === "") {
                phoneError.innerText = "⚠️ Vui lòng cung cấp số điện thoại liên lạc.";
                isValid = false;
            } else if (!phoneRegex.test(phone.value.trim())) {
                phoneError.innerText = "⚠️ Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.";
                isValid = false;
            }
            
            // 4. Kiểm tra Mật khẩu
            if (password.value === "") {
                passwordError.innerText = "⚠️ Nàng hãy thiết lập một mật khẩu bảo mật.";
                isValid = false;
            } else if (password.value.length < 6) {
                passwordError.innerText = "⚠️ Mật khẩu phải có độ dài tối thiểu từ 6 ký tự trở lên.";
                isValid = false;
            }
            
            // 5. Kiểm tra Xác nhận lại mật khẩu
            if (rePassword.value === "") {
                rePasswordError.innerText = "⚠️ Vui lòng nhập lại mật khẩu vừa thiết lập.";
                isValid = false;
            } else if (password.value !== rePassword.value) {
                rePasswordError.innerText = "⚠️ Mật khẩu xác nhận chưa trùng khớp. Hãy thử lại.";
                isValid = false;
            }
            
            // --- HÀNH ĐỘNG KHI FORM HỢP LỆ ---
            if (isValid) {
                // Tạo giả lập lưu trữ dữ liệu vào LocalStorage của trình duyệt
                const userAccount = {
                    name: fullname.value.trim(),
                    email: email.value.trim(),
                    phone: phone.value.trim(),
                    password: password.value
                };
                
                localStorage.setItem('storedUser', JSON.stringify(userAccount));
                
                // Hiển thị thông báo thành công rực rỡ
                thongbao.style.color = "#2e7d32";
                thongbao.innerText = "🎉 Chúc mừng Nàng đăng ký không gian riêng thành công!";
                
                // Tự động chuyển hướng sang trang đăng nhập sau 1.5 giây
                setTimeout(() => {
                    window.location.href = "dangnhap.html";
                }, 1500);
            } else {
                // Hiển thị thông báo nhắc nhở tổng quan
                thongbao.style.color = "#d32f2f";
                thongbao.innerText = "❌ Đăng ký thất bại. Nàng vui lòng kiểm tra lại các trường thông tin phía trên.";
            }
        });
    }
});