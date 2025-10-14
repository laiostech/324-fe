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

    // Submenu (KY YEU)
    const kyYeuSubmenu = document.getElementById('kyYeuSubmenu');
    const closeSubmenu = document.getElementById('closeSubmenu');

    // Mapping tên văn bản
    const documentTitles = {
        'chuong_trinh_hoi_nghi.pdf': 'CHƯƠNG TRÌNH HỘI NGHỊ',
        'van_ban_qutw.pdf': 'VĂN BẢN QUTW, BQP',
        'bao_cao_tong_ket_quan_khu.pdf': 'BÁO CÁO TỔNG KẾT QUÂN KHU',
        'bao_cao_tong_ket_su_doan.pdf': 'BÁO CÁO TỔNG KẾT SƯ ĐOÀN',
        'ky_yeu.pdf': 'KỶ YẾU'
    };

    // Xử lý click vào nút văn bản
    pdfButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pdfFile = button.getAttribute('data-pdf');

            // Nếu là KỶ YẾU: mở submenu thay vì mở PDF trực tiếp
            if (pdfFile === 'ky_yeu.pdf') {
                kyYeuSubmenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                return;
            }

            openPdf(pdfFile);
        });
    });

    function openPdf(pdfFile) {
        const title = documentTitles[pdfFile] || 'Văn bản';
        pdfTitle.textContent = title;

        // Cải thiện hiển thị PDF: fit chiều rộng và giữ zoom thích hợp cho mobile
        // Sử dụng view=FitH để fit theo chiều ngang, tốt hơn cho mobile
        const encoded = encodeURI(pdfFile);
        const viewerUrl = `${encoded}#view=FitH&toolbar=0&navpanes=0&statusbar=0&zoom=page-width`;
        pdfFrame.src = viewerUrl;
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

    // Close submenu
    function closeKyYeuSubmenu() {
        kyYeuSubmenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeSubmenu?.addEventListener('click', closeKyYeuSubmenu);

    kyYeuSubmenu?.addEventListener('click', (e) => {
        if (e.target === kyYeuSubmenu) {
            closeKyYeuSubmenu();
        }
    });

    // Handle submenu item clicks
    document.querySelectorAll('.submenu-btn')?.forEach(btn => {
        btn.addEventListener('click', () => {
            const pdf = btn.getAttribute('data-pdf');
            closeKyYeuSubmenu();
            openPdf(pdf);
        });
    });

    // Đóng khi nhấn ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
            closePdfModal();
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
