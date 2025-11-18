// Year in footer
(function() {
    var yearEl = document.getElementById("footer-year");
    if (yearEl) {
        var now = new Date();
        yearEl.textContent = now.getFullYear();
    }
})();

// Background change on scroll
(function() {
    var body = document.body;
    var lastScrollY = window.scrollY || window.pageYOffset || 0;
    var ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY || window.pageYOffset || 0;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function update() {
        if (lastScrollY > 10) {
            body.classList.add("scrolled");
        } else {
            body.classList.remove("scrolled");
        }
        ticking = false;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
})();

// Smooth scroll for [data-scroll-target]
(function() {
    var buttons = document.querySelectorAll("[data-scroll-target]");

    function getOffsetTop(el) {
        var rect = el.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return rect.top + scrollTop - 80;
    }

    function smoothScrollTo(targetY) {
        window.scrollTo({
            top: targetY,
            behavior: "smooth"
        });
    }

    function handleClick(event) {
        var button = event.currentTarget;
        var selector = button.getAttribute("data-scroll-target");
        if (!selector) return;
        var target = document.querySelector(selector);
        if (!target) return;
        event.preventDefault();
        var offsetTop = getOffsetTop(target);
        smoothScrollTo(offsetTop);
    }

    buttons.forEach(function(button) {
        button.addEventListener("click", handleClick);
    });
})();

// Mobile menu
(function() {
    var menuButton = document.querySelector(".nav-menu-toggle");
    var mobileNav = document.querySelector(".nav-links-mobile");
    if (!menuButton || !mobileNav) return;

    function toggleMenu() {
        menuButton.classList.toggle("active");
        mobileNav.classList.toggle("open");
    }

    menuButton.addEventListener("click", toggleMenu);
    mobileNav.addEventListener("click", function(event) {
        if (event.target.tagName.toLowerCase() === "a") {
            toggleMenu();
        }
    });
})();

// Nav active state by current page
(function() {
    var navLinks = document.querySelectorAll(".nav-links a");
    var path = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(function(link) {
        var href = link.getAttribute("href");
        if (href === path) {
            link.classList.add("nav-link-active");
        } else {
            link.classList.remove("nav-link-active");
        }
    });
})();

// FAQ accordion
(function() {
    var faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;

    function toggleItem(item) {
        var isOpen = item.classList.contains("open");
        faqItems.forEach(function(other) {
            if (other !== item) {
                other.classList.remove("open");
            }
        });
        if (!isOpen) {
            item.classList.add("open");
        } else {
            item.classList.remove("open");
        }
    }

    faqItems.forEach(function(item) {
        item.addEventListener("click", function() {
            toggleItem(item);
        });
    });
})();

// Pricing toggle
(function() {
    var toggleButtons = document.querySelectorAll(".pricing-toggle-button");
    if (!toggleButtons.length) return;

    var weeklyAmountEl = document.querySelector("[data-price-weekly]");
    var biweeklyAmountEl = document.querySelector("[data-price-biweekly]");
    var monthlyAmountEl = document.querySelector("[data-price-monthly]");

    var weeklyBase = parseInt(weeklyAmountEl ? weeklyAmountEl.getAttribute("data-price-weekly") : "79", 10);
    var biweeklyBase = parseInt(biweeklyAmountEl ? biweeklyAmountEl.getAttribute("data-price-biweekly") : "59", 10);
    var monthlyBase = parseInt(monthlyAmountEl ? monthlyAmountEl.getAttribute("data-price-monthly") : "39", 10);

    function setMode(mode) {
        toggleButtons.forEach(function(button) {
            var buttonMode = button.getAttribute("data-plan-mode");
            if (buttonMode === mode) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        if (!weeklyAmountEl || !biweeklyAmountEl || !monthlyAmountEl) return;

        if (mode === "vacation") {
            weeklyAmountEl.textContent = String(weeklyBase + 15);
            biweeklyAmountEl.textContent = String(biweeklyBase + 10);
            monthlyAmountEl.textContent = String(monthlyBase + 5);
        } else {
            weeklyAmountEl.textContent = String(weeklyBase);
            biweeklyAmountEl.textContent = String(biweeklyBase);
            monthlyAmountEl.textContent = String(monthlyBase);
        }
    }

    toggleButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var mode = button.getAttribute("data-plan-mode") || "standard";
            setMode(mode);
        });
    });

    setMode("standard");
})();

// Quick quote form
(function() {
    var quickForm = document.getElementById("quick-quote-form");
    if (!quickForm) return;

    quickForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var street = quickForm.street.value;
        var frequency = quickForm.frequency.value;
        var message = "Thanks! We’ll send a quote for " + frequency + " service at " + street + " soon.";
        alert(message);
    });
})();

// Contact form
(function() {
    var contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var name = contactForm.name.value || "there";
        var frequency = contactForm.frequency.value;
        var msg = "Thanks " + name + "! We have your " + frequency + " request and will follow up shortly.";
        alert(msg);
        contactForm.reset();
    });
})();

(function() {
    const binCountEl = document.getElementById("binCount");
    const minus = document.getElementById("binMinus");
    const plus = document.getElementById("binPlus");
    const freqBtns = document.querySelectorAll(".freq-btn");
    const cleaningCheckbox = document.getElementById("addCleaning");
    const totalEl = document.getElementById("builderTotal");
    const breakdownEl = document.getElementById("builderBreakdown");

    let bins = 1;
    let frequency = "weekly";

    function calculate() {
        let base = 25;
        let addBin = 5;

        let weeklyTotal = base + (bins - 1) * addBin;

        let total = weeklyTotal;

        // Twice weekly logic (1.5x, rounded)
        if (frequency === "twice") {
            total = Math.round(weeklyTotal * 1.5);
        }

        // Cleaning add-on
        let cleaning = 0;
        if (cleaningCheckbox.checked) {
            cleaning = 15 + (bins - 1) * 5;
        }

        let finalPrice = total + cleaning;

        // Update UI
        totalEl.textContent = `$${finalPrice}/mo`;

        breakdownEl.innerHTML = `
            Base service: $${total}/mo<br>
            ${cleaningCheckbox.checked ? `Cleaning add-on: +$${cleaning}/mo<br>` : ""}
            Bins: ${bins}<br>
            Frequency: ${frequency === "weekly" ? "Weekly" : "Twice weekly"}
        `;
    }

    minus.addEventListener("click", () => {
        if (bins > 1) {
            bins--;
            binCountEl.textContent = bins;
            calculate();
        }
    });

    plus.addEventListener("click", () => {
        bins++;
        binCountEl.textContent = bins;
        calculate();
    });

    freqBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            freqBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            frequency = btn.dataset.frequency;
            calculate();
        });
    });

    cleaningCheckbox.addEventListener("change", calculate);

    calculate();
})();

