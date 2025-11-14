// --- Product Data Definition ---
    const productDetails = {
        name: "قميص رجالي أنيق",
        price: 4800,
        imagePrefix: "images/shirt-",
        colors: {
            'black': {
                name: 'أسود',
                main: 'images/black-1.webp',
                thumbnails: [
                    'images/black-1.webp',
                    'images/black-2.webp',
                    'images/black-3.webp',
                    'images/black-4.webp',
                    'images/black-5.webp',
                    'images/black-6.webp'
                ],
                availableSizes: ['52', '54']
            },
            'farmelitar': {
                name: 'فارميليتار',
                main: 'images/farmelitar-1.webp',
                thumbnails: [
                    'images/farmelitar-1.webp',
                    'images/farmelitar-2.webp',
                    'images/farmelitar-3.webp',
                    'images/farmelitar-4.webp'
                ],
                availableSizes: ['52', '54', '56', '58']
            },
            'blue-far': {
                name: 'بلو فار',
                main: 'images/blue-far-1.webp',
                thumbnails: [
                    'images/blue-far-1.webp',
                    'images/blue-far-2.webp',
                    'images/blue-far-3.webp',
                    'images/blue-far-4.webp'
                ],
                availableSizes: ['52', '54', '56', '58']
            },


            'dark-gray': {
                name: 'رصاصي داكن',
                main: 'images/dark-gray-1.webp',
                thumbnails: [
                    'images/dark-gray-1.webp',
                    'images/dark-gray-2.webp',
                    'images/dark-gray-3.webp',
                    'images/dark-gray-4.webp'
                ],
                availableSizes: ['52', '54', '56', '58']
            },


            'dark-purple': {
                name: 'بنفسجي داكن',
                main: 'images/dark-purple-1.webp',
                thumbnails: [
                    'images/dark-purple-1.webp',
                    'images/dark-purple-2.webp',
                    'images/dark-purple-3.webp',
                    'images/dark-purple-4.webp'
                ],
                availableSizes: ['52', '56', '58']
            },
            'brown': {
                name: 'بني',
                main: 'images/brown-1.webp',
                thumbnails: [
                    'images/brown-1.webp',
                    'images/brown-2.webp',
                    'images/brown-3.webp',
                    'images/brown-4.webp'
                ],
                availableSizes: ['52', '54', '56', '58']
            }
        }
    };

const quickOrderBtn = document.querySelector('.quick-order-btn');

if (quickOrderBtn) {
    quickOrderBtn.addEventListener('click', () => {
        // التمرير السلس إلى بطاقة الطلب المباشر
        const quickOrderCard = document.getElementById('quick-order-card');
        if (quickOrderCard) {
            quickOrderCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // إضافة تأثير بصرية للفت الانتباه
            quickOrderCard.style.transition = 'all 0.5s ease';
            quickOrderCard.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.5)';
            
            setTimeout(() => {
                quickOrderCard.style.boxShadow = 'var(--box-shadow)';
            }, 1500);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    const colorButtons = document.querySelectorAll('.color-btn');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const cartCountElement = document.querySelector('.cart-count');

    // --- State Variables ---
    let selectedColor = 'black'; // Default color
    let selectedSize = 'S';     // Default size
    let cart = JSON.parse(localStorage.getItem('qudwahCart')) || [];

    // --- Helper Functions ---

    // Scroll smoothly to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Update main image and thumbnails
    const updateProductDisplay = (color) => {
        const colorData = productDetails.colors[color];
        if (!colorData) return;

        mainProductImage.src = colorData.main;

        thumbnailImages.forEach((thumb, index) => {
            if (colorData.thumbnails[index]) {
                thumb.src = colorData.thumbnails[index];
                thumb.style.display = 'block';
            } else {
                thumb.style.display = 'none';
            }
            thumb.classList.remove('active');
        });

        if (thumbnailImages.length > 0 && colorData.thumbnails[0]) {
            thumbnailImages[0].classList.add('active');
        }

        colorButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.color === color) btn.classList.add('active');
        });

        sizeButtons.forEach(btn => {
            const size = btn.dataset.size;
            if (colorData.availableSizes.includes(size)) {
                btn.removeAttribute('disabled');
                btn.classList.remove('disabled');
            } else {
                btn.setAttribute('disabled', 'true');
                btn.classList.add('disabled');
                btn.classList.remove('active');
            }
        });

        if (!colorData.availableSizes.includes(selectedSize)) {
            selectedSize = colorData.availableSizes[0] || '52';
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            const defaultSizeBtn = document.querySelector(`.size-btn[data-size="${selectedSize}"]`);
            if (defaultSizeBtn) defaultSizeBtn.classList.add('active');
        }
    };

    const handleColorChangeWithScroll = (color) => {
        selectedColor = color;
        updateProductDisplay(color);
        setTimeout(scrollToTop, 300);
    };

    const updateGlobalCartCount = () => {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = total;
    };

    const saveCartToLocalStorage = () => {
        localStorage.setItem('qudwahCart', JSON.stringify(cart));
    };

function trackViewContent(product) {
    if (typeof trackMetaViewContent !== 'undefined') {
        trackMetaViewContent(product);
    }
}

function trackAddToCart(product) {
    if (typeof trackMetaAddToCart !== 'undefined') {
        trackMetaAddToCart(product);
    }
}

function trackPurchase(order) {
    if (typeof trackMetaPurchase !== 'undefined') {
        trackMetaPurchase(order);
    }
}

    // --- Event Listeners ---

    thumbnailImages.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnailImages.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainProductImage.src = thumb.src;
        });
    });

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const color = button.dataset.color;
            handleColorChangeWithScroll(color);
        });
    });

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.hasAttribute('disabled')) {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedSize = button.dataset.size;
            }
        });
    });

    minusBtn.addEventListener('click', () => {
        const val = parseInt(quantityInput.value);
        if (val > 1) quantityInput.value = val - 1;
    });

    plusBtn.addEventListener('click', () => {
        const val = parseInt(quantityInput.value);
        quantityInput.value = val + 1;
    });

    quantityInput.addEventListener('change', () => {
        const val = parseInt(quantityInput.value);
        if (isNaN(val) || val < 1) quantityInput.value = 1;
    });

    // --- تعديل حدث "إضافة للسلة" بإضافة تتبع TikTok ---
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        const productId = `${selectedColor}-${selectedSize}`;
        const colorName = productDetails.colors[selectedColor].name;

        const existing = cart.findIndex(item => item.id === productId);
        if (existing > -1) {
            cart[existing].quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: productDetails.name,
                color: colorName,
                size: selectedSize,
                price: productDetails.price,
                quantity,
                image: productDetails.colors[selectedColor].main
            });
        }

        saveCartToLocalStorage();
        updateGlobalCartCount();

        // تتبع إضافة للسلة في TikTok
        trackAddToCart({
            id: productId,
            name: productDetails.name,
            price: productDetails.price,
            quantity: quantity
        });

        alert(`تم إضافة ${quantity} قطعة من المنتج إلى السلة!`);
    });



    // --- Initialization ---
    updateProductDisplay(selectedColor);
    updateGlobalCartCount();

    // --- تتبع مشاهدة صفحة المنتج ---
    trackViewContent({
        color: selectedColor,
        size: selectedSize,
        name: productDetails.name,
        price: productDetails.price
    });
});
