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
    const nameElement = document.querySelector('.hero-title');
    if (!nameElement) return; // Exit if element not found
    
    const scrambler = new TextScramble(nameElement);
    let isScrambling = false;

    // Only add hover effect if not on mobile
    if (window.innerWidth > 768) {
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
    }
}

// Add this to your window load event
window.addEventListener('load', () => {
    // ... existing load event code ...
    initTextScramble();
});

// Add this function to create animated tooltips
function createAnimatedTooltips() {
    const techItems = document.querySelectorAll('.tech-item');
    
    const techStack = {
        'React.js': { designation: 'Frontend Framework', experience: '3+ years' },
        'Vue.js': { designation: 'Frontend Framework', experience: '2+ years' },
        'Angular': { designation: 'Frontend Framework', experience: '2+ years' },
        'TypeScript': { designation: 'Programming Language', experience: '3+ years' },
        'Next.js': { designation: 'React Framework', experience: '2+ years' },
        'Node.js': { designation: 'Backend Runtime', experience: '4+ years' },
        'Python': { designation: 'Programming Language', experience: '3+ years' },
        'Java': { designation: 'Programming Language', experience: '3+ years' },
        'Go': { designation: 'Programming Language', experience: '2+ years' },
        'Ruby': { designation: 'Programming Language', experience: '2+ years' },
        'MongoDB': { designation: 'NoSQL Database', experience: '3+ years' },
        'PostgreSQL': { designation: 'SQL Database', experience: '4+ years' },
        'Redis': { designation: 'In-Memory Database', experience: '2+ years' },
        'MySQL': { designation: 'SQL Database', experience: '3+ years' },
        'Docker': { designation: 'Containerization', experience: '3+ years' },
        'AWS': { designation: 'Cloud Platform', experience: '3+ years' },
        'Kubernetes': { designation: 'Container Orchestration', experience: '2+ years' },
        'Jenkins': { designation: 'CI/CD Tool', experience: '2+ years' },
        'Azure': { designation: 'Cloud Platform', experience: '2+ years' },
        'Git': { designation: 'Version Control', experience: '4+ years' },
        'GraphQL': { designation: 'Query Language', experience: '2+ years' },
        'Webpack': { designation: 'Module Bundler', experience: '3+ years' },
        'Jest': { designation: 'Testing Framework', experience: '2+ years' }
    };

    techItems.forEach(item => {
        const techName = item.getAttribute('data-tooltip');
        const techInfo = techStack[techName];
        
        if (techInfo) {
            const tooltip = document.createElement('div');
            tooltip.className = 'animated-tooltip';
            tooltip.innerHTML = `
                <span class="tooltip-name">${techName}</span>
                <span class="tooltip-designation">${techInfo.designation}</span>
                <span class="tooltip-experience">${techInfo.experience}</span>
            `;
            
            item.appendChild(tooltip);
        }
    });
}

// Add this to your window load event
window.addEventListener('load', () => {
    // ... existing load event code ...
    createAnimatedTooltips();
});

// Add the story loader functionality
const storyStates = [
    { text: "Born on January 20, 2002 in Nigeria" },
    { text: "Early passion for technology" },
    { text: "Co-founded coding club at Spring of Life Secondary School" },
    { text: "Graduated from Spring of Life Secondary School in 2020" },
    { text: "Joined Babcock University" },
    { text: "Member of GDSC Backend Systems" },
    { text: "AI and Data Science enthusiast" },
    { text: "Marketing Manager at UN Women, Abuja" },
    { text: "IT Manager internship at UN Women" },
    { text: "Co-founded ALiAS Hedge Fund" },
    { text: "Graduated from Babcock University 2024" }
];

function initStoryLoader() {
    const loaderBtn = document.querySelector('.load-story-btn');
    const loader = document.querySelector('.story-loader');
    const loaderText = document.querySelector('.loader-text');
    const progressBar = document.querySelector('.progress-bar');
    const storyContent = document.querySelector('.story-content');
    let currentState = 0;
    
    function showLoader() {
        loader.style.display = 'flex';
        currentState = 0;
        loadNextState();
    }
    
    function loadNextState() {
        if (currentState >= storyStates.length) {
            setTimeout(() => {
                loader.style.display = 'none';
                showStoryContent();
            }, 1000);
            return;
        }
        
        loaderText.textContent = storyStates[currentState].text;
        const progress = ((currentState + 1) / storyStates.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        currentState++;
        setTimeout(loadNextState, 2000);
    }
    
    function showStoryContent() {
        storyContent.innerHTML = `
            <div class="story-timeline">
                ${storyStates.map(state => `
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <p>${state.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        storyContent.classList.remove('hidden');
        setTimeout(() => {
            storyContent.classList.add('visible');
        }, 100);
    }
    
    loaderBtn.addEventListener('click', showLoader);
}

// Add to window load event
window.addEventListener('load', () => {
    // ... existing load event code ...
    if (document.querySelector('.story-loader')) {
        initStoryLoader();
    }
});

// Add this function for 3D tilt effect
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Add to window load event
window.addEventListener('load', () => {
    // ... existing load event code ...
    initTiltEffect();
});

// Add this to handle mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            mobileMenu.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            menuOpen = false;
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-menu .nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
            menuOpen = false;
        });
    });
}

// Add to window load event
window.addEventListener('load', () => {
    // ... existing load event code ...
    initMobileMenu();
});

// Add this function for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    document.querySelectorAll('.scroll-fade-up, .scroll-fade-right, .scroll-scale').forEach(el => {
        observer.observe(el);
    });
}

// Add to window load event
window.addEventListener('load', () => {
    // ... existing load event code ...
    initScrollAnimations();
});






