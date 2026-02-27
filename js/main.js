document.addEventListener('DOMContentLoaded', () => {
    // 1. Staggered Entrance Animation
    const cards = document.querySelectorAll('.card, .social-tile');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    // 2. Copy Email functionality
    const copyEmailBtn = document.querySelector('.copy-btn');
    const myEmail = "endang@example.com";

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(myEmail).then(() => {
                const originalContent = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<span>Copied!</span><i class="fa-solid fa-check"></i>';
                copyEmailBtn.style.backgroundColor = '#2e7d32';
                copyEmailBtn.style.color = '#ffffff';

                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalContent;
                    copyEmailBtn.style.backgroundColor = '';
                    copyEmailBtn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }

    // 3. Dark Mode Toggle Functionality
    const modeSwitch = document.querySelector('.mode-switch');
    const body = document.body;
    const switchHandleIcon = document.querySelector('.switch-handle i');
    let isDarkMode = true;

    if (modeSwitch) {
        modeSwitch.addEventListener('click', () => {
            isDarkMode = !isDarkMode;

            if (isDarkMode) {
                body.classList.remove('light-mode');
                switchHandleIcon.className = 'fa-solid fa-moon';
            } else {
                body.classList.add('light-mode');
                switchHandleIcon.className = 'fa-solid fa-sun';
            }
        });
    }

    // 4. Typing Animation for About Section
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const text = typingElement.innerText;
        typingElement.innerText = '';
        typingElement.innerHTML = '<span class="text-content"></span><span class="typing-cursor"></span>';

        const textContainer = typingElement.querySelector('.text-content');
        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                textContainer.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 30);
            } else {
                setTimeout(() => {
                    charIndex = 0;
                    textContainer.textContent = '';
                    type();
                }, 5000);
            }
        }
        setTimeout(type, 1000);
    }

    // 5. Advanced Card Hover Effects (Parallax + Tilt)
    cards.forEach(card => {
        if (card.classList.contains('image-card')) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.zIndex = "10";
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.zIndex = "1";
        });
    });

    // 6. Subtle Floating Animation for Images
    const images = document.querySelectorAll('.image-card img');
    images.forEach((img, index) => {
        img.style.animation = `float ${3 + index}s ease-in-out infinite alternate`;
    });
});

// Add Float dynamics to CSS via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: scale(1) translateY(0); }
        100% { transform: scale(1.05) translateY(-5px); }
    }
`;
document.head.appendChild(style);
