// Get the button and body elements
const toggleButton = document.querySelector(".toggle-mode");
const body = document.body;

// Function to update the icon based on the mode
function updateIcon() {
  if (body.classList.contains("dark-mode")) {
    toggleButton.classList.remove("bi-brightness-high");
    toggleButton.classList.add("bi-moon-fill");
  } else {
    toggleButton.classList.remove("bi-moon-fill");
    toggleButton.classList.add("bi-brightness-high");
  }
}

// Check if dark mode is already set in local storage
if (localStorage.getItem("dark-mode") === "true") {
  body.classList.add("dark-mode");
}

// Initial icon update
updateIcon();

// Add click event listener to toggle between modes
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Save the current mode to localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "true");
  } else {
    localStorage.setItem("dark-mode", "false");
  }

  // Update the icon after toggling the mode
  updateIcon();
});

function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => {
    observer.observe(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const testimonialSection = document.querySelector(".testimonial");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          testimonialSection.classList.add("visible");
          observer.disconnect(); // Stop observing after animation runs
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the section is visible
  );

  observer.observe(testimonialSection);
});
