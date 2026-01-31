import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "More Nutrition - Matcha meets Protein",
  description:
    "Discover the More Nutrition Iced Matcha Latte in a whole new way: 20 g protein, 85 mg caffeine, 95% less sugar, refreshing, light and full of flavor.",
  icons: {
    icon: "https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689b29bd3caff6492c34a95c_More-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Webflow Base CSS */}
        <link
          href="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/css/more-nutrition.shared.e35377ec8.min.css"
          rel="stylesheet"
          type="text/css"
        />

        {/* Main project CSS from public folder */}
        <link href="/styles/main.css" rel="stylesheet" type="text/css" />

        {/* GSAP and plugins from CDN */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"
          strategy="beforeInteractive"
        />

        {/* SplitText polyfill */}
        <Script id="splittext-polyfill" strategy="beforeInteractive">
          {`
            window.SplitText = class SplitText {
              constructor(element, options = {}) {
                this.element = typeof element === 'string' ? document.querySelector(element) : element;
                this.options = options;
                this.words = [];
                this.lines = [];
                this.chars = [];

                if (this.element) {
                  this.split();
                }
              }

              static create(element, options) {
                return new SplitText(element, options);
              }

              split() {
                const text = this.element.textContent || '';
                const type = this.options.type || 'words';

                this.originalHTML = this.element.innerHTML;

                if (type.includes('words') || type.includes('lines')) {
                  const words = text.trim().split(/\\s+/);
                  const wordsClass = this.options.wordsClass || 'split-word';
                  const linesClass = this.options.linesClass || 'split-line';

                  this.element.innerHTML = words.map(word =>
                    \`<span class="\${wordsClass}" style="display: inline-block;">\${word}</span>\`
                  ).join(' ');

                  this.words = Array.from(this.element.querySelectorAll('.' + wordsClass));

                  if (type.includes('lines')) {
                    const wrapper = document.createElement('span');
                    wrapper.className = linesClass;
                    wrapper.style.display = 'block';
                    while (this.element.firstChild) {
                      wrapper.appendChild(this.element.firstChild);
                    }
                    this.element.appendChild(wrapper);
                    this.lines = [wrapper];
                  }
                }

                if (type.includes('chars')) {
                  const chars = text.split('');
                  const charsClass = this.options.charsClass || 'split-char';
                  this.element.innerHTML = chars.map(char =>
                    char === ' ' ? ' ' : \`<span class="\${charsClass}" style="display: inline-block;">\${char}</span>\`
                  ).join('');
                  this.chars = Array.from(this.element.querySelectorAll('.' + charsClass));
                }
              }

              revert() {
                if (this.originalHTML) {
                  this.element.innerHTML = this.originalHTML;
                }
              }
            };

            if (window.gsap) {
              gsap.registerPlugin(SplitText);
            }
          `}
        </Script>

        {/* DrawSVG polyfill */}
        <Script id="drawsvg-polyfill" strategy="beforeInteractive">
          {`
            if (window.gsap) {
              gsap.registerPlugin({
                name: "drawSVG",
                init(target, value) {
                  if (target.tagName === 'path' || target.tagName === 'line' || target.tagName === 'circle' || target.tagName === 'ellipse' || target.tagName === 'rect' || target.tagName === 'polygon' || target.tagName === 'polyline') {
                    const length = target.getTotalLength ? target.getTotalLength() : 100;
                    target.style.strokeDasharray = length;

                    let start = 0, end = length;
                    if (typeof value === 'string') {
                      const match = value.match(/(\\d+)%?\\s*(\\d+)?%?/);
                      if (match) {
                        start = (parseFloat(match[1]) / 100) * length;
                        end = match[2] ? (parseFloat(match[2]) / 100) * length : length;
                      }
                    }

                    this.target = target;
                    this.length = length;
                    this.startOffset = length - start;
                    this.endOffset = length - end;
                  }
                  return true;
                },
                render(progress) {
                  if (this.target) {
                    const offset = this.startOffset + (this.endOffset - this.startOffset) * progress;
                    this.target.style.strokeDashoffset = offset;
                  }
                }
              });
            }
          `}
        </Script>

        {/* Webflow modifier classes */}
        <Script id="webflow-classes" strategy="beforeInteractive">
          {`
            (function (o, c) {
              var n = c.documentElement,
                t = " w-mod-";
              n.className += t + "js";
              if ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) {
                n.className += t + "touch";
              }
            })(window, document);
          `}
        </Script>
      </head>
      <body className="body">
        {children}
        {/* Fallback scripts to ensure page loads */}
        <Script id="fallback-loader" strategy="afterInteractive">
          {`
            // Fallback: Force hide loader and enable scrolling after 4 seconds
            setTimeout(function () {
              if (!document.documentElement.classList.contains('is-ready')) {
                console.log('Fallback: Forcing loader to hide and enabling scroll');
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
              }
              document.documentElement.classList.remove('lenis-stopped');
              document.body.classList.remove('lenis-stopped');
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';

              if (window.lenis) {
                window.lenis.start();
              }
            }, 4000);

            setTimeout(function () {
              if (document.documentElement.classList.contains('lenis-stopped')) {
                document.documentElement.classList.remove('lenis', 'lenis-stopped');
                document.body.classList.remove('lenis', 'lenis-stopped');
                console.log('Forced native scroll mode');
              }
            }, 6000);

            window.onerror = function (msg, url, lineNo, columnNo, error) {
              console.error('Error caught, enabling scroll fallback:', msg);
              document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
              document.documentElement.classList.remove('lenis-stopped');
              document.body.classList.remove('lenis-stopped');
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';
              return false;
            };
          `}
        </Script>
      </body>
    </html>
  );
}
