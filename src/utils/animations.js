import { gsap } from "gsap";

export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
  },

  fadeInLeft: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
  },

  fadeInRight: {
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
  },

  scaleInBounce: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
  },

  staggerIn: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
  },
};

export const animateElement = (element, preset, options = {}) => {
  if (!element) return;

  const animation = {
    ...animationPresets[preset].from,
    ...animationPresets[preset].to,
    ...options,
  };

  return gsap.fromTo(element, animationPresets[preset].from, animation);
};

export const animateElements = (elements, preset, options = {}) => {
  if (!elements || elements.length === 0) return;

  const animation = {
    ...animationPresets[preset].from,
    ...animationPresets[preset].to,
    ...options,
  };

  return gsap.fromTo(elements, animationPresets[preset].from, animation);
};

export const createHoverAnimation = (
  element,
  hoverScale = 1.05,
  hoverY = -5
) => {
  if (!element) return;

  const tl = gsap.timeline({ paused: true });

  tl.to(element, {
    scale: hoverScale,
    y: hoverY,
    duration: 0.3,
    ease: "power2.out",
  });

  return {
    hover: () => tl.play(),
    leave: () => tl.reverse(),
  };
};

export const animateButtonClick = (element) => {
  if (!element) return;

  const tl = gsap.timeline();

  return tl
    .to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
    })
    .to(element, {
      scale: 1,
      duration: 0.2,
      ease: "back.out(1.7)",
    });
};

export const pageTransition = {
  enter: (element) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
    );
  },

  leave: (element, done) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.in",
      onComplete: done,
    });
  },
};

export const createShimmerEffect = (element, duration = 1.5, delay = 0) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    {
      backgroundPosition: "-200% 0",
    },
    {
      backgroundPosition: "200% 0",
      duration: duration,
      ease: "none",
      repeat: -1,
      delay: delay,
    }
  );
};

export const createScrollAnimation = (element, animation, options = {}) => {
  if (!element) return;

  return gsap.fromTo(element, animation.from, {
    ...animation.to,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options,
    },
  });
};

export const createPulseAnimation = (element, scale = 1.1, duration = 1) => {
  if (!element) return;

  return gsap.to(element, {
    scale: scale,
    duration: duration,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  });
};

export const createTypingAnimation = (element, text, speed = 0.05) => {
  if (!element) return;

  return gsap.to(element, {
    text: text,
    duration: text.length * speed,
    ease: "none",
  });
};

export const createCounterAnimation = (
  element,
  from = 0,
  to = 100,
  duration = 2
) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    {
      innerHTML: from,
    },
    {
      innerHTML: to,
      duration: duration,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      onUpdate: function () {
        element.innerHTML = Math.ceil(this.targets()[0].innerHTML);
      },
    }
  );
};

export default {
  animationPresets,
  animateElement,
  animateElements,
  createHoverAnimation,
  animateButtonClick,
  pageTransition,
  createShimmerEffect,
  createScrollAnimation,
  createPulseAnimation,
  createTypingAnimation,
  createCounterAnimation,
};
