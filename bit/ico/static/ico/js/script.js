// Countdown Timer - Django Integrated
function countdown(deadline) {
    function updateCountdown() {
        const now = new Date();
        const diff = deadline - now;
  
        if (diff <= 0) return;
  
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
  
        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    }
  
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof deadline !== "undefined") {
        countdown(new Date(deadline));
    }
  });
  //promo code
  
  document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("id_amount");
    const cryptoSelect = document.getElementById("id_crypto");
    const promoInput = document.getElementById("id_promo_code");
  
    const resultDiv = document.getElementById("live-result");
    const bonusOutput = document.getElementById("bonus_output");
    const youGetOutput = document.getElementById("you_get_output");
    const afterPresaleOutput = document.getElementById("after_presale_output");
  
    function calculateTokens() {
      let amount = parseFloat(amountInput.value) || 0;
      let crypto = cryptoSelect.value;
      let promo = promoInput.value.trim().toUpperCase();
  
      let rate = 0;
      if (crypto === "USDT") rate = 96;
      else if (crypto === "ETH") rate = 171850;
      else if (crypto === "BTC") rate = 23;
  
      let promoBonusMap = {
        "BONUS10": 1.10,
        "BONUS20": 1.20
      };
      let multiplier = promoBonusMap[promo] || 1.0;
  
      let tokens = amount * rate * multiplier;
      let bonusPercent = (multiplier - 1.0) * 100;
      let afterPresale = tokens * 0.05;
  
      if (bonusOutput) bonusOutput.value = `${bonusPercent.toFixed(0)}%`;
      if (youGetOutput) youGetOutput.value = tokens.toFixed(2);
      if (afterPresaleOutput) afterPresaleOutput.value = `$${afterPresale.toFixed(2)}`;
  
      if (resultDiv) {
        resultDiv.innerHTML = `
          <p><strong>You Get:</strong> ${tokens.toFixed(2)}</p>
          <p><strong>Bonus (%):</strong> ${bonusPercent.toFixed(0)}</p>
          <p><strong>After Presale Value ($):</strong> ${afterPresale.toFixed(2)}</p>
        `;
      }
    }
  
    if (amountInput && cryptoSelect && promoInput) {
      amountInput.addEventListener("input", calculateTokens);
      cryptoSelect.addEventListener("change", calculateTokens);
      promoInput.addEventListener("input", calculateTokens);
    }
  });
  

  // Tokenomics Chart
  const ctx = document.getElementById("tokenChart").getContext("2d");
  
  new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [
      "Public Sale", "Private Investors", "Staking & Rewards", 
      "Airdrop & Incentives", "Ecosystem & Treasury", "Team & Advisors",
      "Liquidity Listings", "Marketing", "Burn & Reserve"
    ],
    datasets: [{
      data: [350, 30, 100, 50, 70, 150, 150, 100, 30],
      backgroundColor: [
        "#7f8c4e", "#6bc5cd", "#00ff00", "#0000ff", "#00ffb3",
        "#5d3654", "#a073e5", "#7d3c3c", "#fcd8b6"
      ],
      borderColor: "#121212",
      borderWidth: 2,
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}M (${Math.round(context.parsed/10)}%)`;
          }
        }
      }
    }
  }
  });
  // Roadmap
  const swiper = new Swiper('.roadmap-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      480: { slidesPerView: 1 }
    }
  });
  
  //Testimonials
  const testimonialSwiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: { slidesPerView: 2 },
      768: { slidesPerView: 1 },
      480: { slidesPerView: 1 },
    }
  });
  
  //FAQ
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const answer = button.nextElementSibling;
  
      // Collapse others
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-answer').style.display = 'none';
        }
      });
  
      // Toggle current
      const isActive = faqItem.classList.contains('active');
      faqItem.classList.toggle('active', !isActive);
      answer.style.display = isActive ? 'none' : 'block';
    });
  });
  
  
  
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav ul');
  
  mobileMenuBtn.addEventListener('click', function() {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Form validation
  document.querySelector('.purchase-box').addEventListener('submit', function(e) {
    e.preventDefault();
    const promoInput = document.querySelector('.input-group:nth-child(2) input');
    if(promoInput.value && promoInput.value.length < 5) {
        document.querySelector('.input-group:nth-child(2)').classList.add('error');
    } else {
        document.querySelector('.input-group:nth-child(2)').classList.remove('error');
        // Process form submission
    }
  });
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.phase, .review, .faq-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.phase, .review, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  