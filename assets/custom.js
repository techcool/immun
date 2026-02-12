// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);

//   const SCROLLER = document.body;

//   // =============================
//   // LENIS SETUP (PRO LEVEL SYNC)
//   // =============================
//   const lenis = new Lenis({
//     duration: 1.1,
//     smoothWheel: true,
//     smoothTouch: false,
//     wheelMultiplier: 1,
//     normalizeWheel: true
//   });

//   if ("scrollRestoration" in history) {
//     history.scrollRestoration = "manual";
//   }

//   window.scrollTo(0, 0);
//   lenis.stop();

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);

//   lenis.on("scroll", ScrollTrigger.update);

//   ScrollTrigger.scrollerProxy(SCROLLER, {
//     scrollTop(value) {
//       if (arguments.length) {
//         lenis.scrollTo(value, { immediate: true });
//       } else {
//         return lenis.scroll;
//       }
//     },
//     getBoundingClientRect() {
//       return { top: 0, left: 0, width: innerWidth, height: innerHeight };
//     },
//     pinType: SCROLLER.style.transform ? "transform" : "fixed"
//   });

//   ScrollTrigger.addEventListener("refresh", () => lenis.update());

//   ScrollTrigger.config({
//     ignoreMobileResize: true,
//     fastScrollEnd: true
//   });

//   // =============================
//   // FIXED HEADER
//   // =============================
//   function setHeaderStart() {
//     gsap.set(".landing-header", {
//       y: window.innerHeight - 130,
//       position: "absolute",
//       top: "auto",
//       left: 0,
//       right: 0,
//       width: "100%"
//     });
//   }

//   setHeaderStart();
//   gsap.set(".list-menu", { gap: "10vw" });
//   gsap.set(".header__heading", { width: "320px" });

//   const mm = gsap.matchMedia();

//   mm.add("(min-width: 1681px)", () => headerScroll("800px top"));
//   mm.add("(max-width: 1680px)", () => headerScroll("700px top"));
//   mm.add("(max-width: 1400px)", () => headerScroll("600px top"));

//   function headerScroll(endValue) {
//     gsap.to(".landing-header", {
//       y: 0,
//       ease: "none",
//       scrollTrigger: {
//         trigger: SCROLLER,
//         scroller: SCROLLER,
//         start: "top top",
//         end: endValue,
//         scrub: true,

//         onLeave: () => {
//           gsap.set(".landing-header", { position: "fixed", top: 0, y: 0, zIndex: 20 });
//           gsap.to(".list-menu", { gap: "2vw", duration: 0.4, ease: "power2.out" });
//           gsap.to(".header__heading", { width: "70px", duration: 0.4, ease: "power2.out" });
//         },

//         onEnterBack: () => {
//           setHeaderStart();
//           gsap.to(".list-menu", { gap: "10vw", duration: 0.4, ease: "power2.out" });
//           gsap.to(".header__heading", { width: "120px", duration: 0.4, ease: "power2.out" });
//         }
//       }
//     });
//   }

//   // =============================
//   // HERO
//   // =============================
//   function startHeroAnimation() {
//     let heroImg = document.querySelector(".heroSec .hero__media-wrapper img");
//     if (!heroImg) return;

//     gsap.from(heroImg, {
//       y: -15,
//       scale: 1.2,
//       opacity: 0,
//       duration: 2,
//       ease: "power2.out"
//     });

//     gsap.fromTo(heroImg, { scale: 1, y: 0 }, {
//       scale: 1.2,
//       y: -50,
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".banner",
//         scroller: SCROLLER,
//         start: "top top",
//         end: "bottom top",
//         scrub: true
//       }
//     });
//   }

//   // =============================
//   // BAKERY SECTIONS
//   // =============================
//   document.querySelectorAll(".bakery-sec").forEach((sec) => {
//     const top = sec.querySelector(".bakery-sec-top");
//     const bottom = sec.querySelector(".bakery-sec-bottom");
//     const overlay = sec.querySelector(".bakery-sec-overlay");
//     const title = sec.querySelector(".bakery-title");
//     const titleWrap = sec.querySelector(".bakery-title-wrap");

//     if (overlay) {
//       ScrollTrigger.create({
//         trigger: overlay,
//         scroller: SCROLLER,
//         start: "top-=100 top",
//         end: "bottom top",
//         onEnter: () => document.querySelector(".landing-header")?.classList.add("header--overlay-active"),
//         onLeaveBack: () => document.querySelector(".landing-header")?.classList.remove("header--overlay-active")
//       });
//     }

//     gsap.to(top, {
//       height: 0,
//       ease: "none",
//       scrollTrigger: {
//         trigger: sec,
//         scroller: SCROLLER,
//         start: "top top",
//         end: "bottom top",
//         scrub: true
//       }
//     });

//     gsap.set(overlay, { height: 0 });
//     gsap.to(overlay, {
//       height: "100%",
//       ease: "none",
//       scrollTrigger: {
//         trigger: sec,
//         scroller: SCROLLER,
//         start: "top top",
//         end: "bottom top",
//         scrub: true
//       }
//     });

//     gsap.to(bottom, {
//       opacity: 1,
//       ease: "none",
//       scrollTrigger: {
//         trigger: sec,
//         scroller: SCROLLER,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//         pin: true,
//         anticipatePin: 1,
//         invalidateOnRefresh: true
//       }
//     });

//     gsap.to(title, {
//       color: "#ffffff",
//       scrollTrigger: {
//         trigger: bottom,
//         scroller: SCROLLER,
//         start: "top top",
//         end: "bottom top",
//         scrub: true
//       }
//     });

//     if (title) {
//       const text = title.textContent;
//       title.innerHTML = "";
//       text.split("").forEach((char) => {
//         const span = document.createElement("div");
//         span.classList.add("char");
//         span.style.display = "inline-block";
//         span.style.fontSize = "2.5vw";
//         span.textContent = char;
//         title.appendChild(span);
//       });

//       gsap.to(title.querySelectorAll(".char"), {
//         y: -10,
//         scale: 1,
//         fontSize: "6.5vw",
//         stagger: 0.05,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: bottom,
//           scroller: SCROLLER,
//           start: "top top",
//           end: "bottom top",
//           scrub: true
//         }
//       });

//       if (overlay && titleWrap) {
//         gsap.fromTo(titleWrap, { y: 0 }, {
//           y: -150,
//           ease: "none",
//           scrollTrigger: {
//             trigger: sec,
//             scroller: SCROLLER,
//             start: "top top",
//             end: "bottom top",
//             scrub: true
//           }
//         });
//       }

//       if (overlay && bottom) {
//         ScrollTrigger.create({
//           trigger: bottom,
//           scroller: SCROLLER,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//           onUpdate: () => {
//             const secRect = sec.getBoundingClientRect();
//             const overlayH = overlay.getBoundingClientRect().height;
//             const overlayTop = secRect.height - overlayH;

//             const titleRect = title.getBoundingClientRect();
//             const titleTop = titleRect.top - secRect.top;
//             const titleBottom = titleTop + titleRect.height;

//             let p = 0;
//             if (overlayTop <= titleTop) p = 1;
//             else if (overlayTop < titleBottom)
//               p = (titleBottom - overlayTop) / (titleBottom - titleTop);

//             title.querySelectorAll(".char").forEach((c) => {
//               c.style.setProperty("--fill", `${Math.min(1, Math.max(0, p)) * 100}%`);
//             });
//           }
//         });
//       }
//     }
//   });

//   // =============================
//   // TEXT SPLIT
//   // =============================
//   function splitText(element) {
//     const text = element.innerText;
//     element.innerHTML = "";
//     text.split("").forEach((char) => {
//       const span = document.createElement("span");
//       span.textContent = char;
//       span.style.display = "inline-block";
//       span.style.opacity = "0";
//       span.style.transform = "translateY(30px)";
//       element.appendChild(span);
//     });
//   }

//   document.querySelectorAll(".footer-block:nth-of-type(2) .footer-block__heading, .title, .blog__title, .b2b-services-contentLeft h2")
//     .forEach((unit) => {
//       splitText(unit);
//       gsap.to(unit.querySelectorAll("span"), {
//         y: -50,
//         opacity: 1,
//         stagger: 0.09,
//         ease: "power3.out",
//         duration: 0.8,
//         scrollTrigger: {
//           trigger: unit,
//           scroller: SCROLLER,
//           start: "top 85%",
//           toggleActions: "play reverse play reverse"
//         }
//       });
//     });

//   // =============================
//   // PRELOADER
//   // =============================
//   function splitLogo(el) {
//     let text = el.innerText.trim();
//     el.innerHTML = "";
//     text.split("").forEach((char) => {
//       let span = document.createElement("span");
//       span.innerText = char === " " ? "\u00A0" : char;
//       el.appendChild(span);
//     });
//   }

//   window.addEventListener("load", () => {
//     const preloader = document.getElementById("preloader");

//     window.scrollTo(0, 0);
//     lenis.scrollTo(0, { immediate: true });

//     if (!preloader) {
//       lenis.start();
//       ScrollTrigger.refresh(true);
//       startHeroAnimation();
//       return;
//     }

//     const logo = preloader.querySelector(".loader-logo");
//     const loaderContent = preloader.querySelector(".loader-content");
//     const logoImg = preloader.querySelector(".proloder-logo img");

//     if (logo) splitLogo(logo);

//     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//     if (logoImg) tl.to(logoImg, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
//     tl.to(loaderContent, { y: 0, opacity: 1, duration: 1 });

//     if (logo) {
//       const letters = logo.querySelectorAll("span");
//       tl.to(logo, { opacity: 1, duration: 0.1 });
//       tl.to(letters, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 });
//     }

//     tl.call(() => {
//       gsap.set(".header__heading", { y: 250, opacity: 1 });
//       gsap.to(".header__heading", { y: 0, opacity: 1, duration: 2, ease: "power3.out" });
//     });

//     tl.to("#preloader", {
//       y: "-100%",
//       duration: 0.8,
//       delay: 0.2,
//       ease: "power3.inOut",
//       onComplete: () => {
//         preloader.style.display = "none";

//         lenis.start();
//         lenis.scrollTo(0, { immediate: true });

//         ScrollTrigger.refresh(true);
//         startHeroAnimation();
//       }
//     });
//   });

//   // =============================
//   // RESIZE SAFETY
//   // =============================
//   let resizeTimer;
//   window.addEventListener("resize", () => {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(() => {
//       setHeaderStart();
//       ScrollTrigger.refresh(true);
//     }, 300);
//   });

// });




document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const SCROLLER = document.body;
  let lenis;

  // =============================
  // LENIS SETUP (PRO LEVEL SYNC)
  // =============================
  function initLenis() {
    lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      normalizeWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
      infinite: false,
    });

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    lenis.stop();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(SCROLLER, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true, force: true });
        } else {
          return lenis.scroll;
        }
      },
      getBoundingClientRect() {
        return { 
          top: 0, 
          left: 0, 
          width: window.innerWidth, 
          height: window.innerHeight 
        };
      },
      pinType: SCROLLER.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => lenis?.update());

    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
    });
  }

  initLenis();

  // =============================
  // FIXED HEADER - PROFESSIONAL APPROACH
  // =============================
  const header = document.querySelector(".landing-header");
  const headerHeading = document.querySelector(".header__heading");
  const listMenu = document.querySelector(".list-menu");
  
  if (!header) return;

  // Initial setup
  gsap.set(header, { 
    position: "absolute",
    top: "auto",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    y: 0,
    zIndex: 50
  });

  gsap.set(listMenu, { gap: "10vw" });
  gsap.set(headerHeading, { width: "320px" });

  // Responsive header animation
  function createHeaderScroll() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const scrollDistance = isMobile ? "400px" : "800px";
    
    // Kill existing ScrollTrigger to prevent conflicts
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.id === "headerScroll") st.kill();
    });

    // Create master timeline for header
    const headerTimeline = gsap.timeline({
      id: "headerScroll",
      scrollTrigger: {
        trigger: SCROLLER,
        scroller: SCROLLER,
        start: "top top",
        end: scrollDistance,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Smooth progress mapping
          const progress = Math.min(1, self.progress * 1.2);
          
          // Animate header position
          gsap.set(header, {
            y: (1 - progress) * (window.innerHeight - 130),
            position: progress >= 0.99 ? "fixed" : "absolute",
            top: progress >= 0.99 ? 0 : "auto",
            bottom: progress >= 0.99 ? "auto" : 0,
          });

          // Animate header elements
          if (progress > 0.5) {
            const elementProgress = (progress - 0.5) * 2;
            gsap.set(listMenu, { gap: `${10 - elementProgress * 8}vw` });
            gsap.set(headerHeading, { width: `${320 - elementProgress * 250}px` });
          }
        },
        onLeave: () => {
          gsap.set(header, { 
            position: "fixed", 
            top: 0, 
            bottom: "auto",
            y: 0 
          });
          gsap.set(listMenu, { gap: "2vw" });
          gsap.set(headerHeading, { width: "70px" });
        },
        onEnterBack: () => {
          gsap.set(header, { 
            position: "absolute",
            top: "auto",
            bottom: 0,
            y: window.innerHeight - 130 
          });
          gsap.set(listMenu, { gap: "10vw" });
          gsap.set(headerHeading, { width: "320px" });
        }
      }
    });
  }

  // Initialize header scroll
  createHeaderScroll();

  // Handle resize with debounce
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
      createHeaderScroll();
    }, 250);
  });

  // =============================
  // HERO ANIMATION
  // =============================
  function startHeroAnimation() {
    const heroImg = document.querySelector(".heroSec .hero__media-wrapper img");
    if (!heroImg) return;

    // Kill existing ScrollTriggers for hero
    ScrollTrigger.getAll().forEach(st => {
      if (st.animation && st.animation.targets && st.animation.targets().includes(heroImg)) {
        st.kill();
      }
    });

    gsap.from(heroImg, {
      y: -15,
      scale: 1.2,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      delay: 0.5
    });

    gsap.fromTo(heroImg, 
      { scale: 1, y: 0 },
      {
        scale: 1.2,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".banner",
          scroller: SCROLLER,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      }
    );
  }

  // =============================
  // BAKERY SECTIONS - OPTIMIZED
  // =============================
  function initBakerySections() {
    document.querySelectorAll(".bakery-sec").forEach((sec, index) => {
      const top = sec.querySelector(".bakery-sec-top");
      const bottom = sec.querySelector(".bakery-sec-bottom");
      const overlay = sec.querySelector(".bakery-sec-overlay");
      const title = sec.querySelector(".bakery-title");
      const titleWrap = sec.querySelector(".bakery-title-wrap");

      if (!top || !bottom) return;

      // Header overlay class management
      if (overlay) {
        ScrollTrigger.create({
          id: `headerOverlay-${index}`,
          trigger: overlay,
          scroller: SCROLLER,
          start: "top-=100 top",
          end: "bottom top",
          onEnter: () => header?.classList.add("header--overlay-active"),
          onLeave: () => header?.classList.remove("header--overlay-active"),
          onEnterBack: () => header?.classList.add("header--overlay-active"),
          onLeaveBack: () => header?.classList.remove("header--overlay-active")
        });
      }

      // Top section animation
      gsap.to(top, {
        height: 0,
        ease: "none",
        scrollTrigger: {
          id: `bakeryTop-${index}`,
          trigger: sec,
          scroller: SCROLLER,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });

      // Overlay animation
      if (overlay) {
        gsap.set(overlay, { height: 0 });
        gsap.to(overlay, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            id: `bakeryOverlay-${index}`,
            trigger: sec,
            scroller: SCROLLER,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true
          }
        });
      }

      // Bottom section with pin
      gsap.to(bottom, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          id: `bakeryBottom-${index}`,
          trigger: sec,
          scroller: SCROLLER,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0.5,
          invalidateOnRefresh: true
        }
      });

      // Title color change
      if (title) {
        gsap.to(title, {
          color: "#ffffff",
          scrollTrigger: {
            id: `bakeryTitleColor-${index}`,
            trigger: bottom,
            scroller: SCROLLER,
            start: "top top",
            end: "bottom top",
            scrub: 1.2
          }
        });

        // Split text and animate
        const text = title.textContent;
        title.innerHTML = "";
        title.style.display = "flex";
        title.style.flexWrap = "wrap";
        title.style.justifyContent = "center";
        
        text.split("").forEach((char) => {
          const span = document.createElement("div");
          span.classList.add("char");
          span.style.display = "inline-block";
          span.style.fontSize = "2.5vw";
          span.style.transform = "translateY(0)";
          span.textContent = char === " " ? "\u00A0" : char;
          title.appendChild(span);
        });

        gsap.to(title.querySelectorAll(".char"), {
          y: -10,
          scale: 1.2,
          fontSize: "6.5vw",
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            id: `bakeryTitleScale-${index}`,
            trigger: bottom,
            scroller: SCROLLER,
            start: "top top",
            end: "bottom top",
            scrub: 1.2
          }
        });

        // Title wrap animation
        if (overlay && titleWrap) {
          gsap.fromTo(titleWrap, 
            { y: 0 },
            {
              y: -150,
              ease: "none",
              scrollTrigger: {
                id: `bakeryTitleWrap-${index}`,
                trigger: sec,
                scroller: SCROLLER,
                start: "top top",
                end: "bottom top",
                scrub: 1.2
              }
            }
          );
        }

        // Fill progress animation
        if (overlay && bottom) {
          ScrollTrigger.create({
            id: `bakeryFill-${index}`,
            trigger: bottom,
            scroller: SCROLLER,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            onUpdate: (self) => {
              const progress = self.progress;
              title.querySelectorAll(".char").forEach((c) => {
                c.style.setProperty("--fill", `${progress * 100}%`);
              });
            }
          });
        }
      }
    });
  }

  // =============================
  // TEXT SPLIT UTILITY
  // =============================
  function splitText(element, yOffset = 30, delay = 0.09) {
    if (!element) return;
    
    const text = element.innerText;
    element.innerHTML = "";
    element.style.display = "flex";
    element.style.flexWrap = "wrap";
    
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = `translateY(${yOffset}px)`;
      element.appendChild(span);
    });

    gsap.to(element.querySelectorAll("span"), {
      y: 0,
      opacity: 1,
      stagger: delay,
      ease: "power3.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        scroller: SCROLLER,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true
      }
    });
  }

  // Initialize text splits
  function initTextSplits() {
    const textElements = document.querySelectorAll(
      ".footer-block:nth-of-type(2) .footer-block__heading, .title, .blog__title, .b2b-services-contentLeft h2"
    );
    
    textElements.forEach(element => splitText(element));
  }

  // =============================
  // PRELOADER
  // =============================
  function splitLogo(el) {
    if (!el) return;
    let text = el.innerText.trim();
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexWrap = "wrap";
    
    text.split("").forEach((char) => {
      let span = document.createElement("span");
      span.innerText = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(30px)";
      el.appendChild(span);
    });
  }

  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }

    if (!preloader) {
      if (lenis) lenis.start();
      ScrollTrigger.refresh(true);
      startHeroAnimation();
      initBakerySections();
      initTextSplits();
      return;
    }

    const logo = preloader.querySelector(".loader-logo");
    const loaderContent = preloader.querySelector(".loader-content");
    const logoImg = preloader.querySelector(".proloder-logo img");

    if (logo) splitLogo(logo);

    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      onComplete: () => {
        preloader.style.display = "none";
        if (lenis) {
          lenis.start();
          lenis.scrollTo(0, { immediate: true, force: true });
        }
        ScrollTrigger.refresh(true);
        startHeroAnimation();
        initBakerySections();
        initTextSplits();
      }
    });

    if (logoImg) {
      gsap.set(logoImg, { opacity: 0, y: 30, scale: 0.8 });
      tl.to(logoImg, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      });
    }

    if (loaderContent) {
      gsap.set(loaderContent, { y: 30, opacity: 0 });
      tl.to(loaderContent, { 
        y: 0, 
        opacity: 1, 
        duration: 0.8 
      }, "-=0.3");
    }

    if (logo) {
      const letters = logo.querySelectorAll("span");
      gsap.set(logo, { opacity: 1 });
      tl.to(letters, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.05, 
        duration: 0.6 
      }, "-=0.2");
    }

    gsap.set(".header__heading", { y: 250, opacity: 1 });
    tl.to(".header__heading", { 
      y: 0, 
      opacity: 1, 
      duration: 1.5, 
      ease: "power3.out" 
    }, "-=0.2");

    tl.to("#preloader", {
      y: "-100%",
      duration: 0.8,
      delay: 0.3,
      ease: "power3.inOut"
    });
  });

  // =============================
  // INITIALIZATION
  // =============================
  // Initialize if preloader is already loaded
  if (document.readyState === 'complete') {
    if (lenis) lenis.start();
    ScrollTrigger.refresh(true);
    startHeroAnimation();
    initBakerySections();
    initTextSplits();
  }

  // =============================
  // CLEANUP
  // =============================
  window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
    if (lenis) lenis.destroy();
  });
});