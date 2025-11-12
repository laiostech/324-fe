// YouTube Video Handler
document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('youtubeVideo');
    
    // Không cần thay đổi src vì đã có đầy đủ params trong HTML
    console.log('✅ Video src đã được cấu hình sẵn trong HTML');
    
    // Log khi video load thành công
    iframe.addEventListener('load', () => {
        console.log('✅ Video đã load thành công');
    });
    
    // Xử lý lỗi
    iframe.addEventListener('error', () => {
        console.error('❌ Không thể load video');
        showErrorMessage();
    });
    
    function showErrorMessage() {
        const videoWrapper = document.querySelector('.video-wrapper');
        videoWrapper.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #fff;
                padding: 20px;
            ">
                <div style="font-size: 3rem; margin-bottom: 10px;">⚠️</div>
                <div style="font-size: 1.1rem; margin-bottom: 10px;">Không thể tải video</div>
                <a href="https://youtu.be/FfWQOxWCmuY" 
                   target="_blank"
                   style="
                       color: #4a9eff;
                       text-decoration: none;
                       padding: 10px 20px;
                       background: rgba(74, 158, 255, 0.2);
                       border-radius: 4px;
                       display: inline-block;
                       margin-top: 10px;
                   ">
                    Xem trên YouTube
                </a>
            </div>
        `;
    }

    // PDF Viewer Handler
    const pdfButtons = document.querySelectorAll('.doc-btn');
    const pdfModal = document.getElementById('pdfModal');
    const pdfFrame = document.getElementById('pdfFrame');
    const pdfTitle = document.getElementById('pdfTitle');
    const closeModal = document.getElementById('closeModal');

    // Submenus
    const vanKienTongCucChinhTriSubmenu = document.getElementById('vanKienTongCucChinhTriSubmenu');
    const closeVanKienTongCucChinhTriSubmenu = document.getElementById('closeVanKienTongCucChinhTriSubmenu');

    const vanKienTrungUongSubmenu = document.getElementById('vanKienTrungUongSubmenu');
    const closeVanKienTrungUongSubmenu = document.getElementById('closeVanKienTrungUongSubmenu');

    const vanKienHoiLhpnVietNamSubmenu = document.getElementById('vanKienHoiLhpnVietNamSubmenu');
    const closeVanKienHoiLhpnVietNamSubmenu = document.getElementById('closeVanKienHoiLhpnVietNamSubmenu');

    const vanKienDoanTncsHoChiMinhSubmenu = document.getElementById('vanKienDoanTncsHoChiMinhSubmenu');
    const closeVanKienDoanTncsHoChiMinhSubmenu = document.getElementById('closeVanKienDoanTncsHoChiMinhSubmenu');

    // Mapping tên văn bản
    const documentTitles = {
        'chuong_trinh_hoi_nghi.pdf': 'CHƯƠNG TRÌNH HỘI NGHỊ',
        'du_thao_bao_cao_tong_ket_quan_khu.pdf': 'DỰ THẢO BÁO CÁO TỔNG KẾT QUÂN KHU',
        'bao_cao_tong_ket_quan_khu.pdf': 'BÁO CÁO TỔNG KẾT QUÂN KHU',
        'bao_cao_tong_ket_su_doan.pdf': 'BÁO CÁO TỔNG KẾT SƯ ĐOÀN',
        'chuong_trinh_hanh_dong.pdf': 'CHƯƠNG TRÌNH HÀNH ĐỘNG',
        'van_kien_tong_cuc_chinh_tri/du_thao_doan_tncs_ho_chi_minh.pdf': 'DỰ THẢO ĐOÀN TNCS HỒ CHÍ MINH',
        'van_kien_tong_cuc_chinh_tri/du_thao_phu_nu_quan_doi.pdf': 'DỰ THẢO PHỤ NỮ QUÂN ĐỘI',
        'van_kien_tong_cuc_chinh_tri/du_thao_cong_doan_quan_doi.pdf': 'DỰ THẢO CÔNG ĐOÀN QUÂN ĐỘI',
        'van_kien_trung_uong/van_kien_hoi_lhpn_viet_nam/3.pdf': 'DỰ THẢO BÁO CÁO CHÍNH TRỊ CỦA BCH TW HỘI LHPN VN KHÓA XIII TRÌNH ĐHĐB PN TOÀN QUỐC LẦN THỨ XIV',
        'van_kien_trung_uong/van_kien_hoi_lhpn_viet_nam/4.pdf': 'DỰ THẢO BÁO CÁO TỔNG KẾT THỰC HIỆN ĐIỀU LỆ HỘI LHPNVN LẦN THỨ XIII VÀ ĐỀ XUẤT SỬA ĐỔI BỔ SUNG',
        'van_kien_trung_uong/van_kien_hoi_lhpn_viet_nam/5.pdf': 'DỰ THẢO ĐIỀU LỆ HỘI LHPN VIỆT NAM',
        'van_kien_trung_uong/van_kien_doan_tncs_ho_chi_minh/1.pdf': 'DỰ THẢO BÁO CÁO TỔNG KẾT KẾT QUẢ THỰC HIỆN ĐIỀU LỆ ĐOÀN TNCS HCM KHOÁ XII',
        'van_kien_trung_uong/van_kien_doan_tncs_ho_chi_minh/2.pdf': 'BÁO CÁO CHÍNH TRỊ CỦA BAN CHẤP HÀNH TRUNG ƯƠNG ĐOÀN TNCS HỒ CHÍ MINH',
    };

    // Xử lý click vào nút văn bản
    pdfButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pdfFile = button.getAttribute('data-pdf');
            const submenu = button.getAttribute('data-submenu');

            if (submenu) {
                switch(submenu) {
                    case 'vanKienTongCucChinhTri':
                        vanKienTongCucChinhTriSubmenu.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        break;
                    case 'vanKienTrungUong':
                        vanKienTrungUongSubmenu.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        break;
                }
                return;
            }

            if (pdfFile) {
                openPdf(pdfFile);
            }
        });
    });

    function openPdf(pdfFile) {
        const title = documentTitles[pdfFile] || 'Văn bản';
        pdfTitle.textContent = title;

        const encoded = encodeURI(pdfFile);
        const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

        if (mobile) {
            // Trên điện thoại: mở tab mới để dùng viewer gốc (cuộn nhiều trang, pinch-zoom tốt hơn)
            // Sử dụng zoom=page-fit để đảm bảo bắt đầu từ trang 1
            const mobileUrl = `${encoded}#zoom=page-fit&page=1`;
            window.open(mobileUrl, '_blank');
            return;
        }

        // Trên máy tính: hiển thị trong modal iframe, fit toàn trang, ẩn chrome của viewer
        // Sử dụng zoom=page-fit&page=1 để đảm bảo luôn bắt đầu từ trang đầu tiên
        const desktopUrl = `${encoded}#zoom=page-fit&page=1&toolbar=0&navpanes=0&statusbar=0`;
        pdfFrame.src = desktopUrl;
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('📄 Đang mở:', title);
    }

    // Đóng modal
    function closePdfModal() {
        pdfModal.classList.remove('active');
        document.body.style.overflow = '';
        pdfFrame.src = '';
    }

    closeModal.addEventListener('click', closePdfModal);

    // Đóng khi click vào overlay
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });

    // Close VAN KIEN TONG CUC CHINH TRI submenu
    function closeVanKienTongCucChinhTriSubmenuFunc() {
        vanKienTongCucChinhTriSubmenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close VAN KIEN TRUNG UONG submenu
    function closeVanKienTrungUongSubmenuFunc() {
        vanKienTrungUongSubmenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close VAN KIEN HOI LHPN VIET NAM submenu
    function closeVanKienHoiLhpnVietNamSubmenuFunc() {
        vanKienHoiLhpnVietNamSubmenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close VAN KIEN DOAN TNCS HO CHI MINH submenu
    function closeVanKienDoanTncsHoChiMinhSubmenuFunc() {
        vanKienDoanTncsHoChiMinhSubmenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close all submenus function
    function closeAllSubmenus() {
        closeVanKienTongCucChinhTriSubmenuFunc();
        closeVanKienTrungUongSubmenuFunc();
        closeVanKienHoiLhpnVietNamSubmenuFunc();
        closeVanKienDoanTncsHoChiMinhSubmenuFunc();
    }

    // Event listeners for close buttons
    closeVanKienTongCucChinhTriSubmenu?.addEventListener('click', closeVanKienTongCucChinhTriSubmenuFunc);
    closeVanKienTrungUongSubmenu?.addEventListener('click', closeVanKienTrungUongSubmenuFunc);
    closeVanKienHoiLhpnVietNamSubmenu?.addEventListener('click', closeVanKienHoiLhpnVietNamSubmenuFunc);
    closeVanKienDoanTncsHoChiMinhSubmenu?.addEventListener('click', closeVanKienDoanTncsHoChiMinhSubmenuFunc);

    // Event listeners for clicking outside
    vanKienTongCucChinhTriSubmenu?.addEventListener('click', (e) => {
        if (e.target === vanKienTongCucChinhTriSubmenu) {
            closeVanKienTongCucChinhTriSubmenuFunc();
        }
    });

    vanKienTrungUongSubmenu?.addEventListener('click', (e) => {
        if (e.target === vanKienTrungUongSubmenu) {
            closeVanKienTrungUongSubmenuFunc();
        }
    });

    vanKienHoiLhpnVietNamSubmenu?.addEventListener('click', (e) => {
        if (e.target === vanKienHoiLhpnVietNamSubmenu) {
            closeVanKienHoiLhpnVietNamSubmenuFunc();
        }
    });

    vanKienDoanTncsHoChiMinhSubmenu?.addEventListener('click', (e) => {
        if (e.target === vanKienDoanTncsHoChiMinhSubmenu) {
            closeVanKienDoanTncsHoChiMinhSubmenuFunc();
        }
    });

    // Handle submenu item clicks
    document.querySelectorAll('.submenu-btn')?.forEach(btn => {
        btn.addEventListener('click', () => {
            const pdf = btn.getAttribute('data-pdf');
            const submenu = btn.getAttribute('data-submenu');

            // Đóng tất cả các submenu hiện tại
            closeAllSubmenus();

            if (pdf) {
                // Nếu có data-pdf, mở PDF
                openPdf(pdf);
            } else if (submenu) {
                // Nếu có data-submenu, mở submenu tương ứng
                switch(submenu) {
                    case 'vanKienHoiLhpnVietNam':
                        vanKienHoiLhpnVietNamSubmenu.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        break;
                    case 'vanKienDoanTncsHoChiMinh':
                        vanKienDoanTncsHoChiMinhSubmenu.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        break;
                }
            }
        });
    });

    // Đóng khi nhấn ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (pdfModal.classList.contains('active')) {
                closePdfModal();
            } else if (vanKienDoanTncsHoChiMinhSubmenu.classList.contains('active')) {
                closeVanKienDoanTncsHoChiMinhSubmenuFunc();
            } else if (vanKienHoiLhpnVietNamSubmenu.classList.contains('active')) {
                closeVanKienHoiLhpnVietNamSubmenuFunc();
            } else if (vanKienTrungUongSubmenu.classList.contains('active')) {
                closeVanKienTrungUongSubmenuFunc();
            } else if (vanKienTongCucChinhTriSubmenu.classList.contains('active')) {
                closeVanKienTongCucChinhTriSubmenuFunc();
            }
        }
    });

    // Xử lý lỗi khi load PDF
    pdfFrame.addEventListener('error', () => {
        console.error('❌ Không thể load PDF');
        alert('Không thể tải văn bản. Vui lòng thử lại sau.');
        closePdfModal();
    });
});

// Responsive handling
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('📱 Window resized:', {
            width: window.innerWidth,
            height: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        });
    }, 250);
});

// Orientation change - removed iframe reload to prevent layout changes
window.addEventListener('orientationchange', () => {
    console.log('🔄 Orientation changed');
    // Chỉ log orientation change, không reload iframe để tránh giật giao diện
});

// Prevent context menu on video (optional)
document.querySelector('.video-wrapper')?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Page visibility - pause video when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📴 Page hidden');
    } else {
        console.log('📺 Page visible');
    }
});

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeDistance = touchEndY - touchStartY;
    
    // Swipe down to reload (only at top of page)
    if (window.scrollY === 0 && swipeDistance > 100) {
        console.log('🔄 Pull to refresh');
        location.reload();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // F5 or Ctrl+R: Reload
    if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        console.log('🔄 Reloading page');
    }
    
    // Esc: Exit fullscreen
    if (e.key === 'Escape') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Log viewport info
console.log('📱 Device Info:', {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewport: {
        width: window.innerWidth,
        height: window.innerHeight
    }
});
