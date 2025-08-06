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
  });

  // Close Sidebar on Close Icon Click
  closeIcon.addEventListener("click", () => {
    sidebar.style.right = "-100%"; // Slide sidebar out
  });
});

// Bouncing Balls for Skills Section: =======================================================================================================================
window.onload = function () {
  const canvas = document.getElementById('skillsCanvas');
  const ctx = canvas.getContext('2d');
  const skillNameElement = document.getElementById('skillName');

  function resizeCanvas() {
    const canvasWrapper = document.querySelector('.canvasWrapper');
    canvas.width = canvasWrapper.clientWidth;
    canvas.height = canvasWrapper.clientHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const skills = [
    { imgSrc: '../assets/images/skills/arduino.png', name: 'Arduino' },
    { imgSrc: '../assets/images/skills/blender.svg', name: 'Blender' },
    { imgSrc: '../assets/images/skills/c.png', name: 'C' },
    { imgSrc: '../assets/images/skills/c++.png', name: 'C++' },
    { imgSrc: '../assets/images/skills/csharp.png', name: 'C#' },
    { imgSrc: '../assets/images/skills/css.png', name: 'CSS' },
    { imgSrc: '../assets/images/skills/digitalocean.png', name: 'Digital Ocean' },
    { imgSrc: '../assets/images/skills/docker.png', name: 'Docker' },
    { imgSrc: '../assets/images/skills/html.png', name: 'HTML' },
    { imgSrc: '../assets/images/skills/github.png', name: 'GitHub' },
    { imgSrc: '../assets/images/skills/javascript.png', name: 'JavaScript' },
    { imgSrc: '../assets/images/skills/linux.png', name: 'Linux' },
    { imgSrc: '../assets/images/skills/maya.png', name: 'Maya 3D' },
    { imgSrc: '../assets/images/skills/microsoft_office.png', name: 'Microsoft Office' },
    { imgSrc: '../assets/images/skills/mongodb.svg', name: 'MongoDB' },
    { imgSrc: '../assets/images/skills/python.png', name: 'Python' },
    { imgSrc: '../assets/images/skills/pytorch.png', name: 'PyTorch' },
    { imgSrc: '../assets/images/skills/tensorflow.png', name: 'TensorFlow' },
    { imgSrc: '../assets/images/skills/unity.png', name: 'Unity' },
    { imgSrc: '../assets/images/skills/unreal.png', name: 'Unreal Engine' },
    { imgSrc: '../assets/images/skills/vscode.jpeg', name: 'Virtual Studio Code' },
  ];

  const balls = [];

  class Ball {
    constructor(skill, x, y, radius, dx, dy) {
      this.skill = skill;
      this.img = new Image();
      this.img.src = skill.imgSrc;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx;
      this.dy = dy;
    }

    draw() {
      ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    update() {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }

    isHovered(mouseX, mouseY) {
      const dist = Math.hypot(mouseX - this.x, mouseY - this.y);
      return dist < this.radius;
    }
  }

  function init() {
    let radius;

    skills.forEach((skill) => {
      // For phone devices make the width smaller
      if(window.innerWidth <= 480){
        radius = 20;
      }

      else {
        radius = 40;
      }

      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      balls.push(new Ball(skill, x, y, radius, dx, dy));
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => ball.update());
    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let hoveredSkill = null;

    balls.forEach((ball) => {
      if (ball.isHovered(mouseX, mouseY)) {
        hoveredSkill = ball.skill.name;
      }
    });

    if (hoveredSkill) {
      skillNameElement.textContent = hoveredSkill;
      skillNameElement.style.opacity = 1;
    } else {
      skillNameElement.textContent = 'Hover over a skill!';
      skillNameElement.style.opacity = 0.7;
    }
  });

  init();
  animate();
};

// Contact form JS removed - form elements don't exist in HTML

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

// Project Carousel Hover Pause Functionality =================================================
const carouselTrack = document.querySelector('.carouselTrack');
const projectCards = document.querySelectorAll('.projectCarousel .projectCard');

if (carouselTrack && projectCards.length > 0) {
  let isPaused = false;
  let hoverTimeout = null;
  
  // Function to pause carousel
  const pauseCarousel = () => {
    if (!isPaused) {
      carouselTrack.classList.add('paused');
      isPaused = true;
    }
  };
  
  // Function to resume carousel
  const resumeCarousel = () => {
    if (isPaused) {
      carouselTrack.classList.remove('paused');
      isPaused = false;
    }
  };
  
  // Function to handle mouse enter with small delay for better UX
  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    pauseCarousel();
  };
  
  // Function to handle mouse leave with small delay to prevent flickering
  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      resumeCarousel();
    }, 100); // Small delay to prevent flickering when moving between cards
  };
  
  // Add hover event listeners to all project cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
  
  // Also add hover events to the carousel container for better UX
  const projectCarousel = document.querySelector('.projectCarousel');
  if (projectCarousel) {
    projectCarousel.addEventListener('mouseenter', handleMouseEnter);
    projectCarousel.addEventListener('mouseleave', handleMouseLeave);
  }
  
  // Ensure carousel resumes when page becomes visible (for better mobile experience)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isPaused) {
      resumeCarousel();
    }
  });
}


