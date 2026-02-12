document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  const SCROLLER = window;

  // ==================================================
  // LENIS SETUP (STABLE VERSION)
  // ==================================================
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.08,
    normalizeWheel: true
  });

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);

  // ==================================================
  // SCROLLER PROXY (CORRECT)
  // ==================================================
  ScrollTrigger.scrollerProxy(window, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.body.style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.defaults({
    scroller: window
  });

  ScrollTrigger.addEventListener("refresh", () => lenis.update());

  // ==================================================
  // HEADER START POSITION
  // ==================================================
  function setHeaderStart() {
    gsap.set(".landing-header", {
      y: window.innerHeight - 130,
      position: "absolute",
      left: 0,
      right: 0,
      width: "100%"
    });
  }

  setHeaderStart();

  gsap.set(".list-menu", { gap: "10vw" });
  gsap.set(".header__heading", { width: "320px" });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1681px)", () => headerScroll("800px top"));
  mm.add("(max-width: 1680px)", () => headerScroll("700px top"));
  mm.add("(max-width: 1400px)", () => headerScroll("600px top"));

  function headerScroll(endValue) {

    gsap.to(".landing-header", {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: endValue,
        scrub: true,

        onLeave: () => {
          gsap.set(".landing-header", {
            position: "fixed",
            top: 0,
            y: 0,
            zIndex: 20
          });

          gsap.to(".list-menu", {
            gap: "2vw",
            duration: 0.4
          });

          gsap.to(".header__heading", {
            width: "70px",
            duration: 0.4
          });
        },

        onEnterBack: () => {
          setHeaderStart();

          gsap.to(".list-menu", {
            gap: "10vw",
            duration: 0.4
          });

          gsap.to(".header__heading", {
            width: "120px",
            duration: 0.4
          });
        }
      }
    });
  }

  // ==================================================
  // HERO ANIMATION
  // ==================================================
  function startHeroAnimation() {

    const heroImg =
      document.querySelector(".heroSec .banner__media img");

    if (!heroImg) return;

    gsap.from(heroImg, {
      y: -15,
      scale: 1.2,
      opacity: 0,
      duration: 2,
      ease: "power2.out"
    });

    gsap.fromTo(heroImg,
      { scale: 1, y: 0 },
      {
        scale: 1.2,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".banner",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
  }

  // ==================================================
  // BAKERY SECTIONS
  // ==================================================
  document.querySelectorAll(".bakery-sec").forEach((sec) => {

    const top = sec.querySelector(".bakery-sec-top");
    const bottom = sec.querySelector(".bakery-sec-bottom");
    const overlay = sec.querySelector(".bakery-sec-overlay");
    const title = sec.querySelector(".bakery-title");
    const titleWrap = sec.querySelector(".bakery-title-wrap");

    if (overlay) {
      ScrollTrigger.create({
        trigger: overlay,
        start: "top-=100 top",
        end: "bottom top",
        onEnter: () =>
          document.querySelector(".landing-header")
            ?.classList.add("header--overlay-active"),
        onLeaveBack: () =>
          document.querySelector(".landing-header")
            ?.classList.remove("header--overlay-active")
      });
    }

    gsap.to(top, {
      height: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.set(overlay, { height: 0 });

    gsap.to(overlay, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(bottom, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    if (!title) return;

    const text = title.textContent;
    title.innerHTML = "";

    text.split("").forEach((char) => {
      const span = document.createElement("div");
      span.classList.add("char");
      span.style.display = "inline-block";
      span.textContent = char;
      title.appendChild(span);
    });

    gsap.to(title.querySelectorAll(".char"), {
      y: -10,
      fontSize: "6.5vw",
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bottom,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    if (overlay && titleWrap) {
      gsap.to(titleWrap, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

  });

  // ==================================================
  // PRELOADER
  // ==================================================
  window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (!preloader) {
      ScrollTrigger.refresh();
      startHeroAnimation();
      return;
    }

    gsap.to("#preloader", {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        preloader.style.display = "none";
        ScrollTrigger.refresh(true);
        startHeroAnimation();
      }
    });

  });

  // ==================================================
  // RESIZE SAFETY
  // ==================================================
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      setHeaderStart();
      ScrollTrigger.refresh();
    }, 300);
  });

});
