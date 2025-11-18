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
    var path = window.location.pathname.split("/").pop() || "/";

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
    if (!binCountEl) return; // EXIT if pricing builder isn't on this page

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

        if (frequency === "twice") {
            total = Math.round(weeklyTotal * 1.5);
        }

        let cleaning = cleaningCheckbox?.checked ? 15 + (bins - 1) * 5 : 0;

        totalEl.textContent = `$${total + cleaning}/mo`;

        breakdownEl.innerHTML = `
            Base service: $${total}/mo<br>
            ${cleaning ? `Cleaning add-on: +$${cleaning}/mo<br>` : ""}
            Bins: ${bins}<br>
            Frequency: ${frequency === "weekly" ? "Weekly" : "Twice weekly"}
        `;
    }

    minus?.addEventListener("click", () => {
        if (bins > 1) {
            bins--;
            binCountEl.textContent = bins;
            calculate();
        }
    });

    plus?.addEventListener("click", () => {
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

    cleaningCheckbox?.addEventListener("change", calculate);

    calculate();
})();
document.addEventListener("DOMContentLoaded", function () {

    // --------------------------
    // LIVE HERO AUTOMATION LOGIC
    // --------------------------

    (function updateHeroStats() {

        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minutes = now.getMinutes();

        const routeChip = document.getElementById("route-chip");
        const routeTitle = document.getElementById("route-title");
        const curbText = document.getElementById("curb-time-text");
        const returnTime = document.getElementById("return-time-pill");
        const healthText = document.getElementById("route-health-text");
        const healthDot = document.getElementById("route-health-dot");
        const miniTag = document.getElementById("hero-mini-tag");

        const floatingTime = document.getElementById("floating-time");
        const floatingLabel = document.getElementById("floating-label");
        const floatingMeter = document.getElementById("floating-meter-progress");

        if (!routeChip) return; // Hero section doesn't exist on every page

        // --- SERVICE HOURS ---
        let serviceToday = true;
        let openTime;
        let closeTime;

        if (day === 0) { // Sunday
            serviceToday = false;
        } else if (day === 6) { // Saturday
            openTime = 9;
            closeTime = 14;
        } else { // Weekdays
            openTime = 7;
            closeTime = 19;
        }

        if (!serviceToday) {
            routeChip.textContent = "Closed Today";
            routeTitle.textContent = "Sunday · No Service";
            curbText.textContent = "No service today";
            returnTime.textContent = "—";
            healthText.textContent = "Next route resumes Monday";
            miniTag.textContent = "Closed";
            floatingLabel.textContent = "No service today";
            floatingTime.textContent = "—";
            floatingMeter.style.width = "0%";
            healthDot.style.background = "#888";
            return;
        }

        // --- ROUTE TITLE ---
        const daysText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        routeTitle.textContent = `${daysText[day]} Route · North Georgia`;

        // --- CURB & RETURN TIMES ---
        curbText.textContent = "Bins to curb by 6:00 PM";
        returnTime.textContent = "Bins returned 6 PM–9 PM next day";

        // --- ROUTE STATUS ---
        if (hour >= openTime && hour < closeTime) {
            routeChip.textContent = "Live Now · On Time";
            healthText.textContent = "Route in good standing";
            healthDot.style.background = "#2ecc71";
        } else {
            routeChip.textContent = "Closed · Off Hours";
            healthText.textContent = "Next window: 7 AM tomorrow";
            healthDot.style.background = "#f1c40f";
        }

        // --- MINI TAG ---
        miniTag.textContent = "Trash Day • Updated";

        // --- FLOATING BADGE TIME ---
        // --- FLOATING BADGE TIME (12-hour format) ---
let displayHour = hour % 12 || 12; // converts 0 → 12, 13 → 1, etc.
let ampm = hour >= 12 ? "PM" : "AM";

floatingTime.textContent =
    `${displayHour}:${String(minutes).padStart(2, "0")} ${ampm}`;
        floatingLabel.textContent =
            hour >= openTime && hour < closeTime
                ? "Service Window Active"
                : "Off Hours";

        // Percentage of service hours passed
        let pct = 0;
        if (hour >= openTime && hour < closeTime) {
            pct = ((hour + minutes / 60) - openTime) / (closeTime - openTime) * 100;
        }
        floatingMeter.style.width = pct + "%";

    })();

});
