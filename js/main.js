/* =========================================
   THE BIN RUNNING BROTHERS - MAIN JS
   ========================================= */

/* --- 1. GOOGLE AUTOCOMPLETE (Global Scope) --- */
window.initGoogleAutocomplete = function() {
    console.log("🗺️ Google Maps API Loaded");
    const streetInput = document.getElementById("street");
    if (!streetInput) return;

    // Safety check for window.google
    if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Maps API failed to load properly.");
        return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(streetInput, {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });

    autocomplete.addListener("place_changed", function() {
        const place = autocomplete.getPlace();
        let streetNumber = "";
        let route = "";
        let city = "";
        let zip = "";

        if (place.address_components) {
            for (const component of place.address_components) {
                const type = component.types[0];
                if (type === "street_number") streetNumber = component.long_name;
                if (type === "route") route = component.long_name;
                if (type === "locality") city = component.long_name;
                if (type === "postal_code") zip = component.long_name;
            }
        }

        // Update fields and clear validation errors
        streetInput.value = `${streetNumber} ${route}`.trim();
        streetInput.classList.remove("error");

        const cityInput = document.getElementById("city");
        if (cityInput) {
            cityInput.value = city;
            cityInput.classList.remove("error");
        }

        const zipInput = document.getElementById("zip");
        if (zipInput) {
            zipInput.value = zip;
            zipInput.classList.remove("error");
        }
    });
};

/* --- 2. DOM READY LOGIC --- */
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Main Script Loaded");

    // -- UTILITIES --
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    window.addEventListener("scroll", function() {
        if (window.scrollY > 10) document.body.classList.add("scrolled");
        else document.body.classList.remove("scrolled");
    }, { passive: true });

    // Mobile Menu
    const menuButton = document.querySelector(".nav-menu-toggle");
    const mobileNav = document.querySelector(".nav-links-mobile");
    if (menuButton && mobileNav) {
        menuButton.addEventListener("click", function() {
            menuButton.classList.toggle("active");
            mobileNav.classList.toggle("open");
        });
        mobileNav.addEventListener("click", function(event) {
            if (event.target.tagName.toLowerCase() === "a") {
                menuButton.classList.remove("active");
                mobileNav.classList.remove("open");
            }
        });
    }

    // Active Nav Highlight
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
    navLinks.forEach(function(link) {
        const href = link.getAttribute("href").replace(/\/+$/, "") || "/";
        if (href === currentPath) link.classList.add("nav-link-active");
        else link.classList.remove("nav-link-active");
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            faqItems.forEach(other => other.classList.remove("open"));
            if (!isOpen) item.classList.add("open");
        });
    });

    // Homepage Quick Quote -> Redirect
    const quickForm = document.getElementById("quick-quote-form");
    if (quickForm) {
        quickForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const frequency = quickForm.frequency.value;
            window.location.href = "/get-started/?frequency=" + frequency;
        });
    }

    // --- PRICING BUILDER LOGIC (Restored) ---
    const binCountEl = document.getElementById("binCount");
    const totalEl = document.getElementById("builderTotal");
    
    // Check if we are on the PRICING page (Get Started also has #binCount but no #builderTotal)
    if (binCountEl && totalEl && binCountEl.tagName !== "SELECT") {
        const minus = document.getElementById("binMinus");
        const plus = document.getElementById("binPlus");
        const freqBtns = document.querySelectorAll(".freq-btn");
        const cleaningCheckbox = document.getElementById("addCleaning");
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

            if (breakdownEl) {
                breakdownEl.innerHTML = `
                    Base service: $${total}/mo<br>
                    ${cleaning ? `Cleaning add-on: +$${cleaning}/mo<br>` : ""}
                    Bins: ${bins}<br>
                    Frequency: ${frequency === "weekly" ? "Weekly" : "Twice weekly"}
                `;
            }
        }

        if (minus) minus.addEventListener("click", () => { if (bins > 1) { bins--; binCountEl.textContent = bins; calculate(); } });
        if (plus) plus.addEventListener("click", () => { bins++; binCountEl.textContent = bins; calculate(); });
        
        freqBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                freqBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                frequency = btn.dataset.frequency;
                calculate();
            });
        });

        if (cleaningCheckbox) cleaningCheckbox.addEventListener("change", calculate);
        calculate(); // Initialize
    }

    /* --- GET STARTED WIZARD LOGIC --- */
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        console.log("✅ Wizard Form Detected");
        
        const steps = Array.from(document.querySelectorAll(".wizard-step"));
        const indicators = Array.from(document.querySelectorAll(".wizard-step-indicator"));
        const nextBtns = document.querySelectorAll(".next-step");
        const prevBtns = document.querySelectorAll(".prev-step");
        let currentStep = 0;

        // Auto-Format Phone Number
        const phoneInput = document.getElementById("phone");
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            });
        }

        // Pre-fill Frequency
        const urlParams = new URLSearchParams(window.location.search);
        const freqParam = urlParams.get("frequency");
        if (freqParam) {
            const freqSelect = document.getElementById("frequency");
            if (freqSelect && freqSelect.querySelector(`option[value="${freqParam}"]`)) {
                freqSelect.value = freqParam;
            }
        }

        function showStep(index) {
            if (index < 0 || index >= steps.length) return;
            steps.forEach((step, i) => step.classList.toggle("active", i === index));
            indicators.forEach((ind, i) => {
                ind.classList.toggle("active", i === index);
                if (i < index) ind.classList.add("completed");
                else ind.classList.remove("completed");
            });
            currentStep = index;
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        function validateStep(index) {
            const currentStepEl = steps[index];
            const inputs = currentStepEl.querySelectorAll("input[required], select[required], textarea[required]");
            let valid = true;
            let firstError = null;

            inputs.forEach(input => {
                const parent = input.closest(".form-group");
                const errorMsg = parent ? parent.querySelector(".error-msg") : null;
                
                if (!input.checkValidity()) {
                    valid = false;
                    input.classList.add("error");
                    if (errorMsg) errorMsg.style.display = "block";
                    if (!firstError) firstError = input;
                } else {
                    input.classList.remove("error");
                    if (errorMsg) errorMsg.style.display = "none";
                }
            });

            if (!valid) {
                currentStepEl.classList.remove("shake-animation");
                void currentStepEl.offsetWidth; // Force reflow
                currentStepEl.classList.add("shake-animation");
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
            return valid;
        }

        // Next/Prev Buttons
        nextBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (validateStep(currentStep)) showStep(currentStep + 1);
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                showStep(currentStep - 1);
            });
        });

        indicators.forEach((ind, index) => {
            ind.addEventListener("click", () => {
                if (index < currentStep) showStep(index);
            });
            ind.style.cursor = "pointer";
        });

        // Form Submit
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            if (!validateStep(currentStep)) return;

            const submitBtn = signupForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(signupForm);
            const lead = {
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                contact: {
                    firstName: formData.get("firstName"),
                    lastName: formData.get("lastName"),
                    email: formData.get("email"),
                    phone: formData.get("phone")
                },
                address: {
                    street: formData.get("street"),
                    city: formData.get("city"),
                    zip: formData.get("zip"),
                    notes: formData.get("gateCode")
                },
                service: {
                    frequency: formData.get("frequency"),
                    pickupDay: formData.get("pickupDay"),
                    binCount: formData.get("binCount"),
                    hauler: formData.get("hauler"),
                    addons: {
                        cleaning: formData.get("cleaning") === "yes",
                        recyclingReminders: formData.get("recyclingReminders") === "yes"
                    }
                }
            };

            // --- SEND DATA ---
            console.log("🚀 SENDING LEAD:", lead);

            // TODO: Uncomment for Formspree
            /*
            fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lead)
            })
            .then(res => {
                if (res.ok) handleSuccess(lead);
                else throw new Error("Formspree Error");
            })
            .catch(err => {
                alert("There was a problem sending your request. Please try again.");
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
            */

            // Simulation for Development
            setTimeout(() => {
                handleSuccess(lead);
            }, 1200);
        });

        function handleSuccess(lead) {
            const nameEl = document.getElementById("success-name");
            const phoneEl = document.getElementById("success-phone");
            
            if (nameEl) nameEl.textContent = lead.contact.firstName;
            if (phoneEl) phoneEl.textContent = lead.contact.phone;

            steps.forEach(s => s.classList.remove("active"));
            document.getElementById("step-success").classList.add("active");
            indicators.forEach(ind => ind.classList.add("completed"));
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    // --- HOMEPAGE HERO LIVE UPDATER ---
    const routeChip = document.getElementById("route-chip");
    if (routeChip) {
        function updateHero() {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            const minutes = now.getMinutes();

            const routeTitle = document.getElementById("route-title");
            const curbText = document.getElementById("curb-time-text");
            const returnTime = document.getElementById("return-time-pill");
            const healthText = document.getElementById("route-health-text");
            const healthDot = document.getElementById("route-health-dot");
            const miniTag = document.getElementById("hero-mini-tag");
            const floatingTime = document.getElementById("floating-time");
            const floatingLabel = document.getElementById("floating-label");
            const floatingMeter = document.getElementById("floating-meter-progress");

            let serviceToday = (day !== 0);
            let openTime = (day === 6) ? 9 : 7;
            let closeTime = (day === 6) ? 14 : 19;
            let isDuringHours = serviceToday && (hour >= openTime && hour < closeTime);

            const daysText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            if (routeTitle) routeTitle.textContent = `${daysText[day]} Route · North Georgia`;
            if (curbText) curbText.textContent = "Bins to curb by 6:00 PM";
            if (returnTime) returnTime.textContent = "Return 6–9 PM next day";
            if (miniTag) miniTag.textContent = "Live Status";

            if (!serviceToday) {
                routeChip.textContent = "Closed Today";
                if (healthText) healthText.textContent = "Next route: Monday";
                if (healthDot) healthDot.style.background = "#888";
                if (floatingLabel) floatingLabel.textContent = "No service today";
            } else if (isDuringHours) {
                routeChip.textContent = "Live · Active";
                if (healthText) healthText.textContent = "Route in progress";
                if (healthDot) healthDot.style.background = "#2ecc71";
                if (floatingLabel) floatingLabel.textContent = "Service Active";
            } else {
                routeChip.textContent = "Standby";
                if (healthText) healthText.textContent = `Starts at ${openTime}:00 AM`;
                if (healthDot) healthDot.style.background = "#f1c40f";
                if (floatingLabel) floatingLabel.textContent = "Off Hours";
            }

            if (floatingTime) {
                let displayHour = hour % 12 || 12;
                let ampm = hour >= 12 ? "PM" : "AM";
                floatingTime.textContent = `${displayHour}:${String(minutes).padStart(2, "0")} ${ampm}`;
            }

            if (floatingMeter) {
                let pct = 0;
                if (isDuringHours) {
                    pct = ((hour + minutes / 60) - openTime) / (closeTime - openTime) * 100;
                }
                if (floatingMeter) floatingMeter.style.width = Math.max(0, Math.min(100, pct)) + "%";
            }
        }
        updateHero();
        setInterval(updateHero, 60000);
    }
});