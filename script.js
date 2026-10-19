/**
 * ELITE FITNESS - CORE JAVASCRIPT & 24/7 AI CONCIERGE ENGINE
 * Author: Sain Bux Hadi Seelro
 * Modern, High-Performance, Accessible Fitness Experience
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initStatsCounters();
    initScheduleFilter();
    initBillingSwitcher();
    initBmiCalculator();
    initTestimonialsSlider();
    initForms();
    initBackToTop();
    initAiChatbot();
});

/* ============================================
   1. NAVBAR & NAVIGATION
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navItems.forEach(item => item.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close on link click
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   2. STAT COUNTERS WITH INTERSECTION OBSERVER
   ============================================ */
function initStatsCounters() {
    const statsContainer = document.querySelector('.hero-stats');
    if (!statsContainer) return;

    let animated = false;
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-count'));
                    const isDecimal = String(target).includes('.');
                    const duration = 1800;
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out quad
                        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                        const current = target * easeOutProgress;

                        if (isDecimal) {
                            stat.textContent = current.toFixed(1);
                        } else {
                            stat.textContent = Math.floor(current);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCount);
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
}

/* ============================================
   3. WEEKLY CLASS SCHEDULE & FILTERING
   ============================================ */
const scheduleData = [
    {
        day: 'mon',
        dayLabel: 'Monday',
        time: '07:00 AM - 08:15 AM',
        title: 'Olympic Strength & Power',
        coach: 'Marcus Johnson',
        category: 'Strength',
        spots: 3
    },
    {
        day: 'mon',
        dayLabel: 'Monday',
        time: '12:00 PM - 01:00 PM',
        title: 'Metabolic HIIT Inferno',
        coach: 'David Chen',
        category: 'Cardio',
        spots: 6
    },
    {
        day: 'mon',
        dayLabel: 'Monday',
        time: '06:30 PM - 07:30 PM',
        title: 'Vinyasa Flow & Decompress',
        coach: 'Sarah Williams',
        category: 'Mind-Body',
        spots: 8
    },
    {
        day: 'wed',
        dayLabel: 'Wednesday',
        time: '08:00 AM - 09:15 AM',
        title: 'Championship Fight Club & MMA',
        coach: 'Emma Rodriguez',
        category: 'Combat',
        spots: 4
    },
    {
        day: 'wed',
        dayLabel: 'Wednesday',
        time: '05:30 PM - 06:45 PM',
        title: 'Heavy Hypertrophy Protocols',
        coach: 'Marcus Johnson',
        category: 'Strength',
        spots: 2
    },
    {
        day: 'wed',
        dayLabel: 'Wednesday',
        time: '07:00 PM - 08:00 PM',
        title: 'Athletic Reformer Pilates',
        coach: 'Sarah Williams',
        category: 'Mind-Body',
        spots: 5
    },
    {
        day: 'fri',
        dayLabel: 'Friday',
        time: '07:00 AM - 08:00 AM',
        title: 'Cross-Functional Turf Challenge',
        coach: 'David Chen',
        category: 'Functional',
        spots: 5
    },
    {
        day: 'fri',
        dayLabel: 'Friday',
        time: '12:30 PM - 01:30 PM',
        title: 'Explosive Striking & Conditioning',
        coach: 'Emma Rodriguez',
        category: 'Combat',
        spots: 6
    },
    {
        day: 'fri',
        dayLabel: 'Friday',
        time: '06:00 PM - 07:15 PM',
        title: 'Full-Spectrum Sauna & Breathwork',
        coach: 'Sarah Williams',
        category: 'Recovery',
        spots: 9
    },
    {
        day: 'sat',
        dayLabel: 'Saturday',
        time: '09:00 AM - 10:30 AM',
        title: 'Weekend Warrior Super-Circuit',
        coach: 'David Chen & Marcus',
        category: 'Cardio & Strength',
        spots: 2
    },
    {
        day: 'sat',
        dayLabel: 'Saturday',
        time: '11:00 AM - 12:15 PM',
        title: 'Spine Alignment & Mobility',
        coach: 'Sarah Williams',
        category: 'Mind-Body',
        spots: 7
    }
];

function initScheduleFilter() {
    const grid = document.getElementById('scheduleGrid');
    const filterBtns = document.querySelectorAll('.schedule-filter-tabs .filter-btn');
    if (!grid) return;

    function renderSchedule(filter) {
        const filtered = filter === 'all' 
            ? scheduleData 
            : scheduleData.filter(item => item.day === filter);

        grid.innerHTML = filtered.map(item => `
            <div class="schedule-card fade-in-up">
                <span class="schedule-time-badge">${item.dayLabel} &bull; ${item.time}</span>
                <h4>${item.title}</h4>
                <div class="schedule-coach">
                    <i class="fas fa-user-circle"></i>
                    <span>Coach: ${item.coach}</span>
                </div>
                <div class="schedule-card-footer">
                    <span class="schedule-spots"><strong>${item.spots} spots</strong> available</span>
                    <button class="book-class-btn" data-class="${item.title}">Book Class <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        `).join('');

        // Attach booking click listener
        grid.querySelectorAll('.book-class-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const className = btn.getAttribute('data-class');
                openChatWithQuery(`I want to reserve a spot for the "${className}" class`);
            });
        });
    }

    renderSchedule('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSchedule(btn.getAttribute('data-day'));
        });
    });
}

/* ============================================
   4. BILLING SWITCHER (MONTHLY / ANNUAL -20%)
   ============================================ */
function initBillingSwitcher() {
    const toggle = document.getElementById('billingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    const amountElements = document.querySelectorAll('.pricing-card .price .amount');

    if (!toggle) return;

    toggle.addEventListener('change', () => {
        const isAnnual = toggle.checked;
        if (monthlyLabel && annualLabel) {
            monthlyLabel.classList.toggle('active', !isAnnual);
            annualLabel.classList.toggle('active', isAnnual);
        }

        amountElements.forEach(el => {
            const monthlyVal = el.getAttribute('data-monthly');
            const annualVal = el.getAttribute('data-annual');
            el.textContent = isAnnual ? annualVal : monthlyVal;
        });
    });
}

/* ============================================
   5. INTERACTIVE BMI & METRIC CALCULATOR
   ============================================ */
function initBmiCalculator() {
    const form = document.getElementById('bmiForm');
    const resultCard = document.getElementById('bmiResult');
    const scoreEl = document.getElementById('bmiScore');
    const categoryEl = document.getElementById('bmiCategory');
    const adviceEl = document.getElementById('bmiAdvice');
    const sendToChatBtn = document.getElementById('sendBmiToChatBtn');

    if (!form || !resultCard) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const height = parseFloat(document.getElementById('bmiHeight').value);
        const weight = parseFloat(document.getElementById('bmiWeight').value);
        const age = parseInt(document.getElementById('bmiAge').value);
        const goal = document.getElementById('bmiGoal').value;

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) return;

        // BMI Formula: weight (kg) / [height (m)]^2
        const heightMeters = height / 100;
        const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);
        scoreEl.textContent = bmi;

        let category = '';
        let advice = '';

        if (bmi < 18.5) {
            category = 'Underweight (Hypertrophy Recommended)';
            advice = `Focus on calorie surplus (+350-500 kcal) and progressive strength training under Coach Marcus.`;
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = 'Healthy & Optimal Weight Range';
            advice = `Prime baseline! Combine compound lifting with 2 HIIT or boxing sessions per week to build lean density.`;
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = 'Overweight (Metabolic Recomposition)';
            advice = `Target a moderate caloric deficit with high protein (2g/kg) and our HIIT + Strength split for rapid fat loss.`;
        } else {
            category = 'Obesity Zone (Guided Transformation)';
            advice = `Structured low-impact conditioning, supervised nutrition protocols, and recovery support recommended.`;
        }

        categoryEl.textContent = category;
        adviceEl.textContent = advice;
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Update Ask AI button query
        if (sendToChatBtn) {
            sendToChatBtn.onclick = () => {
                const query = `My BMI is ${bmi} (${category}), Height: ${height}cm, Weight: ${weight}kg, Age: ${age}, Goal: ${goal}. Please generate a customized workout and nutrition plan for me.`;
                openChatWithQuery(query);
            };
        }
    });
}

/* ============================================
   6. TESTIMONIALS SLIDER
   ============================================ */
function initTestimonialsSlider() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    const cards = document.querySelectorAll('.testimonial-card');

    if (!track || cards.length === 0) return;

    let currentSlide = 0;
    const totalSlides = cards.length;

    // Create pagination dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }

    function goToSlide(idx) {
        currentSlide = idx;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    let autoTimer = setInterval(nextSlide, 6000);
    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, 6000);
    }

    // Touch swipe support
    let startX = 0;
    track.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) nextSlide();
            else prevSlide();
            resetTimer();
        }
    }, { passive: true });
}

/* ============================================
   7. CONTACT & NEWSLETTER FORMS
   ============================================ */
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHtml = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SUBMITTING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> RESERVATION RECEIVED!';
                submitBtn.style.background = '#10B981';

                const name = document.getElementById('name').value;
                contactForm.reset();

                // Congratulate in AI Concierge if user desires
                setTimeout(() => {
                    submitBtn.innerHTML = originalHtml;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3500);
            }, 1200);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            const orig = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#10B981';
            input.value = '';

            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.background = '';
            }, 2500);
        });
    }
}

/* ============================================
   8. BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 450) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================
   9. 24/7 LIVE AI GYM ASSISTANT CHATBOT ENGINE
   ============================================ */
function initAiChatbot() {
    const chatbotWrapper = document.getElementById('gymChatbot');
    const toggleBtn = document.getElementById('chatbotToggleBtn');
    const closePromoBtn = document.getElementById('closePromoTooltip');
    const promoTooltip = document.getElementById('chatPromoTooltip');
    const minimizeBtn = document.getElementById('chatMinimizeBtn');
    const clearBtn = document.getElementById('chatClearBtn');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const quickChips = document.getElementById('chatQuickChips');
    const openChatHeroBtn = document.getElementById('openChatHeroBtn');

    if (!chatbotWrapper || !toggleBtn) return;

    // Toggle Chat Window
    function toggleChat() {
        const isActive = chatbotWrapper.classList.toggle('active');
        if (promoTooltip) promoTooltip.classList.add('hidden');
        if (isActive && chatInput) {
            setTimeout(() => chatInput.focus(), 300);
        }
    }

    toggleBtn.addEventListener('click', toggleChat);

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            chatbotWrapper.classList.remove('active');
        });
    }

    if (closePromoBtn && promoTooltip) {
        closePromoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            promoTooltip.classList.add('hidden');
        });
    }

    // Hero button trigger
    if (openChatHeroBtn) {
        openChatHeroBtn.addEventListener('click', () => {
            if (!chatbotWrapper.classList.contains('active')) {
                chatbotWrapper.classList.add('active');
            }
            if (promoTooltip) promoTooltip.classList.add('hidden');
            setTimeout(() => {
                chatInput.focus();
                chatInput.placeholder = "Ask anything (e.g. membership, plans, trainers)...";
            }, 300);
        });
    }

    // Show promo tooltip after 4 seconds if not already opened
    setTimeout(() => {
        if (!chatbotWrapper.classList.contains('active') && promoTooltip) {
            promoTooltip.classList.remove('hidden');
        }
    }, 4000);

    // Clear Chat
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            chatMessages.innerHTML = `
                <div class="chat-msg bot-msg">
                    <div class="msg-avatar"><i class="fas fa-robot"></i></div>
                    <div class="msg-bubble">
                        <p>Chat history cleared! How can I assist you with ELITE FITNESS right now?</p>
                    </div>
                    <span class="msg-time">Just now</span>
                </div>
            `;
            localStorage.removeItem('elite_gym_chat_history');
        });
    }

    // Quick chips click
    if (quickChips) {
        quickChips.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                handleUserQuery(query);
            });
        });
    }

    // Form submission
    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;
            handleUserQuery(text);
            chatInput.value = '';
        });
    }

    // Handle user query & AI response
    function handleUserQuery(userText) {
        appendMessage('user', userText);

        // Show typing indicator
        const typingEl = document.createElement('div');
        typingEl.classList.add('chat-msg', 'bot-msg', 'typing-msg');
        typingEl.innerHTML = `
            <div class="msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="msg-bubble">
                <div class="typing-dots">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Dynamic intelligence response delay (400 - 800ms)
        const delay = Math.floor(Math.random() * 400) + 400;

        setTimeout(() => {
            if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
            const responseHtml = generateAiResponse(userText);
            appendMessage('bot', responseHtml);
        }, delay);
    }

    function appendMessage(sender, htmlContent) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', `${sender}-msg`);

        if (sender === 'bot') {
            msgDiv.innerHTML = `
                <div class="msg-avatar"><i class="fas fa-robot"></i></div>
                <div class="msg-bubble">${htmlContent}</div>
                <span class="msg-time">${timeStr}</span>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="msg-bubble"><p>${escapeHtml(htmlContent)}</p></div>
                <span class="msg-time">${timeStr}</span>
            `;
        }

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Global helper to open chat and ask a specific prompt
window.openChatWithQuery = function(query) {
    const chatbotWrapper = document.getElementById('gymChatbot');
    const chatInput = document.getElementById('chatInput');
    const promoTooltip = document.getElementById('chatPromoTooltip');

    if (chatbotWrapper) {
        chatbotWrapper.classList.add('active');
        if (promoTooltip) promoTooltip.classList.add('hidden');
    }
    if (chatInput) {
        chatInput.value = query;
        const chatForm = document.getElementById('chatForm');
        if (chatForm) {
            chatForm.dispatchEvent(new Event('submit'));
        }
    }
};

/* ============================================
   10. KNOWLEDGE BASE & NATURAL LANGUAGE AGENT
   ============================================ */
function generateAiResponse(rawQuery) {
    const q = rawQuery.toLowerCase();

    // 1. Gym Hours & Timings
    if (q.includes('hour') || q.includes('time') || q.includes('timing') || q.includes('open') || q.includes('close') || q.includes('schedule') && q.includes('gym')) {
        return `
            <p>🕒 <strong>ELITE FITNESS Operating Hours:</strong></p>
            <p>&bull; <strong>Mon - Fri:</strong> 5:00 AM - 11:00 PM<br>
               &bull; <strong>Sat - Sun:</strong> 7:00 AM - 9:00 PM<br>
               &bull; <strong>VIP Members:</strong> 24/7/365 Biometric Keyless Access</p>
            <p>Our 24/7 AI Concierge and facility security are online continuously!</p>
        `;
    }

    // 2. Address & Location
    if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('kahan') || q.includes('direction')) {
        return `
            <p>📍 <strong>Our Location:</strong></p>
            <p>123 Fitness Boulevard, Downtown Financial District, New York, NY 10001.</p>
            <p>Valet parking is included for all Standard and Elite VIP members, and we are just 2 blocks from the Central Subway station.</p>
        `;
    }

    // 3. Pricing & Membership Plans
    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('fee') || q.includes('fees') || q.includes('membership') || q.includes('plan') || q.includes('kitna') || q.includes('kitne')) {
        return `
            <p>💳 <strong>ELITE FITNESS Membership Tiers:</strong></p>
            <p>&bull; <strong>Basic ($49/mo | $39/mo annual):</strong> Full gym floor access, Technogym cardio & machines, locker rooms, 2 group classes/mo, and 24/7 AI concierge.<br>
            &bull; <strong>Standard ($89/mo | $69/mo annual):</strong> Full 24/7 access, unlimited group classes (HIIT, Yoga, Boxing), 2 personal training sessions/mo, quarterly InBody scan, and custom nutrition blueprint.<br>
            &bull; <strong>Elite VIP ($149/mo | $119/mo annual):</strong> All-inclusive VIP access, 8 private 1-on-1 PT sessions/mo, unlimited infrared sauna & cold plunge therapy, assigned private locker, and guest passes.</p>
            <p>👉 <em>You can join directly in the Pricing section or claim a 1-day free pass right now!</em></p>
        `;
    }

    // 4. Free Pass / Trial
    if (q.includes('free pass') || q.includes('trial') || q.includes('free') || q.includes('guest pass') || q.includes('tour')) {
        return `
            <p>🎁 <strong>Claim Your Complimentary 1-Day VIP Pass!</strong></p>
            <p>We'd love to welcome you. Your pass includes full access to the 25,000 sq ft floor, recovery saunas, and a complimentary 15-minute body composition assessment.</p>
            <p>Simply drop your <strong>Full Name and Phone Number</strong> right here in the chat, or head down to our <a href="#contact" style="color:var(--gold);text-decoration:underline;">Contact Section</a> to register!</p>
        `;
    }

    // 5. Trainers
    if (q.includes('trainer') || q.includes('coach') || q.includes('marcus') || q.includes('sarah') || q.includes('david') || q.includes('emma') || q.includes('pt')) {
        return `
            <p>🏋️‍♂️ <strong>Meet Our World-Class Master Faculty:</strong></p>
            <p>&bull; <strong>Marcus Johnson:</strong> Head Strength & Powerlifting (15+ yrs, NSCA-CSCS Certified).<br>
            &bull; <strong>Sarah Williams:</strong> Yoga, Reformer Pilates & Recovery Lead (E-RYT 500).<br>
            &bull; <strong>David Chen:</strong> HIIT & Metabolic Conditioning specialist.<br>
            &bull; <strong>Emma Rodriguez:</strong> Boxing & Combat Arts (Golden Gloves Champion).</p>
            <p>Every coach builds customized protocols backed by biometric science.</p>
        `;
    }

    // 6. Gym Specs & Equipment
    if (q.includes('spec') || q.includes('specs') || q.includes('equipment') || q.includes('facility') || q.includes('sq ft') || q.includes('hardware')) {
        return `
            <p>📐 <strong>Elite Gym Technical Specifications:</strong></p>
            <p>&bull; <strong>Area:</strong> 25,000 sq ft multi-level facility with 18 ft acoustic ceilings.<br>
            &bull; <strong>Filtration:</strong> Medical-grade HEPA-13 HVAC air replacement every 12 mins.<br>
            &bull; <strong>Hardware:</strong> Technogym Artis Pure Strength + Eleiko IWF Certified Olympic Free Weights.<br>
            &bull; <strong>Recovery:</strong> Clearlight Full-Spectrum Infrared Saunas & Twin Cold Plunge Tubs (42°F).<br>
            &bull; <strong>Diagnostics:</strong> InBody 770 Multi-Frequency Body Composition Scanners.</p>
        `;
    }

    // 7. BMI & Weight Loss Advice
    if (q.includes('bmi') || q.includes('weight') || q.includes('fat loss') || q.includes('muscle') || q.includes('diet') || q.includes('calorie') || q.includes('protein')) {
        return `
            <p>⚖️ <strong>Body Composition & Nutrition Guidance:</strong></p>
            <p>For sustainable body recomposition, we recommend:</p>
            <p>&bull; <strong>Protein:</strong> 1.6g to 2.2g of protein per kg of target bodyweight.<br>
            &bull; <strong>Fat Loss:</strong> Maintain a 300-500 kcal deficit paired with heavy compound resistance training (preserves muscle while burning fat).<br>
            &bull; <strong>Hypertrophy:</strong> 10-18 weekly direct sets per muscle group with progressive overload.</p>
            <p>💡 <em>Tip: You can calculate your exact metrics instantly on our interactive <a href="#bmi" style="color:var(--gold);text-decoration:underline;">BMI Calculator</a> section!</em></p>
        `;
    }

    // 8. Contact & Phone
    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('call') || q.includes('number')) {
        return `
            <p>📞 <strong>Direct Contact Channels:</strong></p>
            <p>&bull; <strong>Phone:</strong> +1 (555) 123-4567<br>
            &bull; <strong>Email:</strong> concierge@elitefitness.com<br>
            &bull; <strong>Desk:</strong> 123 Fitness Blvd, New York, NY 10001</p>
            <p>Our team responds to all formal consultations within 24 hours.</p>
        `;
    }

    // 9. Urdu / Roman Urdu greetings and common phrases
    if (q.includes('kya haal') || q.includes('kaise') || q.includes('salam') || q.includes('shukriya') || q.includes('theek')) {
        return `
            <p>Walaikum Assalam! Main ELITE FITNESS ka 24/7 AI Concierge hoon. Main theek hoon, aap bataen?</p>
            <p>Gym ki timings, fees packages, trainers, ya free 1-day pass ke baray main koi sawal hai to puchen!</p>
        `;
    }

    // 10. Greetings (Hi, Hello, Hey)
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('hola') || q === 'yo') {
        return `
            <p>Hello! Welcome to <strong>ELITE FITNESS</strong>. I'm here 24/7 to assist you.</p>
            <p>You can ask me about our <strong>Membership Pricing</strong>, <strong>Facility Specs</strong>, <strong>Master Trainers</strong>, or how to book a <strong>Free 1-Day VIP Pass</strong>!</p>
        `;
    }

    // Default Fallback
    return `
        <p>I understand! As ELITE FITNESS's 24/7 AI Concierge, I can assist you with:</p>
        <p>&bull; <strong>Membership Tiers & Pricing</strong> ($49 - $149/mo)<br>
        &bull; <strong>Gym Timings & Location</strong> (NYC Downtown, 24/7 VIP access)<br>
        &bull; <strong>Coaches & Training Disciplines</strong> (Strength, HIIT, Boxing, Yoga)<br>
        &bull; <strong>Facility Specifications</strong> (25k sq ft, Eleiko, Saunas, Cryo)<br>
        &bull; <strong>1-Day Free VIP Pass</strong></p>
        <p>Feel free to click any suggestion chip above or ask me a specific question!</p>
    `;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
