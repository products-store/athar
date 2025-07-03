// في بداية الملف
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.length = 0; // تفريغ المصفوفة الحالية
        cart.push(...JSON.parse(savedCart));
        updateCartCount();
    }
}

const cart = [];

// دالة لتحديث عدد العناصر في السلة
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}
// دالة لحفظ السلة في localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// دالة لتحميل السلة من localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.push(...JSON.parse(savedCart));
        updateCartCount();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Functionality
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Product Image Thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainProductImage = document.getElementById('mainProductImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            mainProductImage.src = this.dataset.src;
        });
    });

// Color Options
const colorOptions = document.querySelectorAll('.color-option');
const selectedColorDisplay = document.getElementById('selectedColorDisplay');

colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all color options
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Get selected color
        const selectedColor = this.dataset.color;
        const colorValue = this.style.backgroundColor;
        
        // Update selected color display
        selectedColorDisplay.textContent = `اللون: ${selectedColor}`;
        selectedColorDisplay.style.backgroundColor = colorValue;
        selectedColorDisplay.style.display = 'inline-block';
        
        // Update all thumbnails and main image
        thumbnails.forEach((thumb, index) => {
            const newSrc = `images/product-${selectedColor}-${index + 1}.jpeg`;
            thumb.src = newSrc;
            thumb.dataset.src = newSrc;
        });
        
        // Update main image to first thumbnail of new color
        mainProductImage.src = `images/product-${selectedColor}-1.jpeg`;
    });
});
// عند تحميل الصفحة، تأكد من عرض اللون الافتراضي
document.addEventListener('DOMContentLoaded', function() {
    const defaultColorOption = document.querySelector('.color-option.active');
    if (defaultColorOption) {
        const defaultColor = defaultColorOption.dataset.color;
        const defaultColorValue = defaultColorOption.style.backgroundColor;
        selectedColorDisplay.textContent = `اللون المختار: ${defaultColor}`;
        selectedColorDisplay.style.backgroundColor = defaultColorValue;
    }
});
    // Size Options
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all size options
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });

        // Add to Cart Button
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const selectedColor = document.querySelector('.color-option.active').dataset.color;
            const selectedSize = document.querySelector('.size-option.active').dataset.size;
            const quantity = document.getElementById('quantity').value;
            
            alert(`تمت إضافة المنتج إلى السلة!\nاللون: ${selectedColor}\nالمقاس: ${selectedSize}\nالكمية: ${quantity}`);
            
            // Here you would normally add the product to cart
            // For now we'll just show an alert
        });
    }
    });

document.getElementById('addToCartBtn')?.addEventListener('click', function() {
    const selectedColor = document.querySelector('.color-option.active').dataset.color;
    const selectedSize = document.querySelector('.size-option.active').dataset.size;
    const quantity = parseInt(document.getElementById('quantity').value);
    const productName = document.querySelector('.product-title').textContent;
    const productPrice = parseInt(document.querySelector('.product-price').textContent);
    const productImage = document.getElementById('mainProductImage').src;

    const product = {
        id: `${productName}-${selectedColor}-${selectedSize}`,
        name: productName,
        price: productPrice,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        image: productImage
    };

    // التحقق إذا كان المنتج موجوداً بالفعل في السلة
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id
    );

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push(product);
    }

    saveCartToStorage();
    updateCartCount();
    
    alert(`تمت إضافة ${quantity} من المنتج إلى السلة`);
});

// زر الإتمام المباشر للشراء
document.getElementById('directCheckoutBtn')?.addEventListener('click', function() {
    const selectedColor = document.querySelector('.color-option.active').dataset.color;
    const selectedSize = document.querySelector('.size-option.active').dataset.size;
    const quantity = parseInt(document.getElementById('quantity').value);
    const productName = document.querySelector('.product-title').textContent;
    const productPrice = parseInt(document.querySelector('.product-price').textContent);
    const productImage = document.getElementById('mainProductImage').src;

    const product = {
        id: `${productName}-${selectedColor}-${selectedSize}`,
        name: productName,
        price: productPrice,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        image: productImage
    };

    // مسح السلة أولاً ثم إضافة المنتج الحالي فقط
    cart.length = 0;
    cart.push(product);
    saveCartToStorage();
    updateCartCount();
    
    // الانتقال إلى صفحة الدفع
    window.location.href = 'checkout.html';
});




// زر الإتمام المباشر للشراء
document.querySelector('.checkout-now-btn')?.addEventListener('click', function() {
    const selectedColor = document.querySelector('.color-option.active').dataset.color;
    const selectedSize = document.querySelector('.size-option.active').dataset.size;
    const quantity = parseInt(document.getElementById('quantity').value);
    const productName = document.querySelector('.product-title').textContent;
    const productPrice = parseInt(document.querySelector('.product-price').textContent);
    const productImage = document.getElementById('mainProductImage').src;

    const product = {
        id: `${productName}-${selectedColor}-${selectedSize}`,
        name: productName,
        price: productPrice,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        image: productImage
    };

    // مسح السلة أولاً ثم إضافة المنتج الحالي فقط
    cart.length = 0;
    cart.push(product);
    saveCartToStorage();
    updateCartCount();
    
    // الانتقال إلى صفحة الدفع
    window.location.href = 'checkout.html';
});