// ========================================
// FORTUNETS — JAVASCRIPT
// ========================================

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link.

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
    });
});

// AUTOMATIC COPYRIGHT YEAR

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

// PRESELECT SERVICE FROM SERVICE CARDS

const serviceLinks = document.querySelectorAll("[data-service]");
const serviceSelect = document.getElementById("service");

serviceLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const selectedService = link.dataset.service;

        const matchingOption = Array.from(serviceSelect.options).find(
            (option) => option.textContent.trim() === selectedService
        );

        if (matchingOption) {
            serviceSelect.value = matchingOption.value;
        }
    });
});

// CONTACT FORM

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Replace this with your actual business email address.
const businessEmail = "nikharesanskar@gmail.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = serviceSelect.value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !service || !message) {
        formStatus.textContent = "Please complete all the fields.";
        return;
    }

    const subject = `Fortunets Project Inquiry - ${service}`;

    const body = [
        "Hello Fortunets,",
        "",
        "I would like to discuss a project.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service}`,
        "",
        "Project Details:",
        message
    ].join("\n");

    const mailtoLink =
        `mailto:${businessEmail}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    formStatus.textContent =
        "Opening your email app. Please send the email to submit your inquiry.";

    window.location.href = mailtoLink;
});
