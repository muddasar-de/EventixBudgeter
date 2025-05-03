// Mobile menu toggle functionality
const hamburgerIcon = document.getElementById('hamburger');
const navigationMenu = document.getElementById('nav');

// Listen for a click on the hamburger menu icon to toggle the navigation menu
hamburgerIcon.addEventListener('click', () => {
    navigationMenu.classList.toggle('active'); // Toggle 'active' class for showing/hiding menu
});

// Smooth scrolling for anchor links within the page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        
        const targetId = this.getAttribute('href'); // Get the target section ID
        if (targetId === '#') return; // Ignore if anchor is for the top of the page
        
        const targetElement = document.querySelector(targetId); // Find the target element
        if (targetElement) {
            // Smooth scroll to the target element
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjusting for header height
                behavior: 'smooth' // Smooth scroll effect
            });
            
            // Close the mobile menu if it is open
            navigationMenu.classList.remove('active');
        }
    });
});

// Scroll animation for elements that appear on screen
const scrollableElements = document.querySelectorAll('.animate-on-scroll');

// Create an observer to detect when elements are in view
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add 'visible' class to trigger animation
            scrollObserver.unobserve(entry.target); // Stop observing the element once it's in view
        }
    });
}, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible

// Observe each scrollable element
scrollableElements.forEach(element => {
    scrollObserver.observe(element);
});

// Budget Calculator functionality
const budgetCalculatorForm = document.getElementById('budget-calculator');
const resultContainer = document.getElementById('result');
const resultAmount = document.getElementById('result-value');

// Define base prices for different event types
const eventPrices = {
    wedding: 5000,
    corporate: 3000,
    birthday: 1500,
    social: 2000,
    other: 2500
};

// Define multipliers for different venue types
const venueMultipliers = {
    indoor: 1.0,
    outdoor: 1.2,
    luxury: 1.8,
    destination: 2.5
};

// Define catering costs per person
const cateringOptions = {
    basic: 15,
    standard: 30,
    premium: 60,
    luxury: 120
};

// Define entertainment costs
const entertainmentOptions = {
    none: 0,
    dj: 800,
    band: 2000,
    performers: 3000
};

// Handle form submission for calculating budget
budgetCalculatorForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    
    // Retrieve form values
    const eventType = document.getElementById('event-type').value;
    const guestCount = parseInt(document.getElementById('guests').value);
    const eventDuration = parseInt(document.getElementById('duration').value);
    const venueType = document.getElementById('venue-type').value;
    const cateringChoice = document.getElementById('catering').value;
    const entertainmentChoice = document.getElementById('entertainment').value;
    
    // Calculate base cost based on event type
    let baseCost = eventPrices[eventType] || 2000;
    
    // Apply venue multiplier
    baseCost *= venueMultipliers[venueType] || 1.0;
    
    // Add catering cost
    const cateringCost = (cateringOptions[cateringChoice] || 0) * guestCount;
    
    // Add entertainment cost
    const entertainmentCost = entertainmentOptions[entertainmentChoice] || 0;
    
    // Factor in event duration (longer events cost more)
    const durationMultiplier = 1 + (eventDuration - 1) * 0.1;
    
    // Calculate the total cost
    const totalCost = (baseCost + cateringCost + entertainmentCost) * durationMultiplier;
    
    // Display the result
    resultAmount.textContent = '$' + Math.round(totalCost).toLocaleString();
    resultContainer.style.display = 'block';
    
    // Scroll to the result section
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Contact form handling with EmailJS integration
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('WUZjkG19ufx27eTz5'); // Initialize EmailJS with user ID
    
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Retrieve form values
        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userPhone = document.getElementById('phone').value;
        const userMessage = document.getElementById('message').value;
        
        // Send the form data to EmailJS service
        emailjs.send('service_qthbdms', 'template_e91jl68', {
            from_name: userName,
            from_email: userEmail,
            phone: userPhone,
            message: userMessage
        })
        .then(function(response) {
            console.log("response",response)
            alert('Your message was sent successfully! We will get back to you soon.');
            contactForm.reset();
        }, function(error) {
            alert('Failed to send your message. Please try again later or contact us directly.');
            console.error('EmailJS Error:', error);
        });
    });
});

