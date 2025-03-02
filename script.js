document.addEventListener('DOMContentLoaded', function() {
  // Welcome Modal
  const welcomeModal = document.getElementById('welcome-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const modalBtn = document.querySelector('.modal-btn');
  const newsletterBtn = document.querySelector('.newsletter-btn');
  
  // Show welcome modal on page load
  setTimeout(() => {
    welcomeModal.classList.add('show');
  }, 1000);
  
  // Close modal when clicking the close button or the modal button
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal') || this.closest('.passion-modal');
      modal.classList.remove('show');
    });
  });
  
  if (modalBtn) {
    modalBtn.addEventListener('click', function() {
      welcomeModal.classList.remove('show');
    });
  }
  
  // Newsletter subscription
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function() {
      const emailInput = this.previousElementSibling;
      if (emailInput.value && emailInput.checkValidity()) {
        alert('Thank you for subscribing to my newsletter!');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
  
  // Hero Slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  
  function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }
  
  // Initialize first slide
  showSlide(0);
  
  // Auto-rotate slides
  setInterval(nextSlide, 5000);
  
  // Scroll animation for header
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Fade-in animation for elements
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // Passion Modals
  const passionItems = document.querySelectorAll('.passion-item');
  
  passionItems.forEach(item => {
    item.addEventListener('click', function() {
      const passionType = this.getAttribute('data-passion');
      const modal = document.getElementById(`${passionType}-modal`);
      if (modal) {
        modal.classList.add('show');
      }
    });
  });
  
  // Gallery items lightbox effect
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const title = this.querySelector('h3').textContent;
      const medium = this.querySelector('p').textContent;
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.classList.add('modal');
      lightbox.classList.add('show');
      
      lightbox.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>${title}</h2>
          <p>${medium}</p>
          <img src="${imgSrc}" alt="${title}" style="width: 100%; border-radius: 10px; margin-top: 20px;">
        </div>
      `;
      
      document.body.appendChild(lightbox);
      
      // Close lightbox
      lightbox.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(lightbox);
      });
      
      lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
          document.body.removeChild(lightbox);
        }
      });
    });
  });
  
  // Close modal when clicking outside the modal content
  document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal, .passion-modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.classList.remove('show');
      }
    });
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal.show, .passion-modal.show');
      openModals.forEach(modal => {
        modal.classList.remove('show');
      });
    }
  });
});