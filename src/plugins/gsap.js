import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default {
  install(app) {
    app.config.globalProperties.$gsap = gsap;
    app.provide("gsap", gsap);
  },
};

export { gsap, ScrollTrigger, TextPlugin };
