import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

// Some environments may not have ScrollSmoother bundled/available.
// Guard plugin registration so the app still renders instead of going black-screen.
try {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
} catch (e) {
  console.error("GSAP ScrollSmoother registration failed:", e);
}
export let smoother: ScrollSmoother | undefined;

const Navbar = () => {
  useEffect(() => {
    try {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      smoother.scrollTop(0);
      smoother.paused(true);
    } catch (e) {
      // If ScrollSmoother fails to init, keep the site usable.
      console.error("ScrollSmoother init failed. Falling back to default scroll:", e);
      smoother = undefined;
      document.body.style.overflowY = "auto";
    }

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (smoother && section) {
            smoother.scrollTo(section, true, "top top");
          } else if (section) {
            document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      try {
        ScrollSmoother.refresh(true);
      } catch {
        // ignore
      }
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          HS
        </a>
        <a
          href="mailto:3690.hetshah2002official@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          3690.hetshah2002official@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
