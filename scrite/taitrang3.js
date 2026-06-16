// JavaScript Document - Xử lý gửi nhận thư về Gmail cá nhân

// --- KHỞI TẠO EMAILJS ---
// Thay chuỗi "YOUR_PUBLIC_KEY" bằng Public Key trong tài khoản EmailJS của bạn
(function() {
    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY", 
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn form load lại trang khi bấm gửi
            
            // Lấy các thẻ đầu vào và thẻ báo lỗi
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const date = document.getElementById('appointmentDate');
            const message = document.getElementById('message');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const dateError = document.getElementById('dateError');
            const messageError = document.getElementById('messageError');
            
            // Xóa sạch thông báo lỗi cũ trước đó
            nameError.innerText = "";
            emailError.innerText = "";
            phoneError.innerText = "";
            dateError.innerText = "";
            messageError.innerText = "";
            
            let isValid = true;
            
            // 1. Kiểm tra Họ Tên
            if (fullname.value.trim() === "") {
                nameError.innerText = "⚠️ Nàng vui lòng điền họ và tên nhé.";
                isValid = false;
            }
            
            // 2. Kiểm tra Email bằng Regex chuẩn
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email.value.trim() === "") {
                emailError.innerText = "⚠️ Nàng vui lòng nhập địa chỉ Email.";
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                emailError.innerText = "⚠️ Định dạng Email chưa chính xác (Ví dụ: tuvan@gmail.com).";
                isValid = false;
            }
            
            // 3. Kiểm tra Số Điện Thoại (Định dạng Việt Nam)
            const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
            if (phone.value.trim() === "") {
                phoneError.innerText = "⚠️ Nàng hãy cung cấp số điện thoại để chuyên viên liên hệ nha.";
                isValid = false;
            } else if (!phoneRegex.test(phone.value.trim())) {
                phoneError.innerText = "⚠️ Số điện thoại không hợp lệ (Phải có 10 chữ số, bắt đầu bằng số 0).";
                isValid = false;
            }
            
            // 4. Kiểm tra Ngày Đặt Hẹn
            if (date.value === "") {
                dateError.innerText = "⚠️ Nàng hãy chọn một ngày mong muốn đến tiệm thử váy.";
                isValid = false;
            } else {
                const selectedDate = new Date(date.value);
                const today = new Date();
                today.setHours(0,0,0,0); // Đặt về đầu ngày để so sánh chuẩn xác
                
                if (selectedDate < today) {
                    dateError.innerText = "⚠️ Ngày hẹn không được nằm trong quá khứ đâu nè Nàng.";
                    isValid = false;
                }
            }
            
            // 5. Kiểm tra Lời Nhắn
            if (message.value.trim() === "") {
                messageError.innerText = "⚠️ Hãy để lại một vài thông tin về kiểu dáng váy Nàng mong muốn nhé.";
                isValid = false;
            }
            
            // --- HÀNH ĐỘNG KHI TẤT CẢ DỮ LIỆU ĐÃ HỢP LỆ ---
            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                const btnText = submitBtn.querySelector('.btn-text');

                const btnLoader = submitBtn.querySelector('.btn-loader');
                
                // Hiển thị trạng thái đang gửi
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-block';
                submitBtn.disabled = true;
                
                // Gọi EmailJS để bắn thông tin đơn đặt lịch thẳng về Gmail của bạn
                // Hãy thay thế "YOUR_SERVICE_ID" và "YOUR_TEMPLATE_ID" bằng mã thực tế từ EmailJS
                emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                    .then(() => {
                        alert('🎉 Đặt lịch thành công! Đơn đăng ký thử váy của Nàng đã được hệ thống gửi thẳng đến hòm thư Luxury Bride. Chuyên viên sẽ gọi điện xác nhận lịch hẹn trong ít phút nữa.');
                        form.reset(); // Làm sạch ô nhập liệu
                    })
                    .catch((error) => {
                        console.error('Lỗi kết nối hòm thư:', error);
                        alert('❌ Hệ thống gửi thư đang bận. Nàng vui lòng liên hệ hotline 0908 035 429 để được đặt lịch giữ chỗ khẩn cấp nhé!');
                    })
                    .finally(() => {
                        // Trả nút bấm về trạng thái ban đầu
                        btnText.style.display = 'inline-block';
                        btnLoader.style.display = 'none';
                        submitBtn.disabled = false;
                    });
            }
        });
    }
});