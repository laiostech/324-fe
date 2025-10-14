// API Base URL
const API_BASE = '/api';

// State
let products = [];
let users = [];

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const productGrid = document.getElementById('productGrid');
const userList = document.getElementById('userList');
const productsLoading = document.getElementById('productsLoading');
const usersLoading = document.getElementById('usersLoading');
const refreshProducts = document.getElementById('refreshProducts');
const refreshUsers = document.getElementById('refreshUsers');
const productCount = document.getElementById('productCount');
const userCount = document.getElementById('userCount');
const statusDot = document.getElementById('statusDot');
const serverStatus = document.getElementById('serverStatus');

// Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Close menu when clicking nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
    });
});

// Fetch Products
async function fetchProducts() {
    try {
        productsLoading.style.display = 'block';
        productGrid.innerHTML = '';
        
        const response = await fetch(`${API_BASE}/products`);
        const data = await response.json();
        
        products = data.data || [];
        productCount.textContent = products.length;
        
        renderProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = '<div class="loading">❌ Không thể tải sản phẩm</div>';
    } finally {
        productsLoading.style.display = 'none';
    }
}

// Render Products
function renderProducts() {
    if (products.length === 0) {
        productGrid.innerHTML = '<div class="loading">Chưa có sản phẩm nào</div>';
        return;
    }
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-header">
                <div>
                    <div class="product-name">${product.name}</div>
                    <span class="product-category">${product.category}</span>
                </div>
            </div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-stock ${product.stock > 0 ? 'stock-available' : ''}">
                ${product.stock > 0 ? `✓ Còn ${product.stock} sản phẩm` : '✗ Hết hàng'}
            </div>
        </div>
    `).join('');
}

// Fetch Users
async function fetchUsers() {
    try {
        usersLoading.style.display = 'block';
        userList.innerHTML = '';
        
        const response = await fetch(`${API_BASE}/users`);
        const data = await response.json();
        
        users = data.data || [];
        userCount.textContent = users.length;
        
        renderUsers();
    } catch (error) {
        console.error('Error fetching users:', error);
        userList.innerHTML = '<div class="loading">❌ Không thể tải người dùng</div>';
    } finally {
        usersLoading.style.display = 'none';
    }
}

// Render Users
function renderUsers() {
    if (users.length === 0) {
        userList.innerHTML = '<div class="loading">Chưa có người dùng nào</div>';
        return;
    }
    
    userList.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-avatar">${getInitials(user.name)}</div>
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-email">📧 ${user.email}</div>
                <div class="user-phone">📱 ${user.phone}</div>
            </div>
        </div>
    `).join('');
}

// Check Server Health
async function checkServerHealth() {
    try {
        const response = await fetch(`${API_BASE}/health`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            statusDot.classList.add('online');
            statusDot.classList.remove('offline');
            serverStatus.textContent = 'Server đang hoạt động';
        }
    } catch (error) {
        statusDot.classList.add('offline');
        statusDot.classList.remove('online');
        serverStatus.textContent = 'Server không phản hồi';
    }
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active Nav on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .bottom-nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        const dataSection = link.getAttribute('data-section');
        
        if (href === `#${current}` || dataSection === current) {
            link.classList.add('active');
        }
    });
});

// Event Listeners
refreshProducts.addEventListener('click', fetchProducts);
refreshUsers.addEventListener('click', fetchUsers);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchUsers();
    checkServerHealth();
    
    // Periodic health check
    setInterval(checkServerHealth, 30000); // Every 30 seconds
});

// Pull to Refresh (Simple implementation)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    if (window.scrollY === 0 && touchEndY > touchStartY + 100) {
        fetchProducts();
        fetchUsers();
        checkServerHealth();
    }
}

