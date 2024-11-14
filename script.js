// Custom cursor







document.addEventListener('mousemove', (e) => {







    const cursor = document.querySelector('.cursor');







    const x = e.clientX;







    const y = e.clientY;







    







    cursor.style.left = x + 'px';







    cursor.style.top = y + 'px';







    







    // Add ripple effect on click







    document.addEventListener('click', () => {







        cursor.classList.add('expand');







        setTimeout(() => {







            cursor.classList.remove('expand');







        }, 500);







    });







});















// Hover effect for cursor







document.querySelectorAll('a, button, .skill-list li, .contact p').forEach(element => {







    element.addEventListener('mouseenter', () => {







        document.querySelector('.cursor').style.transform = 'translate(-50%, -50%) scale(1.5)';







    });







    







    element.addEventListener('mouseleave', () => {







        document.querySelector('.cursor').style.transform = 'translate(-50%, -50%) scale(1)';







    });







});















// Preloader with 5-second maximum







const startLoading = () => {







    const preloader = document.querySelector('.preloader');







    const paper = document.querySelector('.paper');







    







    // Set maximum loading time to 5 seconds







    const maxLoadTime = 5000;







    const startTime = Date.now();







    







    // Create a progress counter







    const updateProgress = () => {







        const currentTime = Date.now();







        const elapsedTime = currentTime - startTime;







        







        if (elapsedTime >= maxLoadTime) {







            // Maximum time reached, hide preloader







            hidePreloader();







        } else {







            // Continue updating progress







            requestAnimationFrame(updateProgress);







        }







    };















    const hidePreloader = () => {







        preloader.style.opacity = '0';







        paper.classList.remove('hidden');







        







        setTimeout(() => {







            preloader.style.display = 'none';







            initSectionAnimations();







            initHeaderEffects(); // Initialize header hover effects







        }, 500);







    };















    // Start progress animation







    updateProgress();







};















// Section animations on scroll







function initSectionAnimations() {







    const sections = document.querySelectorAll('section');







    







    const observer = new IntersectionObserver((entries) => {







        entries.forEach(entry => {







            if (entry.isIntersecting) {







                entry.target.classList.add('visible');







            }







        });







    }, { threshold: 0.1 });















    sections.forEach(section => {







        observer.observe(section);







    });







}















// Add loading animation for skill items







document.querySelectorAll('.skill-list li').forEach((skill, index) => {







    skill.style.animationDelay = `${index * 0.1}s`;







    skill.classList.add('fade-in');







});















// Add typewriter effect







function initTypewriter() {







    const name = document.querySelector('h1');







    const subtitle = document.querySelector('.subtitle');







    







    // Clear and add typewriter class







    name.innerHTML = `<span class="typewriter">${name.textContent}</span>`;







    subtitle.innerHTML = `<span class="typewriter" style="animation-delay: 3.5s">${subtitle.textContent}</span>`;







}















// Add text shuffle effect



function shuffleText(element, originalText) {



    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';



    let iterations = 0;



    const maxIterations = 10;



    



    const interval = setInterval(() => {



        element.innerText = originalText



            .split('')



            .map((letter, index) => {



                if (index < iterations) {



                    return originalText[index];



                }



                return letters[Math.floor(Math.random() * 26)];



            })



            .join('');



        



        iterations += 1/3;



        



        if (iterations >= originalText.length) {



            clearInterval(interval);



        }



    }, 30);



}















// Add header hover effects



function initHeaderEffects() {



    const headerElements = [



        document.querySelector('h1'),



        document.querySelector('.subtitle')



    ];



    



    headerElements.forEach(element => {



        const originalText = element.innerText;



        



        element.addEventListener('mouseenter', () => {



            let currentText = '';



            const interval = setInterval(() => {



                currentText = element.innerText



                    .split('')



                    .map(() => {



                        return String.fromCharCode(65 + Math.floor(Math.random() * 26));



                    })



                    .join('');



                element.innerText = currentText;



            }, 50);



            



            element.dataset.interval = interval;



        });



        



        element.addEventListener('mouseleave', () => {



            clearInterval(parseInt(element.dataset.interval));



            shuffleText(element, originalText);



        });



    });



}















// Start loading when page loads







window.addEventListener('load', startLoading); 







// Add menu functionality

const menuBtn = document.querySelector('.menu-btn');

const nav = document.querySelector('.nav');

let menuOpen = false;



menuBtn.addEventListener('click', () => {

    if(!menuOpen) {

        menuBtn.classList.add('open');

        nav.classList.add('open');

        menuOpen = true;

    } else {

        menuBtn.classList.remove('open');

        nav.classList.remove('open');

        menuOpen = false;

    }

});



// Close menu when clicking a link

document.querySelectorAll('.nav-list a').forEach(link => {

    link.addEventListener('click', () => {

        menuBtn.classList.remove('open');

        nav.classList.remove('open');

        menuOpen = false;

    });

});



// Add paper ripple effect

function createRipple(e) {

    const rippleContainer = document.querySelector('.ripple-container');

    const ripple = document.createElement('div');

    const size = Math.max(window.innerWidth, window.innerHeight);

    

    ripple.className = 'ripple';

    ripple.style.width = ripple.style.height = `${size}px`;

    ripple.style.left = `${e.clientX - size/2}px`;

    ripple.style.top = `${e.clientY - size/2}px`;

    

    rippleContainer.appendChild(ripple);

    

    ripple.addEventListener('animationend', () => {

        ripple.remove();

    });

}



// Add throttled mousemove listener for ripple effect

let timeout;

document.addEventListener('mousemove', (e) => {

    if (!timeout) {

        timeout = setTimeout(() => {

            createRipple(e);

            timeout = null;

        }, 50); // Adjust this value to control ripple frequency

    }

});



// Add this Matrix rain animation code
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Characters to use in the animation
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        // Semi-transparent black background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Green text
        ctx.fillStyle = '#64ffda';
        ctx.font = fontSize + 'px monospace';

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // x = i * fontSize, y = value of drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Randomly reset the drop back to top
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment y coordinate
            drops[i]++;
        }
    }

    // Animation loop
    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    animate();
}

// Add this to your window load event listener
window.addEventListener('load', () => {
    startLoading();
    initMatrixRain();
    initTypewriter();
});

// Add this to your existing JavaScript
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.progress');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 20);
}

// Enhanced pointer effects
function initPointerEffects() {
    const circle = document.querySelector('.pointer-circle');
    const dot = document.querySelector('.pointer-dot');
    
    document.addEventListener('mousemove', (e) => {
        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';
        
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        circle.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        circle.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Section loading animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize everything
window.addEventListener('load', () => {
    initPreloader();
    initPointerEffects();
    initSectionAnimations();
    initMatrixRain();
    initTypewriter();
});

// Add hover states for interactive elements
document.querySelectorAll('a, button, .tech-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        document.querySelector('.pointer-circle').style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        document.querySelector('.pointer-circle').style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Add this function for text scramble effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#_____';
        this.originalText = el.innerText;
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble effect
function initTextScramble() {
    const nameElement = document.querySelector('.hero h1');
    const scrambler = new TextScramble(nameElement);
    let isScrambling = false;

    // Hover effect
    nameElement.addEventListener('mouseenter', () => {
        if (!isScrambling) {
            isScrambling = true;
            scrambler.setText('OLUWATOSIN ALLI').then(() => {
                isScrambling = false;
            });
        }
    });

    nameElement.addEventListener('mouseleave', () => {
        if (!isScrambling) {
            isScrambling = true;
            scrambler.setText(scrambler.originalText).then(() => {
                isScrambling = false;
            });
        }
    });

    // Scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const heroSection = document.querySelector('.hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (!isScrambling) {
            if (st > lastScrollTop && st < heroBottom) {
                // Scrolling down
                isScrambling = true;
                scrambler.setText('01001010101').then(() => {
                    isScrambling = false;
                });
            } else if (st < lastScrollTop && st < heroBottom) {
                // Scrolling up
                isScrambling = true;
                scrambler.setText(scrambler.originalText).then(() => {
                    isScrambling = false;
                });
            }
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}

// Add this to your window load event
window.addEventListener('load', () => {
    // ... existing load event code ...
    initTextScramble();
});





