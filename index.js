function setupCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let interval;
    
    // First ensure all items are hidden except first
    items.forEach((item, index) => {
        item.classList.toggle('active', index === 0);
    });
    
    // Function to handle moving to next item
    const nextItem = () => {
        // Hide current item
        items[currentIndex].classList.remove('active');
        
        // Calculate next index with loop
        currentIndex = (currentIndex + 1) % items.length;
        
        // Show next item
        items[currentIndex].classList.add('active');
    };
    
    // Start the interval
    const startCarousel = () => {
        interval = setInterval(nextItem, 3000);
    };
    
    // Initialize carousel after images load
    const initCarousel = async () => {
        const loadPromises = Array.from(items).map(item => {
            const fileId = item.getAttribute('data-drive-id');
            return loadDriveImage(item, fileId);
        });
        
        await Promise.all(loadPromises);
        startCarousel();
    };
    
    // Set up mouse events
    const carousel = document.querySelector('.photo-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', startCarousel);
    
    // Initialize
    initCarousel();
}

function loadDriveImage(element, fileId) {
    return new Promise((resolve) => {
        const url1 = `https://lh3.googleusercontent.com/d/${fileId}=s1000`;
        const url2 = `https://docs.google.com/uc?id=${fileId}`;
        
        const img = new Image();
        img.onload = () => {
            element.style.backgroundImage = `url('${url1}')`;
            resolve();
        };
        img.onerror = () => {
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
                element.style.backgroundImage = `url('${url2}')`;
                resolve();
            };
            fallbackImg.onerror = () => {
                element.style.backgroundImage = 'url(placeholder.jpg)';
                resolve();
            };
            fallbackImg.src = url2;
        };
        img.src = url1;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const closedCard = document.getElementById('closedCard');
    const openCard = document.getElementById('openCard');
    openCard.style.display = 'none';
    
    closedCard.addEventListener('click', function() {
        this.style.transform = 'rotateY(180deg)';
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.display = 'none';
            openCard.style.display = 'flex';
            openCard.style.animation = 'cardReveal 1s forwards';
            setupCarousel();
        }, 500);
    });
    
    function createEmojis() {
        const emojis = ['🎂', '🎉', '🥳', '🎁', '✨'];
        const container = document.querySelector('body');
        const card = document.querySelector('.card-container');
        
        for (let i = 0; i < 12; i++) {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.fontSize = (Math.random() * 15 + 15) + 'px';
            emoji.style.animation = `float ${Math.random() * 8 + 6}s ease-in-out infinite`;
            emoji.style.animationDelay = (Math.random() * 3) + 's';
            emoji.style.opacity = '0.6';
            emoji.style.pointerEvents = 'none';
            emoji.style.willChange = 'transform';
            emoji.style.zIndex = '0';
            
            const cardRect = card.getBoundingClientRect();
            let left, top;
            
            const area = Math.floor(Math.random() * 4);
            switch(area) {
                case 0: left = Math.random() * window.innerWidth;
                    top = Math.random() * cardRect.top; break;
                case 1: left = Math.random() * (window.innerWidth - cardRect.right) + cardRect.right;
                    top = Math.random() * window.innerHeight; break;
                case 2: left = Math.random() * window.innerWidth;
                    top = Math.random() * (window.innerHeight - cardRect.bottom) + cardRect.bottom; break;
                case 3: left = Math.random() * cardRect.left;
                    top = Math.random() * window.innerHeight; break;
            }
            
            emoji.style.left = left + 'px';
            emoji.style.top = top + 'px';
            container.appendChild(emoji);
        }
    }
    function playBirthdayAudio() {
        const audio = document.getElementById('birthdayAudio');
        audio.volume = 0.3; // Set volume to 30% (adjust as needed)
        
        // Modern browsers require interaction before playing audio
        document.body.addEventListener('click', function firstClick() {
            audio.play().catch(e => console.log("Audio play failed:", e));
            document.body.removeEventListener('click', firstClick);
        });
    }
    
    playBirthdayAudio();    
    createEmojis();
});