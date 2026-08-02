// Matele Foundation — shared site behavior
// Mobile nav toggle, scroll-reveal animation, and contact form validation.

(function () {
  "use strict";

  /* Mobile navigation toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll reveal (respects prefers-reduced-motion via CSS) */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* Contact form validation (client-side only — no backend wired up yet) */
  var form = document.getElementById("contact-form");

  if (form) {
    var statusBox = document.getElementById("form-status");

    var validators = {
      name: function (v) {
        return v.trim().length >= 2 ? "" : "Please enter your full name.";
      },
      email: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
          ? ""
          : "Please enter a valid email address.";
      },
      message: function (v) {
        return v.trim().length >= 10
          ? ""
          : "Please enter a message of at least 10 characters.";
      }
    };

    function showError(field, message) {
      var wrapper = field.closest(".field");
      if (!wrapper) return;
      var errorEl = wrapper.querySelector(".field-error");
      if (message) {
        wrapper.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        wrapper.classList.remove("has-error");
        if (errorEl) errorEl.textContent = "";
      }
    }

    function validateField(field) {
      var validator = validators[field.name];
      if (!validator) return true;
      var message = validator(field.value);
      showError(field, message);
      return !message;
    }

    Object.keys(validators).forEach(function (name) {
      var field = form.elements[name];
      if (field) {
        field.addEventListener("blur", function () {
          validateField(field);
        });
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var isValid = true;
      Object.keys(validators).forEach(function (name) {
        var field = form.elements[name];
        if (field && !validateField(field)) {
          isValid = false;
        }
      });

      if (!statusBox) return;

      if (!isValid) {
        statusBox.textContent = "Please fix the highlighted fields and try again.";
        statusBox.className = "form-status visible error";
        return;
      }

      // No backend is connected yet — see README for how to wire this up
      // (e.g. Formspree, Netlify Forms, or a custom endpoint).
      statusBox.textContent =
        "Thank you! Your message has been prepared. (Connect a form backend — see README — to actually deliver it.)";
      statusBox.className = "form-status visible success";
      form.reset();
    });
  }
})();
