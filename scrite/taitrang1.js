// --- LOGIC XỬ LÝ ĐĂNG NHẬP TÀI KHOẢN ĐỒNG BỘ ---
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn trình duyệt tự động load lại trang
            
            // Tham chiếu các thành phần giao diện
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const thongbao = document.getElementById('thongbao');
            
            const userError = document.getElementById('userError');
            const passError = document.getElementById('passError');
            
            // Làm sạch các thông báo lỗi cũ
            userError.innerText = "";
            passError.innerText = "";
            thongbao.innerText = "";
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            let isValid = true;
            
            // 1. Kiểm tra ô tài khoản bỏ trống
            if (username === "") {
                userError.innerText = "⚠️ Nàng vui lòng nhập Email hoặc Số điện thoại.";
                isValid = false;
            }
            
            // 2. Kiểm tra ô mật khẩu bỏ trống
            if (password === "") {
                passError.innerText = "⚠️ Nàng chưa điền mật khẩu truy cập.";
                isValid = false;
            }
            
            if (isValid) {
                // Lấy dữ liệu tài khoản đã được đăng ký trong hệ thống LocalStorage
                const storedUser = JSON.parse(localStorage.getItem('storedUser'));
                
                if (storedUser) {
                    // Kiểm tra xem thông tin nhập vào có khớp với dữ liệu đã đăng ký không
                    if ((username === storedUser.email || username === storedUser.phone) && password === storedUser.password) {
                        
                        thongbao.style.color = "#2a9d8f";
                        thongbao.innerHTML = `🎉 Chào mừng Nàng <b>${storedUser.name}</b> quay trở lại! Đang vào không gian riêng...`;
                        
                        // Chuyển hướng thẳng về trang chủ sau 1.5 giây
                        setTimeout(function() {
                            window.location.href = "trangchu.html";
                        }, 1500);
                        
                    } else {
                        thongbao.style.color = "#e63946";
                        thongbao.innerText = "❌ Tài khoản hoặc mật khẩu chưa chính xác. Nàng vui lòng kiểm tra lại.";
                    }
                } else {
                    // Trường hợp kiểm tra giả lập không thấy có tài khoản nào trên máy
                    // Tạo sẵn một tài khoản mặc định để nàng dễ chạy thử kiểm tra giao diện (Admin)
                    if (username === "admin@gmail.com" && password === "123456") {
                        thongbao.style.color = "#2a9d8f";
                        thongbao.innerHTML = "🎉 Đăng nhập tài khoản trải nghiệm thành công! Đang chuyển hướng...";
                        setTimeout(function() {
                            window.location.href = "trangchu.html";
                        }, 1500);
                    } else {
                        thongbao.style.color = "#e63946";
                        thongbao.innerText = "❌ Tài khoản này chưa tồn tại trên hệ thống điện tử. Nàng hãy đăng ký trước nhé!";
                    }
                }
            }
        });
    }
});