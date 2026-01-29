import React from 'react'
import { useAnimations } from './hooks/useAnimations'

// This component renders the exact HTML structure from the original website
// All GSAP animations are implemented natively in React using custom hooks
// No external scripts are fetched - everything is self-contained

const App: React.FC = () => {
  // Initialize all animations (Lenis, GSAP, Swiper, etc.)
  useAnimations();

  return (
    <>
      {/* Loader - will be hidden once animations are ready */}
      <div className="loader"></div>

      {/* Global CSS embed */}
      <div className="global-css">
        <div className="w-embed"></div>
      </div>

      {/* Navbar */}
      <div data-load-nav="" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
        <div className="nav-container">
          <div className="grid-layout">
            <div id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c28c-4811c289" className="nav-social-media-inner">
              <a href="https://www.instagram.com/morenutrition.de/" target="_blank" rel="noreferrer" className="social-media-link w-inline-block">
                <div className="social-media-circle">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688651ae6f6e0e5669c9d465_instagram.svg" loading="eager" width="24" height="24" alt="Instagram" className="social-media-icon" />
                </div>
              </a>
              <a href="https://www.tiktok.com/@morenutrition.de?lang=de-DE" target="_blank" rel="noreferrer" className="social-media-link w-inline-block">
                <div className="social-media-circle">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688651aeea8f52f9e4d418f2_tiktok.svg" loading="eager" width="24" height="24" alt="TikTok" className="social-media-icon" />
                </div>
              </a>
              <a href="https://www.youtube.com/@more_nutrition" target="_blank" rel="noreferrer" className="social-media-link w-inline-block">
                <div className="social-media-circle">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68d40d4b080c864fb3ec6e0f_youtube-svgrepo-com.svg" loading="eager" width="24" height="24" alt="youtube" className="social-media-icon" />
                </div>
              </a>
            </div>
            <div id="w-node-_084a53a4-1315-9fde-31ee-e99a4811c293-4811c289" className="nav-link-inner">
              <a href="#nutrition" className="nav-link w-inline-block">
                <div className="nav-text">Nutrition</div>
              </a>
              <a href="#benefits" className="nav-link w-inline-block">
                <div className="nav-text">Benefits</div>
              </a>
              <a href="#reviews" className="nav-link w-inline-block">
                <div className="nav-text">Reviews</div>
              </a>
            </div>
            <a id="w-node-c4e2d712-b9aa-e56d-102b-73576293bdd9-4811c289" href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte?country=GB" target="_blank" rel="noreferrer" className="button is-white w-inline-block">
              <div className="button-cycle is-first">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                  <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                </svg>
                <div className="button-cycle-bg white-bg"></div>
              </div>
              <div className="button-bg white-bg">
                <div className="button-text dark-font">Shop all</div>
              </div>
              <div className="button-cycle is-second">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                  <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                </svg>
                <div className="button-cycle-bg white-bg"></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Stage Section */}
        <section data-load-stage="" data-inertia="" className="stage">
          <div className="stage-overlay"></div>
          <div className="stage-container">
            <div className="stage-inner">
              <div className="stage-content">
                <div className="stage-logo">
                  {/* @ts-ignore - lottie-player is a custom web component */}
                  <lottie-player
                    src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bf4595ca06155170fa0b3f_fee5b51503049a55da64bfd6a8ed744f_more-logo-animation.json"
                    background="transparent"
                    speed="1"
                    data-load-stage-logo-lottie=""
                    data-load-stage-logo=""
                    className="stage-logo-svg"
                  />
                </div>
                <div data-load-stage-cta="" className="stage-cta">
                  <a href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte?country=GB" target="_blank" rel="noreferrer" className="button w-inline-block">
                    <div className="button-cycle is-first">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                        <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                      </svg>
                      <div className="button-cycle-bg"></div>
                    </div>
                    <div className="button-bg">
                      <div className="button-text">Buy now</div>
                    </div>
                    <div className="button-cycle is-second">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                        <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                      </svg>
                      <div className="button-cycle-bg"></div>
                    </div>
                  </a>
                </div>
                <div className="stage-wrap">
                  <div className="stage-left">
                    <div className="stage-deco">
                      <div data-load-stage-deco-text="" style={{ '--animation-delay': '.05s' } as React.CSSProperties} className="stage-deco-text-wrap">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68d41a7021c95a7f4ce8cd14_4bb0c9727f3cc3cf72d4fe155fa50163_Real%20Matcha%2C%20Origin%20al%20Taste.svg" loading="lazy" width="300" height="112" alt="Real Matcha, Origin al Taste" className="stage-deco-text" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68d41a7021c95a7f4ce8cd14_4bb0c9727f3cc3cf72d4fe155fa50163_Real%20Matcha%2C%20Origin%20al%20Taste.svg" loading="eager" width="300" height="112" alt="Real Matcha, Origin al Taste" className="stage-deco-text is-wiggle" />
                      </div>
                      <div data-load-stage-deco-arrow="" style={{ '--animation-delay': '.15s' } as React.CSSProperties} className="stage-deco-arrow-wrap">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68a9a089d73e5cf84d4ded67_stage-sketch-arrow.svg" loading="eager" width="150" height="150" alt="stage-sketch-arrow" className="stage-deco-arrow" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68a9a089d73e5cf84d4ded67_stage-sketch-arrow.svg" loading="eager" width="150" height="150" alt="stage-sketch-arrow" className="stage-deco-arrow is-wiggle" />
                      </div>
                    </div>
                    <div data-load-stage-visual="" className="stage-visual">
                      <canvas data-load-stage-canvas-img-path="/img/" data-load-stage-canvas="" className="stage-canvas"></canvas>
                    </div>
                    <div className="stage-facts">
                      <div data-inertia-item="" className="stage-fact-outer">
                        <div data-load-stage-fact="" data-inertia-item-child="" className="stage-fact is-first">
                          <div className="stage-fact-wrap">
                            <div className="stage-fact-number">80</div>
                            <div className="stage-fact-unit">mg</div>
                          </div>
                          <div className="stage-fact-text">caffeine</div>
                        </div>
                      </div>
                      <div data-inertia-item="" className="stage-fact-outer">
                        <div data-load-stage-fact="" data-inertia-item-child="" className="stage-fact is-second">
                          <div className="stage-fact-wrap">
                            <div className="stage-fact-number">5</div>
                            <div className="stage-fact-unit">g</div>
                          </div>
                          <div className="stage-fact-text">of Sugar</div>
                        </div>
                      </div>
                      <div data-inertia-item="" className="stage-fact-outer">
                        <div data-load-stage-fact="" data-inertia-item-child="" className="stage-fact is-third">
                          <div className="stage-fact-wrap">
                            <div className="stage-fact-number">200</div>
                            <div className="stage-fact-unit">mg</div>
                          </div>
                          <div className="stage-fact-text">of electrolytes</div>
                        </div>
                      </div>
                    </div>
                    <div className="stage-bg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 731 818" fill="none" data-load-stage-svg="" className="stage-bg-svg">
                        <path d="M542.941 42.7702C707.951 122.986 766.918 351.375 667.592 555.698C568.265 760.021 352.233 854.727 187.223 774.512C22.2122 694.296 -36.7556 465.905 62.5711 261.582C161.898 57.2593 377.93 -37.4456 542.941 42.7702Z" stroke="currentColor" strokeWidth="28"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="stage-right">
                    <div className="stage-text-wrap">
                      <h1 data-load-stage-title="" className="hero-heading">
                        <span className="white-span">Matcha meets…</span><br />Sri Lankanized<br />Energy Drink
                      </h1>
                      <div className="stage-paragraph-wrap">
                        <p data-load-stage-text="" className="paragraph is-stage-paragraph">
                          For the dreamers. Rule Breakers. Do-ers. More than just a caffeine kick. Infused with flavour and a rebellious spirit.
                        </p>
                        <div data-load-stage-underline="" style={{ '--animation-delay': '.2s' } as React.CSSProperties} className="stage-subline-wrap">
                          <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688655fd2fed5f707c038914_Layer_1%20(3).svg" loading="eager" width="152" height="42" alt="Underline" className="subline-img" />
                          <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688655fd2fed5f707c038914_Layer_1%20(3).svg" loading="eager" width="152" height="42" alt="Underline" className="subline-img is-wiggle" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div data-marquee="" className="marquee">
            <div className="marquee-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 442" width="100%" style={{ overflow: 'visible' }} className="marquee-bg-svg">
                <path stroke="currentColor" strokeWidth="160" d="M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 293" width="100%" style={{ overflow: 'visible' }} data-marquee-svg="" className="marquee-text-svg">
                <path d="M-68 300C173 173 515.5 1 937.2 1 1254.5 1 1468 183.3 1543 246.9" id="curve"></path>
                <text width="100%" style={{ transform: 'translate3d(0,0,0)' }}>
                  <textPath style={{ transform: 'translate3d(0,0,0)' }} alignmentBaseline="text-before-edge" href="#curve" startOffset="-30%">
                    Let's Get Bam'ed · Let's Get Bam'ed · Let's Get Bam'ed
                  </textPath>
                </text>
              </svg>
              <div className="marquee-overlay"></div>
            </div>
          </div>
        </section>

        {/* Insider Section */}
        <div data-inertia="" className="insider-section">
          <div className="insider-container">
            <div className="grid-layout">
              <h2 id="w-node-_3e09cbcc-bb63-d8d5-fc92-5249d862c0ff-0ac01850" className="insider-heading">
                Sri Lankanized<br /><span className="light-green-span">Taste that's out of this world</span><br />Energy to conquer the day<br />Sri-Lankanized just for you
              </h2>
              <div id="w-node-e1fee9ee-097a-d41e-6a8c-8fb81a411381-0ac01850" className="insider-wrapper">
                <div id="w-node-_93a09ee3-b180-b755-d23e-d7d2b5f676da-0ac01850" className="testimonial-wrapper">
                  <div data-inertia-item="" className="testimonial-inner-wrap is-first">
                    <div data-inertia-item-child="" className="testimonial-inner _1">
                      <div className="testimonial-media w-embed">
                        <video playsInline loop muted data-video="">
                          <source src="https://www.dl.dropboxusercontent.com/scl/fi/sn5g0ke38hntd7qchzhn3/SnapInsta.to_AQO-6-wc7kGZhVWDEZdicSozaqoIGuwQNnyqUly6BQNAyHcK97qvkSA6nEpLa8FL7KCmUoUDdz_a4LW2v49v8UhQxv0XijkRGobU6Io.mp4?rlkey=tip5d5fx1nr0sbeegogs83i3a&st=xphiyn1m&dl=0" />
                        </video>
                      </div>
                      <button type="button" data-video-button="" aria-label="Sound on/off" className="testimonial-sound-btn is-top">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-first">
                          <path fill="currentColor" d="M10.5 2v12a.5.5 0 0 1-.807.394L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.828l4.365-3.394A.5.5 0 0 1 10.5 2Zm2 4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5Zm2-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-second">
                          <path fill="currentColor" d="M13.87 13.164a.5.5 0 1 1-.74.672l-2.63-2.893v3.038a.518.518 0 0 1-.244.448.5.5 0 0 1-.563-.035L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.597L3.13 2.836a.5.5 0 0 1 .74-.672l10 11ZM12.533 10A.51.51 0 0 0 13 9.484V6.517A.51.51 0 0 0 12.533 6a.5.5 0 0 0-.533.5v3a.499.499 0 0 0 .533.5Zm-2.47-2.508a.25.25 0 0 0 .437-.169V2.015a.515.515 0 0 0-.18-.4.5.5 0 0 0-.625-.01L6.989 3.709a.25.25 0 0 0-.03.366l3.104 3.418ZM14.466 5a.51.51 0 0 0-.467.517v4.966a.51.51 0 0 0 .467.516.498.498 0 0 0 .533-.5V5.5a.499.499 0 0 0-.533-.5Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div data-inertia-item="" id="w-node-_72dd306a-13a2-73bb-8c1c-84b760924bbc-0ac01850" className="testimonial-inner-wrap is-second">
                    <div data-inertia-item-child="" className="testimonial-inner _2">
                      <div className="testimonial-media w-embed">
                        <video playsInline loop muted data-video="">
                          <source src="https://www.dl.dropboxusercontent.com/scl/fi/vzjyqfr7i098s1e4f35fx/SnapInsta.to_AQN4zwHLLGQzUTUU7rkiWCayhvMlcD579UzW7eIdHgcwvbEXgqqX8JMZkSiqALpLD_bigNDJwwg7Geal33Ocpjl7VEbT4P2VvF-qIzo.mp4?rlkey=13n2hsdztyjfay5542poch07u&st=di2y9e7y&dl=0" />
                        </video>
                      </div>
                      <button type="button" data-video-button="" aria-label="Sound on/off" className="testimonial-sound-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-first">
                          <path fill="currentColor" d="M10.5 2v12a.5.5 0 0 1-.807.394L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.828l4.365-3.394A.5.5 0 0 1 10.5 2Zm2 4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5Zm2-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-second">
                          <path fill="currentColor" d="M13.87 13.164a.5.5 0 1 1-.74.672l-2.63-2.893v3.038a.518.518 0 0 1-.244.448.5.5 0 0 1-.563-.035L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.597L3.13 2.836a.5.5 0 0 1 .74-.672l10 11ZM12.533 10A.51.51 0 0 0 13 9.484V6.517A.51.51 0 0 0 12.533 6a.5.5 0 0 0-.533.5v3a.499.499 0 0 0 .533.5Zm-2.47-2.508a.25.25 0 0 0 .437-.169V2.015a.515.515 0 0 0-.18-.4.5.5 0 0 0-.625-.01L6.989 3.709a.25.25 0 0 0-.03.366l3.104 3.418ZM14.466 5a.51.51 0 0 0-.467.517v4.966a.51.51 0 0 0 .467.516.498.498 0 0 0 .533-.5V5.5a.499.499 0 0 0-.533-.5Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div data-inertia-item="" id="w-node-_4a36f3f0-5bbd-c32e-0ae6-c281e3e49136-0ac01850" className="testimonial-inner-wrap is-third">
                    <div data-inertia-item-child="" className="testimonial-inner _3">
                      <div className="testimonial-media w-embed">
                        <video playsInline loop muted data-video="">
                          <source src="https://www.dl.dropboxusercontent.com/scl/fi/ccn1egi3ikhsytqhbfwsf/SnapInsta.to_AQMqh_lTfkPamg2Oj4zR5IUuybxe2H0drgz6Q3qUpgoxPo_ITsqHGGRXaA0tU8cn22XVNo6eJ6_jLGfS0eVkEWLwpgjarC1GYIj9qMI.mp4?rlkey=o6zx1vqe0g584o8pwb12e8ju3&st=yfiuwnbo&dl=0" />
                        </video>
                      </div>
                      <button type="button" data-video-button="" aria-label="Sound on/off" className="testimonial-sound-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-first">
                          <path fill="currentColor" d="M10.5 2v12a.5.5 0 0 1-.807.394L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.828l4.365-3.394A.5.5 0 0 1 10.5 2Zm2 4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5Zm2-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-second">
                          <path fill="currentColor" d="M13.87 13.164a.5.5 0 1 1-.74.672l-2.63-2.893v3.038a.518.518 0 0 1-.244.448.5.5 0 0 1-.563-.035L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.597L3.13 2.836a.5.5 0 0 1 .74-.672l10 11ZM12.533 10A.51.51 0 0 0 13 9.484V6.517A.51.51 0 0 0 12.533 6a.5.5 0 0 0-.533.5v3a.499.499 0 0 0 .533.5Zm-2.47-2.508a.25.25 0 0 0 .437-.169V2.015a.515.515 0 0 0-.18-.4.5.5 0 0 0-.625-.01L6.989 3.709a.25.25 0 0 0-.03.366l3.104 3.418ZM14.466 5a.51.51 0 0 0-.467.517v4.966a.51.51 0 0 0 .467.516.498.498 0 0 0 .533-.5V5.5a.499.499 0 0 0-.533-.5Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div id="w-node-_1ac78251-f73b-1f50-5984-75b855ef30eb-0ac01850" className="insider-text-inner">
                  <h3 className="insider-subheading">Taste as Bold as Your Ambitions</h3>
                  <p className="paragraph">Hype Bam is more than just an energy drink; it's a symbol of Sri Lankan resilience. We've faced countless challenges, yet we rise stronger every time. We defy the odds, push boundaries, and keep moving forward…and that's the spirit we've infused into every can.</p>
                  <div className="insider-cta">
                    <a href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte?country=GB" target="_blank" rel="noreferrer" className="button w-inline-block">
                      <div className="button-cycle is-first">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                          <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                        </svg>
                        <div className="button-cycle-bg"></div>
                      </div>
                      <div className="button-bg">
                        <div className="button-text">Buy now</div>
                      </div>
                      <div className="button-cycle is-second">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                          <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                        </svg>
                        <div className="button-cycle-bg"></div>
                      </div>
                    </a>
                    <div className="rating-inner">
                      <a href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte?country=GB" target="_blank" rel="noreferrer" className="rating-link w-inline-block">
                        <div className="rating-star-wrap">
                          <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68ae178a6c618dbc4bb25c48_icon-star.svg" loading="lazy" width="20" height="20" alt="icon-star" className="rating-star" />
                          <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68ae178a6c618dbc4bb25c48_icon-star.svg" loading="lazy" width="20" height="20" alt="icon-star" className="rating-star" />
                          <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68ae178a6c618dbc4bb25c48_icon-star.svg" loading="lazy" width="20" height="20" alt="icon-star" className="rating-star" />
                          <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68ae178a6c618dbc4bb25c48_icon-star.svg" loading="lazy" width="20" height="20" alt="icon-star" className="rating-star" />
                          <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68ae178a30a512b269607fbe_icon-star-half.svg" loading="lazy" width="20" height="20" alt="icon-star" className="rating-star" />
                        </div>
                        <div className="rating-text-wrap">
                          <div className="rating-text">3158 Reviews</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sequence Section */}
        <div id="nutrition" data-sequence="" className="sequence-section">
          <div className="sequence-signature">
            <div className="sequence-signature-text">
              <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bf0b05111fd229e95c_sequence-why-people-love-it.svg" loading="lazy" width="300" height="104" alt="sequence-why-people-love-it" className="sequence-signature-text-img" />
              <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bf0b05111fd229e95c_sequence-why-people-love-it.svg" loading="lazy" width="300" height="104" alt="sequence-why-people-love-it" className="sequence-signature-text-img is-wiggle" />
            </div>
            <div className="sequence-signature-arrow">
              <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bfdc8daf0458376a72_sequence-why-people-arrow.svg" loading="lazy" width="150" height="150" alt="sequence-why-people-arrow" className="sequence-signature-arrow-img" />
              <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bfdc8daf0458376a72_sequence-why-people-arrow.svg" loading="lazy" width="150" height="150" alt="sequence-why-people-arrow" className="sequence-signature-arrow-img is-wiggle" />
            </div>
          </div>
          <div data-sequence-trigger="" className="sequence-scroll-wrap">
            <div data-sequence-stage="" className="sequence-sticky">
              <canvas data-sequence-canvas-img-path="/img/" data-sequence-canvas="" className="sequence-canvas"></canvas>
              <div className="sequence-cards">
                {/* Statement Card 1 */}
                <div data-sequence-card="" id="w-node-_2b1d1553-2e40-4f8e-6012-8b41219152b8-0ac01850" className="statement-card is-first">
                  <div className="statement-card-wrapper">
                    <div data-sequence-smiley="" className="top-smiley is-card">
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689534f1390e42ee1492e9df_Group%2042.svg" loading="lazy" alt="Smiley" />
                    </div>
                    <h2 className="statement-heading">Energy that<br />hits just right</h2>
                    <div className="statement-card-paragraph-wrap">
                      <div className="first-statement-icon">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689bbc7e54e7ae27ef30fe2a_Layer_1%20(7).svg" loading="lazy" alt="Circle" className="first-statement-icon-img" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689bbc7e54e7ae27ef30fe2a_Layer_1%20(7).svg" loading="lazy" alt="Circle" className="first-statement-icon-img is-wiggle" />
                      </div>
                      <p className="paragraph center-align">80mg of caffeine - feels like a cup of coffee,<br />blended with taurine &amp; ashwagandha for<br />smooth focus and calm energy.</p>
                    </div>
                  </div>
                </div>
                {/* Statement Card 2 */}
                <div data-sequence-card-left="" data-sequence-card="" id="w-node-b2188393-b808-fcc5-146f-a5ea982f9c7e-0ac01850" className="statement-card is-second">
                  <div className="statement-card-wrapper left">
                    <div data-sequence-smiley-left="" data-sequence-smiley="" className="top-smiley is-card">
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689534f1390e42ee1492e9df_Group%2042.svg" loading="lazy" alt="Smiley" />
                    </div>
                    <h2 className="statement-heading">Hydration,<br />done right</h2>
                    <div className="statement-card-paragraph-wrap">
                      <div className="second-icon">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4dc54e2bba0f8a77b238_Layer_1%20(9).svg" loading="lazy" alt="Thunder" className="second-icon-img" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4dc54e2bba0f8a77b238_Layer_1%20(9).svg" loading="lazy" alt="Thunder" className="second-icon-img is-wiggle" />
                      </div>
                      <p className="paragraph center-align">200mg of electrolytes to help you<br />stay balanced, refreshed,<br />and moving.</p>
                    </div>
                  </div>
                </div>
                {/* Statement Card 3 */}
                <div data-sequence-card="" className="statement-card is-third">
                  <div className="statement-card-wrapper">
                    <div data-sequence-smiley="" className="top-smiley is-card">
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689534f1390e42ee1492e9df_Group%2042.svg" loading="lazy" alt="Smiley" />
                    </div>
                    <h2 className="statement-heading">Sweetness,<br />kept light</h2>
                    <div className="statement-card-paragraph-wrap">
                      <div className="third-statement-icon">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4ee13616a5bb6e89d831_Vector%20(6).svg" loading="lazy" alt="Arrow" className="third-statement-icon-img" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4ee13616a5bb6e89d831_Vector%20(6).svg" loading="lazy" alt="Arrow" className="third-statement-icon-img is-wiggle" />
                      </div>
                      <p className="paragraph center-align">Just 5g of sugar per serving -<br />clean energy, no guilt attached.</p>
                    </div>
                  </div>
                </div>
                {/* Statement Card 4 */}
                <div data-sequence-card-left="" data-sequence-card="" id="w-node-e73f88c6-bfeb-1639-4b8f-4b8fdd41da6c-0ac01850" className="statement-card is-fourth">
                  <div className="statement-card-wrapper left">
                    <div data-sequence-smiley-left="" data-sequence-smiley="" className="top-smiley is-card">
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689534f1390e42ee1492e9df_Group%2042.svg" loading="lazy" alt="Smiley" />
                    </div>
                    <h2 className="statement-heading">Sri Lankanized</h2>
                    <div className="statement-card-paragraph-wrap">
                      <div className="fourth-statement-icon">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4f47af9547f0f5223089_Vector%20(7).svg" loading="lazy" alt="Circle" className="fourth-statement-icon-img" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4f47af9547f0f5223089_Vector%20(7).svg" loading="lazy" alt="Circle" className="fourth-statement-icon-img is-wiggle" />
                      </div>
                      <p className="paragraph center-align">5 Flavours to make you go 'aaaahhh'</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sequence Final */}
              <div className="sequence-final">
                <h2 data-sequence-title="" className="sequence-title">
                  Fuel The Rebel<br /><span data-sequence-title-split="" className="light-green-span">Let's Get Bam'ed</span><br />
                </h2>
                <div style={{ '--animation-delay': '.05s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="sequence-vanilla-crumble" className="sequence-final-signature-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="sequence-vanilla-crumble" className="sequence-final-signature-img is-wiggle" />
                </div>
                <div data-sequence-final-signature="" className="sequence-final-signature is-first-arrow">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="sequence-vanilla-crumble-arrow" className="sequence-final-signature-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="sequence-vanilla-crumble-arrow" className="sequence-final-signature-img is-wiggle" />
                </div>
                <div style={{ '--animation-delay': '.075s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature is-second">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="sequence-strawberry-cheesecake" className="sequence-final-signature-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="sequence-strawberry-cheesecake" className="sequence-final-signature-img is-wiggle" />
                </div>
                <div style={{ '--animation-delay': '.025s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature is-second-arrow">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="sequence-strawberry-cheesecake-arrow" className="sequence-final-signature-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="sequence-strawberry-cheesecake-arrow" className="sequence-final-signature-img is-wiggle" />
                </div>
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a04860444181393aa_sequence-cookie.webp" loading="lazy" width="340" height="344" alt="sequence-cookie" data-sequence-cookie-first="" className="sequence-final-cookie" />
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a04860444181393aa_sequence-cookie.webp" loading="lazy" width="340" height="344" alt="sequence-cookie" data-sequence-cookie-second="" className="sequence-final-cookie is-second" />
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a1333de45c53ee927_sequence-strawberry.webp" loading="lazy" width="594" height="594" alt="sequence-strawberry" data-sequence-strawberry-first="" className="sequence-final-strawberry" />
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a1333de45c53ee927_sequence-strawberry.webp" loading="lazy" width="594" height="594" alt="sequence-strawberry" data-sequence-strawberry-second="" className="sequence-final-strawberry is-second" />
              </div>
              {/* Sequence Lines */}
              <div className="sequence-lines">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 691" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-first">
                  <path d="M-11 627.781C31.2318 652.606 151.814 698.642 199.05 645.884C264.5 572.781 199.05 472.107 47.547 363.054C-103.956 254 -52.529 150.083 24.5115 108.595C210.583 8.39218 434.763 502.251 720.049 329.362C981.436 170.957 1134 -69.7188 1490 2.78121" stroke="currentColor" strokeWidth="40"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 682" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-second">
                  <path d="M1442.05 19.9995C1346.05 34.4995 1170.99 110.452 1098.05 191.999C975.047 329.499 1257.15 515.709 1159 626.498C1027 775.498 571.87 408.445 484.498 347.293C244.047 178.999 15 -12.5016 -102 87.9984" stroke="currentColor" strokeWidth="40"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 750" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-third">
                  <path d="M-918.224 5.00043C-948.225 142 -730.728 264 -473.726 252.501C-271.374 243.446 29.7721 170.716 170.275 135.501C1143.77 -108.499 460.741 462.659 570.773 634.5C651.773 761 1056.77 396 1392.27 396C1513.27 396 1835.87 454.857 2022.77 607.501C2178.27 734.5 2312.44 743.001 2363.77 718.001" stroke="currentColor" strokeWidth="40"></path>
                </svg>
                <div data-sequence-signature="" className="sequence-inner-signature">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9fcc383366c0bb0fe9ca6_sequence-more-for-coffee-lovers.svg" loading="lazy" width="300" height="132" alt="sequence-more-for-coffee-lovers" className="sequence-inner-signature-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9fcc383366c0bb0fe9ca6_sequence-more-for-coffee-lovers.svg" loading="lazy" width="300" height="132" alt="sequence-more-for-coffee-lovers" className="sequence-inner-signature-img is-wiggle" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="benefit-section">
          <div data-smiley="" className="top-smiley is-benefit">
            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689534f1390e42ee1492e9df_Group%2042.svg" loading="lazy" alt="Smiley" />
          </div>
          <div className="container smaller">
            <div className="grid-layout">
              <div id="w-node-_6f3e86b5-5cf7-4a62-19af-d6d71a8517d6-0ac01850" className="img-wrapper">
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953da4d0d5f048beedcb6e_4d640528cda9b637c74a05194f165bad1f5131c0.webp" loading="lazy" alt="Iced Matcha Latte - More Nutrition" className="top-img" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 575 559" width="100%" data-fill-line="" className="benefit-svg">
                  <path stroke="currentColor" strokeWidth="27" d="M-56.447 495.508C-26.61 513.052 53.628 569.352 87 532.069c46.24-51.66 4.952-146.571-102.084-223.636-107.035-77.065-70.703-150.5-16.274-179.818C100.1 57.804 196.947 412.744 398.5 290.569 583.168 178.628 665-36.931 945 24.953"></path>
                </svg>
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953755a9a7a338f1c66af8_2bc96c5443dd740a3309d483ae39d3da60cc7e2c.webp" loading="lazy" alt="Iced Matcha Latte - More Nutrition" className="img" />
              </div>
              <div id="w-node-_32be253f-aa6e-8103-6d3f-40e63162832f-0ac01850" className="benefit-wrapper">
                <h2 className="benefit-heading"><span data-highlight-text="" className="light-green-span">What you get.</span><br />Hype Bam vs Typical Energy Drinks</h2>
                <div data-benefit-table="" className="benefit-table">
                  <div id="w-node-_244ca70f-4fb8-4324-7d1f-6e5cebd97f1e-0ac01850" className="benefit-table-title-wrapper">
                    <div id="w-node-da33aad3-e9be-fd6f-a8b0-79237ed37994-0ac01850" className="benefit-table-title">Benefits</div>
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/687ea845b6162b993ddd0020_Group%201%20(1).svg" loading="lazy" id="w-node-d5a0031d-8b6e-5d4a-5e75-e26d1c40acd5-0ac01850" alt="Hype Bam Logo" className="benefit-table-title-img is-desktop" />
                    <div className="benefit-table-title is-mobile-only">Hype Bam</div>
                    <div id="w-node-_78d70ec8-c380-1f74-9296-fa312e5af0f4-0ac01850" className="benefit-table-title">Typical Energy Drinks</div>
                  </div>
                  <div data-benefit-table-line="" id="w-node-dabaf014-7b8f-d5cf-7507-3b9733e65ad8-0ac01850" className="sub-line"></div>
                  <div id="w-node-_89929daf-28b9-a774-1cdd-9d54c6ee4049-0ac01850" className="benefit-item-wrapper">
                    <div className="benefit-table-item">
                      <div className="benefit-item-title">Coffee-level caffeine (80mg)</div>
                      <div className="benefit-checker-inner">
                        <div className="benefit-item-check"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" /></div>
                        <div className="benefit-item-x"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" /></div>
                      </div>
                    </div>
                    <div data-benefit-table-line="" className="line"></div>
                    <div className="benefit-table-item">
                      <div className="benefit-item-title">Lower sugar content</div>
                      <div className="benefit-checker-inner">
                        <div className="benefit-item-check"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" /></div>
                        <div className="benefit-item-x"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" /></div>
                      </div>
                    </div>
                    <div data-benefit-table-line="" className="line"></div>
                    <div className="benefit-table-item">
                      <div className="benefit-item-title">Added electrolytes</div>
                      <div className="benefit-checker-inner">
                        <div className="benefit-item-check"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" /></div>
                        <div className="benefit-item-x"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" /></div>
                      </div>
                    </div>
                    <div data-benefit-table-line="" className="line"></div>
                    <div className="benefit-table-item">
                      <div className="benefit-item-title">Hydration support</div>
                      <div className="benefit-checker-inner">
                        <div className="benefit-item-check"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" /></div>
                        <div className="benefit-item-x"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" /></div>
                      </div>
                    </div>
                    <div data-benefit-table-line="" className="line"></div>
                    <div className="benefit-table-item">
                      <div className="benefit-item-title">Functional ingredients</div>
                      <div className="benefit-checker-inner">
                        <div className="benefit-item-check"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" /></div>
                        <div className="benefit-item-x"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" /></div>
                      </div>
                    </div>
                    <div data-benefit-table-line="" className="line"></div>
                    <div className="benefit-table-item">
                      <div className="benefit-item-title">Smooth, everyday energy</div>
                      <div className="benefit-checker-inner">
                        <div className="benefit-item-check"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" /></div>
                        <div className="benefit-item-x"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" /></div>
                      </div>
                    </div>
                    <div data-benefit-table-line="" className="line"></div>
                    <div className="benefit-table-item">
                      <div className="benefit-item-title">Multiple fruity flavours</div>
                      <div className="benefit-checker-inner">
                        <div className="benefit-item-check"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" /></div>
                        <div className="benefit-item-x"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" /></div>
                      </div>
                    </div>
                    <div data-benefit-table-line="" className="line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="reviews" className="testimonial-section">
          <div data-testimonial-parallax="" className="bg-img-wrapper">
            <img className="testimonial-top-img" src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689541efc32332b4d96332e4_5aa593a5c181883619e1ec2e48b9a77009ae6ddd.webp" width="2048" alt="Iced Matcha Latte - More Nutrition" data-testimonial-parallax-item="" loading="lazy" />
            <img className="bg-img" src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689541d1c4bb0b452cb46e3e_b525d1f05540193d88caa60b825b8887a650d649.webp" width="2048" alt="Iced Matcha Latte - More Nutrition" data-testimonial-parallax-item="" loading="lazy" />
          </div>
          <div className="testimonial-container">
            <div className="grid-layout">
              <div id="w-node-_188a35c2-2913-dd29-6c54-5bf8cbbe64f3-0ac01850" className="big-title-wrapper">
                <div className="testimonial-signature">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2e8120f5b95bfbd87aebf_testimonial-signature.svg" loading="lazy" width="300" height="27" alt="testimonial-signature" className="testimonial-signature-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2e8120f5b95bfbd87aebf_testimonial-signature.svg" loading="lazy" width="300" height="27" alt="testimonial-signature" className="testimonial-signature-img is-wiggle" />
                </div>
                <h2 className="testimonial-big-heading">Sri Lankanized<br />Hydration</h2>
              </div>
              <div id="w-node-d56024cf-9b70-fc24-7ba0-e2b3ea8d1769-0ac01850" className="testimonial-slider">
                <h3 className="testimonial-heading">why they keep<br />coming back</h3>
                <div data-testimonial-inview="" className="testimonial-slider-wrapper">
                  <div data-slider-interface="" className="testimonial-slider-interface">
                    <div data-slider-arrows="" className="testimonial-slider-button-wrapper">
                      <button type="button" data-slider-left-button="" className="testimonial-slider-button is-left">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0fba88460ab65187e9_icon-arrow-left.svg" loading="lazy" width="20" height="20" alt="icon-arrow-left" className="testimonial-slider-button-arrow" />
                      </button>
                      <button type="button" data-slider-right-button="" className="testimonial-slider-button is-right">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0f2245f238d5eb3226_icon-arrow-right.svg" loading="lazy" width="20" height="20" alt="icon-arrow-right" className="testimonial-slider-button-arrow" />
                      </button>
                    </div>
                  </div>
                  <div data-slider="" className="testimonial-slider-inner">
                    {/* Testimonial Items */}
                    {[
                      { name: 'Original', heading: 'Original', text: 'A crisp, lightly sweet blend with subtle berry notes and a smooth finish.' },
                      { name: 'Apple Berry', heading: 'Apple Berry', text: 'A fresh, lightly sweet blend of juicy apple and soft berry notes with a smooth finish.' },
                      { name: 'Lemon Lime', heading: 'Lemon Lime', text: 'Bright, citrus-forward and refreshing, with a clean, zesty finish.' },
                      { name: 'Mango Peach', heading: 'Mango Peach', text: 'Smooth and lightly tropical, balancing ripe mango with soft peach notes.' },
                      { name: 'Pineapple Passion', heading: 'Pineapple Passion', text: 'Vibrant and juicy, blending tropical pineapple with a hint of passionfruit.' },
                      { name: 'Find Us', heading: "Find us and let's bam!", text: 'Available at stores near you. Experience the rebellious energy of Sri Lanka.' },
                    ].map((testimonial, index) => (
                      <div key={index} className="testimonial-slider-item-wrap">
                        <div data-slider-item-inner="" className="testimonial-slider-item">
                          <div className="testimonial-star-wrap">
                            {[1, 2, 3, 4, 5].map(star => (
                              <img key={star} src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2bdb3390600fa418ac907_icon-testimonial-star.svg" loading="lazy" width="20" height="20" alt="icon-testimonial-star" className="testimonial-star" />
                            ))}
                          </div>
                          <div className="testimonial-item-inner-text">
                            <h3 className="testimonial-item-heading">{testimonial.heading}</h3>
                            <p className="testimonial-item-text">{testimonial.text}</p>
                          </div>
                          <div className="testimonial-line"></div>
                          <div className="testimonial-item-bottom">
                            <div className="testimonial-client-name">{testimonial.name}</div>
                            <div className="testimonial-verified-wrap">
                              <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2c1be2762f3ffc1be06c5_icon-bubble-check.svg" loading="lazy" width="20" height="20" alt="icon-bubble-check" className="testimonial-verified-icon" />
                              <div className="testimonial-verified-text">Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flavour Section */}
        <section data-inertia="" className="flavour">
          <div className="flavour-container">
            <div className="flavour-header">
              <div className="flavour-heading-wrap">
                <h2 className="flavour-title">Sri Lankanized</h2>
                <h3 data-highlight-text="" className="flavour-subline">5 Flavours to make you go 'aaaahhh'</h3>
              </div>
              <p className="flavour-paragraph">Hype Bam is a testament to our limitless potential. We can create something extraordinary that rivals the best in the world.</p>
            </div>
            <div data-flavour-content="" className="flavour-content">
              <div className="flavour-left">
                <div className="flavour-signature-wrap">
                  <div className="flavour-signature">
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c94823c24b2c7988de3d7a_slider-signature.svg" loading="lazy" width="300" height="90" alt="slider-signature" className="flavour-signature-img" />
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c94823c24b2c7988de3d7a_slider-signature.svg" loading="lazy" width="300" height="90" alt="slider-signature" className="flavour-signature-img is-wiggle" />
                  </div>
                  <div style={{ '--animation-delay': '.15s' } as React.CSSProperties} className="flavour-signature-arrow">
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c94823659937fb4ddc9834_slider-signature-arrow.svg" loading="lazy" width="147" height="150" alt="slider-signature-arrow" className="flavour-signature-arrow-img" />
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c94823659937fb4ddc9834_slider-signature-arrow.svg" loading="lazy" width="147" height="150" alt="slider-signature-arrow" className="flavour-signature-arrow-img is-wiggle" />
                  </div>
                </div>
                <div data-inertia-item="" className="flavour-left-dose">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c93e5ef45e668c761efd15_slider-base-product-visual.webp" loading="lazy" width="481" height="1002" alt="slider-base-product-visual" data-inertia-item-child="" className="flavour-left-dose-img" />
                </div>
                <div data-inertia-item="" className="flavour-left-pack is-first">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c93e5ef2ba34cbfb878f82_slider-base-product-pack.webp" loading="lazy" width="447" height="699" alt="slider-base-product-pack" data-inertia-item-child="" className="flavour-left-pack-img" />
                </div>
                <div data-inertia-item="" className="flavour-left-pack is-second">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c93e5ef2ba34cbfb878f82_slider-base-product-pack.webp" loading="lazy" width="447" height="699" alt="slider-base-product-pack" data-inertia-item-child="" className="flavour-left-pack-img" />
                </div>
              </div>
              <div className="flavour-plus">
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c948227a747d8be568507e_slider-plus.svg" loading="lazy" width="146" height="150" alt="slider-plus" className="flavour-plus-img" />
              </div>
              <div className="flavour-right">
                <div data-flavour-slider="" className="flavour-swiper swiper">
                  <div className="flavour-swiper-wrapper swiper-wrapper">
                    {[
                      { name: 'Strawberry', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c958d0422452a42640ce1a_slider-flavour-strawberry-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c958d08fd58d9f97c0a559_slider-flavour-strawberry-pack.webp' },
                      { name: 'Fudge Brownie', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd8833449d96f96a8b2f_slider-flavour-fudge-brownie-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd899ab270ca74992378_slider-flavour-fudge-brownie-pack.webp' },
                      { name: 'Vanilla Choc Chip', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd89c0ba63f9f1a0474f_slider-flavour-vanilla-choc-chip-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd8966162a74314fbec6_slider-flavour-vanilla-choc-chip-pack.webp' },
                      { name: 'Salted Caramel', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9be3296b7aa51aad8dd5d_slider-flavour-salted-caramel-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd886d19ccf79464c844_slider-flavour-salted-caramel-pack.webp' },
                      { name: 'Vanilla Perfection', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd88dfdd73be537ddc99_slider-flavour-vanilla-perfection-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd88efee0e997f4efce6_slider-flavour-vanilla-perfection-pack.webp' },
                    ].map((flavour, index) => (
                      <div key={index} className="flavour-slide swiper-slide">
                        <div className="flavour-slide-inner">
                          <div data-inertia-item="" className="flavour-slide-dose">
                            <img className="flavour-slide-dose-img" src={flavour.dose} width="723" height="615" alt={`${flavour.name}-dose`} data-inertia-item-child="" loading="lazy" />
                          </div>
                          <div data-inertia-item="" className="flavour-slide-pack is-first">
                            <img className="flavour-slide-pack-img" src={flavour.pack} width="653" height="478" alt={`${flavour.name}-pack`} data-inertia-item-child="" loading="lazy" />
                          </div>
                          <div data-inertia-item="" className="flavour-slide-pack is-second">
                            <img className="flavour-slide-pack-img" src={flavour.pack} width="653" height="478" alt={`${flavour.name}-pack`} data-inertia-item-child="" loading="lazy" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flavour-right-bg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 769 691" fill="none" data-flavour-content-svg="" className="flavour-right-bg-svg">
                    <path d="M245.813 59.5015C54.1619 152.668 -34.1186 356.234 41.6525 512.101C117.424 667.969 332.042 724.289 523.692 631.123C715.343 537.957 803.624 334.39 727.852 178.522C652.081 22.6546 437.463 -33.6648 245.813 59.5015Z" stroke="currentColor" strokeWidth="28"></path>
                  </svg>
                </div>
              </div>
              <div className="flavour-navigation">
                <button type="button" data-flavour-slider-left-button="" className="flavour-slider-button is-left">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0fba88460ab65187e9_icon-arrow-left.svg" loading="lazy" width="20" height="20" alt="icon-arrow-left" className="flavour-slider-button-arrow" />
                </button>
                <button type="button" data-flavour-slider-right-button="" className="flavour-slider-button is-right">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0f2245f238d5eb3226_icon-arrow-right.svg" loading="lazy" width="20" height="20" alt="icon-arrow-right" className="flavour-slider-button-arrow" />
                </button>
              </div>
              <div className="flavour-center">
                <div data-flavour-content-slider="" className="flavour-content-swiper swiper">
                  <div className="flavour-content-swiper-wrapper swiper-wrapper">
                    {[
                      { title: 'Strawberry\nPerfection', link: 'https://morenutrition.co.uk/products/chunky-flavour?_psq=chunky&_v=1.0' },
                      { title: 'Fudge\nBrownie', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094746005668' },
                      { title: 'Vanilla Choc\nChip Cookie', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094747578532' },
                      { title: 'Salted\nCaramel', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094765076644' },
                      { title: 'Vanilla\nPerfection', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094761996452' },
                    ].map((item, index) => (
                      <div key={index} className="flavour-content-slide swiper-slide">
                        <div className="flavour-content-slide-inner">
                          <div className="flavour-content-slide-header">
                            <h3 className="flavour-content-slider-title" dangerouslySetInnerHTML={{ __html: item.title.replace('\n', '<br/>') }}></h3>
                            <p className="flavour-content-slider-subline">Chunky Flavour®</p>
                          </div>
                          <a href={item.link} target="_blank" rel="noreferrer" className="button w-inline-block">
                            <div className="button-cycle is-first">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                                <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                              </svg>
                              <div className="button-cycle-bg"></div>
                            </div>
                            <div className="button-bg">
                              <div className="button-text">Buy now</div>
                            </div>
                            <div className="button-cycle is-second">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                                <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                              </svg>
                              <div className="button-cycle-bg"></div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <div data-inertia="" className="payment-section">
          <div className="payment-container">
            <div className="grid-layout">
              <div id="w-node-_041f45d4-47b7-9fbf-98ee-78b1c2254fcb-0ac01850" className="payment-wrapper">
                <div id="w-node-_358aeb55-90b6-f7e1-a5ad-3d95f312e343-0ac01850" className="payment-signature-days is-desktop">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2211dbd022ef87bf8047a_payment_3-5-days-delivery.svg" loading="lazy" width="269" height="150" alt="payment_3-5-days-delivery" className="payment-signature-days-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2211dbd022ef87bf8047a_payment_3-5-days-delivery.svg" loading="lazy" width="269" height="150" alt="payment_3-5-days-delivery" className="payment-signature-days-img is-wiggle" />
                </div>
                <h2 id="w-node-_5aa7990f-3909-960f-ff04-09bf6fbaf58f-0ac01850" className="insider-heading">Find us and<br /><span className="light-green-span">let's bam!</span></h2>
                <div id="w-node-_3b9ad9e4-4de9-0d6f-0561-c6944df56da5-0ac01850" className="payment-methods-inner">
                  <div data-payment="" className="pament-methods">
                    <div data-inertia-item="" className="payment-method-item-outer">
                      <div data-payment-item="" data-inertia-item-child="" className="payment-method-item _1"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689b2b15e9b7e50000f8cad0_Layer_1%20(5).svg" loading="lazy" alt="Amex" className="payment-method-img is-amex" /></div>
                    </div>
                    <div data-inertia-item="" className="payment-method-item-outer">
                      <div data-payment-item="" data-inertia-item-child="" className="payment-method-item _2"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689b2b1554cf5d3d8dbbeb01_Group%20102.svg" loading="lazy" alt="Mastercard" className="payment-method-img is-mastercard" /></div>
                    </div>
                    <div data-inertia-item="" className="payment-method-item-outer">
                      <div data-payment-item="" data-inertia-item-child="" className="payment-method-item _3"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689b2b15a9a38cc10d995594_Group%2096.svg" loading="lazy" alt="PayPal" className="payment-method-img is-paypal" /></div>
                    </div>
                    <div data-inertia-item="" className="payment-method-item-outer">
                      <div data-payment-item="" data-inertia-item-child="" className="payment-method-item _4"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689734d5c258f310eceeeb26_Group%2097.svg" loading="lazy" alt="Apple Pay " className="payment-method-img is-apple-pay" /></div>
                    </div>
                    <div data-inertia-item="" className="payment-method-item-outer">
                      <div data-payment-item="" data-inertia-item-child="" className="payment-method-item _5"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689b2b15baf850f5dbcaba37_Group%20106.svg" loading="lazy" alt="Google Pay" className="payment-method-img is-google-pay" /></div>
                    </div>
                    <div data-inertia-item="" className="payment-method-item-outer">
                      <div data-payment-item="" data-inertia-item-child="" className="payment-method-item _6"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689b2b2738c618add8d9334b_Group%20104.svg" loading="lazy" alt="Visa" className="payment-method-img is-visa" /></div>
                    </div>
                    <div data-inertia-item="" className="payment-method-item-outer">
                      <div data-payment-item="" data-inertia-item-child="" className="payment-method-item _7"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689bad624fa04dfe23225ad3_Klarna_Payment_Badge%201.svg" loading="lazy" alt="Klarna" className="payment-method-img" /></div>
                    </div>
                    <div className="payment-signature-days is-mobile">
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2211dbd022ef87bf8047a_payment_3-5-days-delivery.svg" loading="lazy" width="269" height="150" alt="payment_3-5-days-delivery" className="payment-signature-days-img" />
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2211dbd022ef87bf8047a_payment_3-5-days-delivery.svg" loading="lazy" width="269" height="150" alt="payment_3-5-days-delivery" className="payment-signature-days-img is-wiggle" />
                    </div>
                    <div className="payment-signature-mobile">
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c321a0bcd661b9a1c1040e_free-shipping-mobile.svg" loading="lazy" width="300" height="150" alt="free-shipping-mobile" className="payment-signature-img is-mobile" />
                      <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c321a0bcd661b9a1c1040e_free-shipping-mobile.svg" loading="lazy" width="300" height="150" alt="free-shipping-mobile" className="payment-signature-img is-wiggle is-mobile" />
                    </div>
                  </div>
                </div>
                <div id="w-node-a4554c61-f2f6-fed6-6652-44ed900999ad-0ac01850" className="payment-signature">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c6da07704668cebe17120_Group%20150.svg" loading="lazy" alt="Free shipping" className="mobile" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2256a5ce0c9ca5c1aa015_payment_free-shipping.svg" loading="lazy" width="300" height="96" alt="payment_free-shipping" className="payment-signature-img" />
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2256a5ce0c9ca5c1aa015_payment_free-shipping.svg" loading="lazy" width="300" height="96" alt="payment_free-shipping" className="payment-signature-img is-wiggle" />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bridge">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 362" data-fill-line="" className="footer-line">
              <path stroke="currentColor" strokeWidth="40" d="M-18.71 5c-13.946 63.747 87.162 120.514 206.635 115.163 94.068-4.213 234.063-38.055 299.378-54.44C939.856-47.813 622.333 217.95 673.484 297.908c37.655 58.861 225.928-110.975 381.896-110.975 56.25 0 206.21 27.386 293.1 98.412 72.29 59.093 134.66 63.049 158.52 51.416"></path>
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div id="w-node-_01191fa0-2abf-23ff-44da-acbdf6476df4-0ac01850" className="footer-full-height-container">
            <div id="w-node-f35c7284-aa91-03b1-62fc-d15dd1353c80-0ac01850" className="footer-product">
              <div className="absolute-background">
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top.webp" loading="lazy" width="700" height="700" alt="footer_product-bg-top" srcSet="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top-p-500.webp 500w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top-p-800.webp 800w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top-p-1080.webp 1080w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top.webp 1400w" sizes="(max-width: 767px) 100vw, 700px" className="footer-img top" />
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg.webp" loading="lazy" width="700" height="700" alt="footer_product-bg" srcSet="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg-p-500.webp 500w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg-p-800.webp 800w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg-p-1080.webp 1080w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg.webp 1400w" sizes="(max-width: 767px) 100vw, 700px" className="footer-img" />
              </div>
              <div className="footer-product-text-inner">
                <h3 className="footer-product-heading">Matcha<br />meets...<br />Sri Lankanized</h3>
                <div aria-hidden="true" className="button is-light">
                  <div className="button-cycle is-first">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                      <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                    </svg>
                    <div className="button-cycle-bg light-bg"></div>
                  </div>
                  <div className="button-bg light-bg">
                    <div className="button-text dark-font">Buy now</div>
                  </div>
                  <div className="button-cycle is-second">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" width="100%" className="button-arrow">
                      <path fill="currentColor" fillRule="evenodd" d="M0 1.827 1.71 0H10v8.22L8.11 10V5.93c0-.992.009-1.89.03-2.695l-6.642 6.58-1.316-1.44 6.641-6.58c-.787.022-1.67.032-2.647.032H0Z" clipRule="evenodd"></path>
                    </svg>
                    <div className="button-cycle-bg light-bg"></div>
                  </div>
                </div>
              </div>
              <a aria-label="Buy now" href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte?country=GB&shpxid=9a9ac546-be7d-41d1-b2d0-0e58e2adcb2d" target="_blank" rel="noreferrer" className="footer-product-link w-inline-block"></a>
            </div>
            <div id="w-node-_52f3956c-463e-cf84-00da-ec073fe306cc-0ac01850" className="footer-content">
              <div id="w-node-_103e8af5-3d0c-0c66-5f7b-cd9c707fa04f-0ac01850" className="footer-fact-wrapper">
                <a href="https://morenutrition.co.uk/collections/all-products-uk" target="_blank" rel="noreferrer" className="footer-info is-first w-inline-block">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689754d9448e952a9e6c0aeb_Alle-Produkte_f1ba7a0d-4d19-4202-af26-db495d4d8559_100x100%201.svg" loading="lazy" width="57" height="70" alt="More Nutrition Icon" className="footer-info-img is-first" />
                  <div className="footer-info-text">shop all<br />Products</div>
                </a>
                <a href="https://morenutrition.co.uk/collections/samples-and-singlepacks-uk" target="_blank" rel="noreferrer" className="footer-info is-second w-inline-block">
                  <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689754d9d94ba5b480581df7_Group%2084.svg" loading="lazy" width="58" height="49" alt="More Nutrition Icon" className="footer-info-img is-second" />
                  <div className="footer-info-text">samples <br />&amp; Singles</div>
                </a>
              </div>
              <div id="w-node-d7a8f3ad-3299-e0db-d6e1-45b4c5d40c53-0ac01850" className="footer-content-wrapper">
                <h4 className="footer-heading"><span data-highlight-text="" className="heading-line">Hype Bam</span> <br />Energy Drink</h4>
                <div className="footer-shipping-wrapper">
                  <a href="https://service.morenutrition.de/hc/en-us/sections/15534294234257-Shipping-and-Delivery" target="_blank" rel="noreferrer" className="shipping-link w-inline-block">
                    <div className="shipping-link-wrap">
                      <div className="shipping-link-text">Shipping and Delivery</div>
                    </div>
                  </a>
                  <a href="https://service.morenutrition.de/hc/en-us/sections/15534281016465-Return-Refund" target="_blank" rel="noreferrer" className="shipping-link w-inline-block">
                    <div className="shipping-link-wrap">
                      <div className="shipping-link-text">Returns and Exchanges</div>
                    </div>
                  </a>
                </div>
                <div className="footer-social-media-wrap">
                  <a href="https://www.instagram.com/morenutrition.de/" target="_blank" rel="noreferrer" className="social-media-link w-inline-block">
                    <div className="social-media-circle is-white"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688651ae6f6e0e5669c9d465_instagram.svg" loading="lazy" width="24" height="24" alt="Instagram" className="social-media-icon" /></div>
                  </a>
                  <a href="https://www.tiktok.com/@morenutrition.de?lang=de-DE" target="_blank" rel="noreferrer" className="social-media-link w-inline-block">
                    <div className="social-media-circle is-white"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688651aeea8f52f9e4d418f2_tiktok.svg" loading="lazy" width="24" height="24" alt="TikTok" className="social-media-icon" /></div>
                  </a>
                  <a href="https://www.youtube.com/@more_nutrition" target="_blank" rel="noreferrer" className="social-media-link w-inline-block">
                    <div className="social-media-circle is-white"><img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68d40d4b080c864fb3ec6e0f_youtube-svgrepo-com.svg" loading="lazy" width="24" height="24" alt="youtube" className="social-media-icon" /></div>
                  </a>
                </div>
              </div>
            </div>
            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/6899e6d17cc0ae7334395045_Vector%20(5).svg" loading="lazy" id="w-node-_9cf1d991-93c8-9876-0a84-cf07ed027319-0ac01850" alt="More Nutrition Logo" className="footer-logo mobile" />
            <div id="w-node-_440e9322-e28d-ad9e-9ab8-9d51f2096f5d-0ac01850" className="footer-bottom">
              <div className="footer-bottom-text">© Hype Bam. All Rights Reserved.</div>
              <button type="button" className="footer-credits-toggle"><span className="footer-credits-toggle-wrap"><span className="footer-credits-toggle-text">Site Credits</span></span></button>
              <div className="footer-credits">
                <div className="footer-credits-inner">
                  <div className="footer-credits-detail">
                    <div className="footer-credits-text">3D Design</div>
                    <a href="https://www.tobias-anderssohn.com/en/" target="_blank" rel="noreferrer" className="credits-link w-inline-block">
                      <div className="credits-link-wrap">
                        <div className="credits-link-text">Tobias Anderssohn</div>
                      </div>
                    </a>
                  </div>
                  <div className="footer-credits-detail">
                    <div className="footer-credits-text">Web Design</div>
                    <a href="https://www.somefolk.co/" target="_blank" rel="noreferrer" className="credits-link w-inline-block">
                      <div className="credits-link-wrap">
                        <div className="credits-link-text">Somefolk®</div>
                      </div>
                    </a>
                  </div>
                  <div className="footer-credits-detail">
                    <div className="footer-credits-text">Web Development</div>
                    <a href="https://www.futurethree.studio/" target="_blank" rel="noreferrer" className="credits-link w-inline-block">
                      <div className="credits-link-wrap">
                        <div className="credits-link-text">Future Three®</div>
                      </div>
                    </a>
                  </div>
                  <div className="footer-credits-detail">
                    <div className="footer-credits-text">Web Animation</div>
                    <a href="https://www.eduardbodak.com/" target="_blank" rel="noreferrer" className="credits-link w-inline-block">
                      <div className="credits-link-wrap">
                        <div className="credits-link-text">Eduard Bodak</div>
                      </div>
                    </a>
                  </div>
                  <div className="footer-credits-detail">
                    <div className="footer-credits-text">Copywriting</div>
                    <a href="https://psychologie.biz/" target="_blank" rel="noreferrer" className="credits-link w-inline-block">
                      <div className="credits-link-wrap">
                        <div className="credits-link-text">Psychologie.Biz</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer logo removed as per user request */}
        </div>
      </div>
    </>
  )
}

export default App
