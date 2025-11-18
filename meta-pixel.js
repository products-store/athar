// meta-pixel.js
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

// استبدل هذا الرقم ببكسلك الحقيقي
fbq('init', '1474024530573881'); 
fbq('track', 'PageView');

// دوال التتبع للميتا بكسل
function trackMetaEvent(eventName, parameters = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
}

function trackMetaViewContent(product) {
    trackMetaEvent('ViewContent', {
        content_name: product.name,
        content_type: 'product',
        currency: 'DZD',
        value: product.price
    });
}

function trackMetaAddToCart(product) {
    trackMetaEvent('AddToCart', {
        content_name: product.name,
        content_type: 'product',
        currency: 'DZD',
        value: product.price * product.quantity,
        contents: [{
            id: product.id,
            quantity: product.quantity,
            item_price: product.price
        }]
    });
}

function trackMetaInitiateCheckout(cart) {
    const contents = cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.price
    }));
    
    const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    trackMetaEvent('InitiateCheckout', {
        contents: contents,
        currency: 'DZD',
        value: totalValue,
        num_items: cart.length
    });
}

function trackMetaPurchase(order) {
    const contents = order.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.price
    }));

    trackMetaEvent('Purchase', {
        contents: contents,
        currency: 'DZD',
        value: order.totalAmount,
        num_items: order.items.length
    });
}

// تحقق من تحميل ميتا بكسل
window.addEventListener('load', function() {
    if (typeof fbq !== 'undefined') {
        console.log('Meta Pixel loaded successfully');
    } else {
        console.error('Meta Pixel failed to load');
    }
});
