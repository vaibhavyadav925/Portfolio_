document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.7)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0.7)"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    })
  
    // Links and buttons hover effect
    const links = document.querySelectorAll("a, button, .btn")
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursor.style.backgroundColor = "transparent"
        cursor.style.border = "1px solid #6c63ff"
        cursorFollower.style.width = "40px"
        cursorFollower.style.height = "40px"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.backgroundColor = "#6c63ff"
        cursor.style.border = "none"
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
      })
    })
  
    // Sticky header
    const header = document.querySelector("header")
    const backToTop = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("sticky")
        backToTop.classList.add("active")
      } else {
        header.classList.remove("sticky")
        backToTop.classList.remove("active")
      }
  
      // Active nav link based on scroll position
      const sections = document.querySelectorAll("section")
      const navLinks = document.querySelectorAll(".nav-links a")
  
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active")
        }
      })
    })
  
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
  
      if (hamburger.classList.contains("active")) {
        hamburger.querySelector("span:nth-child(1)").style.transform = "rotate(45deg) translate(5px, 6px)"
        hamburger.querySelector("span:nth-child(2)").style.opacity = "0"
        hamburger.querySelector("span:nth-child(3)").style.transform = "rotate(-45deg) translate(5px, -6px)"
      } else {
        hamburger.querySelector("span:nth-child(1)").style.transform = "none"
        hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
        hamburger.querySelector("span:nth-child(3)").style.transform = "none"
      }
    })
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
        hamburger.querySelector("span:nth-child(1)").style.transform = "none"
        hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
        hamburger.querySelector("span:nth-child(3)").style.transform = "none"
      })
    })
  
    // Back to top button
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        // For now, we'll just log it to the console and show an alert
        console.log("Form submitted:", { name, email, subject, message })
  
        // Show success message
        alert("Thank you for your message! I will get back to you soon.")
  
        // Reset form
        contactForm.reset()
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".skill-item, .project-card, .certification-item, .contact-item, .stat-item",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2
  
        if (elementPosition < screenPosition) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial state for animated elements
    document
      .querySelectorAll(".skill-item, .project-card, .certification-item, .contact-item, .stat-item")
      .forEach((element) => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      })
  
    // Run animation on scroll
    window.addEventListener("scroll", animateOnScroll)
  
    // Run animation on load
    window.addEventListener("load", animateOnScroll)
  
    // Typing effect for hero section
    const typingEffect = () => {
      const text = "Computer Science Student"
      const typingElement = document.querySelector(".hero-text h2")
      let i = 0
  
      if (typingElement) {
        typingElement.textContent = ""
  
        const typing = setInterval(() => {
          if (i < text.length) {
            typingElement.textContent += text.charAt(i)
            i++
          } else {
            clearInterval(typing)
  
            // After typing is complete, add a blinking cursor
            typingElement.innerHTML += '<span class="cursor-blink">|</span>'
  
            // Add CSS for blinking cursor
            const style = document.createElement("style")
            style.innerHTML = `
                          .cursor-blink {
                              animation: blink 1s infinite;
                          }
                          
                          @keyframes blink {
                              0%, 100% { opacity: 1; }
                              50% { opacity: 0; }
                          }
                      `
            document.head.appendChild(style)
          }
        }, 100)
      }
    }
  
    // Run typing effect on load
    window.addEventListener("load", typingEffect)
  })
  
