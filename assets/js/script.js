// Preloading the loading animations: ===================================================================================
'use strict';
const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});


// Header Javascript when the user scrolls down it adds some properties: =================================================
const header = document.querySelector(".header");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);

// Sub-title Wave Effect Animation for each letter: =====================================================================
const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);

// When scrolled down, this JS code will deveal the data in a fading animation: =================================================
const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();


// JS for the custom cursor: ==========================================================================================
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});


// Scroll to Javascript code for navigation hyperlinks on the header: =============================================
document.addEventListener("DOMContentLoaded", function () {
  const headerHeight = document.querySelector(".header").offsetHeight; // Get the header height

  // Handle all navigation links with smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      const targetId = this.getAttribute("href"); // Get the target element ID
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top; // Get target element position

        // Adjust offset based on whether it's the home section or not
        // For home section, we want to scroll to the very top without header offset
        // For other sections, we need to account for the fixed header height
        const offsetPosition =
          targetId === "#home"
            ? 0 // Scroll to very top for home
            : targetPosition + window.scrollY - (headerHeight * 0.35); // Reduce header offset for better visibility

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Special handler for logo to ensure it always scrolls to top
  const logoLink = document.querySelector('.logo');
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Phone screens navigation bar javascript: ========================================================
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const sidebar = document.getElementById("sidebar");

  // Open Sidebar on Bars Icon Click
  menuIcon.addEventListener("click", () => {
    sidebar.style.right = "0"; // Slide sidebar in
    sidebar.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });

  // Close Sidebar on Close Icon Click
  closeIcon.addEventListener("click", () => {
    sidebar.style.right = "-100%"; // Slide sidebar out
    sidebar.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Close sidebar when clicking on a navigation link
  const sidebarLinks = document.querySelectorAll(".sidebarNav a");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
      sidebar.style.right = "-100%";
      sidebar.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && 
        !sidebar.contains(e.target) && 
        !menuIcon.contains(e.target)) {
      sidebar.style.right = "-100%";
      sidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close sidebar on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      sidebar.style.right = "-100%";
      sidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Add touch swipe to close sidebar (for mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  sidebar.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sidebar.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // If swiping right (positive distance) and sidebar is open, close it
    if (swipeDistance > swipeThreshold && sidebar.classList.contains("active")) {
      sidebar.style.right = "-100%";
      sidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});


// Dynamic Subtitle Centering for all devices ========================================================================
const subtitleBoxes = document.querySelectorAll("[data-letter-effect]");
let currentSubtitleIndex = 0;
let previousSubtitleIndex = 0;
let animationDelayTotal = 0;

const updateSubtitlePosition = function (word) {
  const subtitleElement = document.querySelector('.subTitle');
  
  if (subtitleElement) {
    // Clear any existing left positioning
    subtitleElement.style.left = '';
    
    // The flexbox centering in CSS will handle the centering automatically
    // We just need to ensure the text is properly set
    const activeElement = subtitleElement.querySelector('.strong.active');
    if (activeElement) {
      // Force a reflow to ensure proper centering
      activeElement.offsetHeight;
    }
  }
};

const animateSubtitles = function () {
  for (let i = 0; i < subtitleBoxes.length; i++) {
    let charDelay = 0;
    const word = subtitleBoxes[i].textContent.trim();
    subtitleBoxes[i].textContent = "";

    for (let j = 0; j < word.length; j++) {
      const characterSpan = document.createElement("span");
      characterSpan.style.animationDelay = `${charDelay}s`;
      characterSpan.classList.add(i === currentSubtitleIndex ? "in" : "out");
      characterSpan.textContent = word[j];

      if (word[j] === " ") characterSpan.classList.add("space");

      subtitleBoxes[i].appendChild(characterSpan);
      if (j < word.length - 1) charDelay += 0.05;
    }

    if (i === currentSubtitleIndex) {
      animationDelayTotal = Number(charDelay.toFixed(2));
      updateSubtitlePosition();
    }

    subtitleBoxes[i].classList.toggle("active", i === previousSubtitleIndex);
  }

  setTimeout(function () {
    previousSubtitleIndex = currentSubtitleIndex;
    currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitleBoxes.length;
    animateSubtitles();
  }, (animationDelayTotal * 1000) + 3000);
};

// Call the subtitle animation function after window load
window.addEventListener("load", animateSubtitles);

// Update subtitle position on window resize
window.addEventListener("resize", function() {
  updateSubtitlePosition();
});


// Project Carousel Controls ===================================================================================
document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.querySelector('.carouselTrack');
  const leftBtn = document.getElementById('carouselBtnLeft');
  const rightBtn = document.getElementById('carouselBtnRight');
  
  if (!carouselTrack || !leftBtn || !rightBtn) {
    console.log('Carousel elements not found');
    return;
  }

  let isLeftPressed = false;
  let isRightPressed = false;
  let animationId = null;
  let currentSpeed = 0;
  let defaultSpeed = 0.5; // Default auto-scroll speed
  let maxSpeed = 3; // Maximum speed when button is held
  let acceleration = 0.1; // Speed increase per frame when button is held
  let deceleration = 0.05; // Speed decrease per frame when button is released
  let autoScrollTimeout = null;

  // Mouse events for left button
  leftBtn.addEventListener('mousedown', () => startLeftScroll());
  leftBtn.addEventListener('mouseup', () => stopLeftScroll());
  leftBtn.addEventListener('mouseleave', () => stopLeftScroll());

  // Mouse events for right button
  rightBtn.addEventListener('mousedown', () => startRightScroll());
  rightBtn.addEventListener('mouseup', () => stopRightScroll());
  rightBtn.addEventListener('mouseleave', () => stopRightScroll());

  // Touch events for left button
  leftBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startLeftScroll();
  });
  leftBtn.addEventListener('touchend', () => stopLeftScroll());

  // Touch events for right button
  rightBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startRightScroll();
  });
  rightBtn.addEventListener('touchend', () => stopRightScroll());

  // Keyboard events for arrow keys
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      startLeftScroll();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      startRightScroll();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
      stopLeftScroll();
    } else if (e.key === 'ArrowRight') {
      stopRightScroll();
    }
  });

  function startLeftScroll() {
    console.log('Left button pressed');
    isLeftPressed = true;
    isRightPressed = false;
    startManualScroll();
  }

  function stopLeftScroll() {
    isLeftPressed = false;
  }

  function startRightScroll() {
    console.log('Right button pressed');
    isRightPressed = true;
    isLeftPressed = false;
    startManualScroll();
  }

  function stopRightScroll() {
    isRightPressed = false;
  }

  function startManualScroll() {
    // Clear any pending auto-scroll timeout
    if (autoScrollTimeout) {
      clearTimeout(autoScrollTimeout);
      autoScrollTimeout = null;
    }
    
    // Stop any ongoing auto-scroll animation
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // Completely disable the CSS animation
    carouselTrack.style.animation = 'none';
    
    // Start manual scrolling
    if (!animationId) {
      animate();
    }
  }

  function animate() {
    // Determine scroll direction and speed
    if (isLeftPressed) {
      // Scroll left (positive speed)
      currentSpeed = Math.min(currentSpeed + acceleration, maxSpeed);
    } else if (isRightPressed) {
      // Scroll right (negative speed)
      currentSpeed = Math.max(currentSpeed - acceleration, -maxSpeed);
    } else {
      // No button pressed, return to default speed
      if (currentSpeed > 0) {
        currentSpeed = Math.max(currentSpeed - deceleration, 0);
      } else if (currentSpeed < 0) {
        currentSpeed = Math.min(currentSpeed + deceleration, 0);
      }
    }

    // Apply the scroll
    if (currentSpeed !== 0) {
      const currentTransform = getCurrentTransform();
      let newTransform = currentTransform + currentSpeed;
      
      // Handle infinite loop
      const totalWidth = getTotalWidth();
      if (totalWidth > 0) {
        if (newTransform > 0) {
          newTransform -= totalWidth;
        } else if (newTransform < -totalWidth) {
          newTransform += totalWidth;
        }
      }
      
      carouselTrack.style.transform = `translateX(${newTransform}px)`;
      
      console.log('Scrolling:', { 
        isLeftPressed, 
        isRightPressed, 
        currentSpeed, 
        currentTransform, 
        newTransform,
        totalWidth
      });
    }

    // Continue animation if any button is pressed or speed is not zero
    if (isLeftPressed || isRightPressed || Math.abs(currentSpeed) > 0.01) {
      animationId = requestAnimationFrame(animate);
    } else {
      // Keep the carousel at its current position and start auto-scroll from there
      animationId = null;
      console.log('Stopping at current position');
      
      // Start auto-scroll from current position after a delay
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
      }
      autoScrollTimeout = setTimeout(() => {
        startAutoScrollFromCurrentPosition();
        console.log('Starting auto-scroll from current position');
      }, 1000); // 1 second delay before starting auto-scroll
    }
  }

  function getCurrentTransform() {
    const transform = window.getComputedStyle(carouselTrack).transform;
    if (transform === 'none') return 0;
    
    const matrix = new DOMMatrix(transform);
    return matrix.m41; // translateX value
  }

  function getTotalWidth() {
    // Calculate the total width of one complete set of cards
    const cardWidth = 350 + 30; // card width + gap
    const mobileCardWidth = window.innerWidth <= 768 ? (280 + 20) : cardWidth;
    const phoneCardWidth = window.innerWidth <= 480 ? (250 + 15) : cardWidth;
    const actualCardWidth = window.innerWidth <= 480 ? phoneCardWidth : 
                           window.innerWidth <= 768 ? mobileCardWidth : cardWidth;
    
    const totalCards = carouselTrack.children.length;
    const halfCards = Math.floor(totalCards / 2);
    return halfCards * actualCardWidth;
  }

  function startAutoScrollFromCurrentPosition() {
    let currentPosition = getCurrentTransform();
    let autoScrollSpeed = 0.5; // Speed for auto-scroll
    
    function autoScroll() {
      if (!isLeftPressed && !isRightPressed) {
        currentPosition -= autoScrollSpeed;
        
        // Handle infinite loop
        const totalWidth = getTotalWidth();
        if (totalWidth > 0 && currentPosition < -totalWidth) {
          currentPosition += totalWidth;
        }
        
        carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        animationId = requestAnimationFrame(autoScroll);
      }
    }
    
    autoScroll();
  }

  // Initialize the carousel with manual control from the start
  function initializeCarousel() {
    // Disable CSS animation immediately
    carouselTrack.style.animation = 'none';
    
    // Start auto-scroll from the beginning
    startAutoScrollFromCurrentPosition();
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    // Reset carousel position on resize
    if (!isLeftPressed && !isRightPressed) {
      carouselTrack.style.transform = '';
      carouselTrack.style.animation = '';
    }
  });

  // Add grab cursor on hover
  carouselTrack.style.cursor = 'grab';
  
  // Initialize the carousel
  initializeCarousel();
});




