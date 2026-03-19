/**
 * Ambient types for gsap-trial plugins (SplitText, ScrollSmoother).
 * The npm package ships JS without bundled .d.ts files; CI runs `tsc -b` which requires these.
 */
declare module "gsap-trial/SplitText" {
  import type { gsap } from "gsap";

  export class SplitText {
    constructor(target: gsap.TweenTarget, vars?: Record<string, unknown>);
    chars: Element[];
    words: Element[];
    lines: Element[];
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  import type { gsap } from "gsap";

  export class ScrollSmoother {
    static create(vars?: Record<string, unknown>): ScrollSmoother;
    static refresh(force?: boolean): void;
    scrollTop(value: number): void;
    paused(state: boolean): void;
    refresh(force?: boolean): void;
    scrollTo(
      target: string | Element,
      smooth?: boolean,
      position?: string
    ): void;
  }
}
