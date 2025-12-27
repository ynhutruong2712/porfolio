// Intersection Observer for smooth scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".fade-up, .experience-item, .research-item").forEach(el => {
  observer.observe(el);
});

// Lazy load images with intersection observer
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      img.style.opacity = '1';
      imageObserver.unobserve(img);
    }
  });
}, {
  rootMargin: '50px'
});

// Observe all lazy loaded images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  imageObserver.observe(img);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const navHeight = document.querySelector('.main-nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Update active nav link on scroll
let sections = document.querySelectorAll('.section');
let navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  const navHeight = document.querySelector('.main-nav').offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Follow and Message button handlers
document.querySelector('.btn-follow')?.addEventListener('click', function(e) {
  e.preventDefault();
  // Add your follow logic here
  console.log('Follow clicked');
});

document.querySelector('.btn-message')?.addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = 'mailto:ynhutruong2712@gmail.com';
});

// Initialize EmailJS
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const btnText = contactForm.querySelector('.btn-text');
    const btnLoading = contactForm.querySelector('.btn-loading');
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      to_email: 'ynhutruong2712@gmail.com'
    };
    
    try {
      // Send email using EmailJS
      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS credentials
      const response = await emailjs.send(
        'YOUR_SERVICE_ID',  // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: formData.to_email
        }
      );
      
      // Success
      formMessage.textContent = 'Thank you! Your message has been sent successfully.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      contactForm.reset();
      
    } catch (error) {
      // Error
      console.error('EmailJS Error:', error);
      formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly at ynhutruong2712@gmail.com';
      formMessage.className = 'form-message error';
      formMessage.style.display = 'block';
    } finally {
      // Reset button state
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
