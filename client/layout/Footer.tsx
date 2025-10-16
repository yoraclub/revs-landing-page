import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";

export default function Footer() {
  return (
    <footer className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="space-y-8">
          {/* Top Section - Logo and CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-48 h-[56px] text-gray-900 dark:text-white">
                <svg viewBox="0 0 180 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <mask id="m0" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="47">
                      <path d="M180 0H0V47H180V0Z" fill="white"/>
                    </mask>
                    <g mask="url(#m0)">
                      <mask id="m1" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="47">
                        <path d="M41.1778 0H0V46.9491H41.1778V0Z" fill="white"/>
                      </mask>
                      <g mask="url(#m1)">
                        <path d="M23.6638 19.5425C28.406 19.5425 31.0407 17.3126 31.0407 13.2631C31.0407 9.27246 28.406 7.04236 23.6638 7.04236H0.128052V0H23.6638C34.0267 0 39.8227 4.75359 39.8227 13.2631C39.8227 20.8336 35.3731 25.4112 27.118 26.4088L40.9934 46.9491H31.0994L17.3994 26.585H16.5211C11.2519 26.585 8.3246 29.5194 8.3246 34.8009V46.9491H0.128052V34.8009C0.128052 25.0004 5.98272 19.5425 16.5211 19.5425H23.6638Z" fill="currentColor"/>
                      </g>
                      <path d="M81.9111 17.1951V24.2375H64.4639C59.1945 24.2375 56.2675 27.172 56.2675 32.4538V39.9069H83.0818V46.9491H48.0708V33.6272C48.0708 23.0638 53.9257 17.1951 64.4639 17.1951H81.9111Z" fill="currentColor"/>
                      <path d="M48.0428 0V7.04236L83.0731 7.14018V0H48.0428Z" fill="#FF1801"/>
                      <path d="M106.872 46.9491L89.8933 0H98.6166L110.97 34.1553L123.323 0H132.047L115.068 46.9491H106.872Z" fill="currentColor"/>
                      <path d="M162.426 17.4293C161.909 18.1695 161.637 18.7634 161.526 19.195C161.465 19.4353 161.453 19.6309 161.481 19.7747C161.508 19.917 161.581 20.029 161.707 20.0533C161.825 20.0761 161.951 20.0116 162.063 19.9027C162.176 19.7907 162.291 19.618 162.393 19.3853C162.576 18.974 162.722 18.3658 162.754 17.547L165.948 24.3566C163.797 23.6101 162.42 23.3368 161.637 23.3283C161.435 23.3261 161.27 23.3414 161.139 23.372C161.009 23.4022 160.908 23.4491 160.84 23.5155C160.77 23.5852 160.741 23.6724 160.754 23.7661C160.766 23.8552 160.817 23.9437 160.889 24.0271C161.032 24.1945 161.286 24.3661 161.613 24.5157C161.943 24.6662 162.354 24.7974 162.823 24.8804C163.55 25.0089 164.415 25.022 165.325 24.8101L154.621 30.4367C151.283 32.1449 149.356 33.3941 148.264 34.4448C147.717 34.9711 147.377 35.4499 147.174 35.914C146.972 36.3786 146.908 36.8243 146.908 37.2809C146.908 38.2012 147.255 38.908 147.975 39.3801C148.69 39.8486 149.762 40.0807 151.202 40.0807H179.695V46.8701H151.612C147.524 46.8701 144.338 45.9606 142.175 44.303C140.016 42.6474 138.869 40.2401 138.869 37.2228C138.869 34.6047 139.537 32.351 141.368 30.1524C143.202 27.9501 146.206 25.7992 150.887 23.3983L162.426 17.4293Z" fill="currentColor" stroke="currentColor"/>
                      <path d="M156.321 29.5472C156.836 28.8087 157.108 28.2157 157.218 27.785C157.279 27.5443 157.292 27.3491 157.264 27.2052C157.236 27.0629 157.162 26.9506 157.037 26.9266C156.918 26.9036 156.793 26.9682 156.682 27.0771C156.568 27.189 156.453 27.362 156.35 27.5944C156.169 28.005 156.023 28.6119 155.991 29.4287L152.796 22.5172C154.947 23.2639 156.324 23.5374 157.108 23.5459C157.31 23.5481 157.475 23.5328 157.605 23.5024C157.734 23.4721 157.837 23.4251 157.904 23.3587C157.975 23.289 158.003 23.2019 157.991 23.1082C157.977 23.019 157.926 22.9306 157.856 22.847C157.711 22.6799 157.459 22.5081 157.131 22.3584C156.802 22.2078 156.39 22.0767 155.921 21.9938C155.196 21.8656 154.333 21.8523 153.425 22.0629L164.027 16.512C167.364 14.8039 169.291 13.5549 170.383 12.5042C170.929 11.978 171.269 11.4993 171.472 11.0352C171.675 10.5705 171.74 10.125 171.74 9.6684C171.74 8.74782 171.392 8.04117 170.671 7.56892C169.957 7.1006 168.885 6.86844 167.444 6.86844H138.953V0.0788574H167.035C171.123 0.0788574 174.309 0.988648 176.472 2.64624C178.631 4.30167 179.778 6.70911 179.778 9.7263C179.778 12.3443 179.109 14.5982 177.279 16.7968C175.445 18.999 172.441 21.1498 167.76 23.5508L156.321 29.5472Z" fill="currentColor" stroke="currentColor"/>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="180" height="47" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <Link
              to={ROUTE_PATHS.MOBILE_APP}
              className="bg-revz-red hover:bg-revz-red/90 text-white px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Download App
            </Link>
          </div>

          {/* Middle Section - Links and Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-6">
            {/* Column 1 - About */}
            <div className="space-y-4">
              <h3 className="font-nevera text-gray-900 dark:text-white uppercase tracking-wider text-sm font-bold">
                About REVZ
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-numans leading-relaxed text-sm">
                Your ultimate Formula 1 companion for live timing, race insights, and team analytics.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-4">
              <h3 className="font-nevera text-gray-900 dark:text-white uppercase tracking-wider text-sm font-bold">
                Quick Links
              </h3>
              <ul className="space-y-3 font-numans text-sm">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-revz-red dark:hover:text-revz-red transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.MOBILE_APP} className="text-gray-600 dark:text-gray-400 hover:text-revz-red dark:hover:text-revz-red transition-colors">
                    Download
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Theme & Settings */}
            <div className="space-y-4">
              <h3 className="font-nevera text-gray-900 dark:text-white uppercase tracking-wider text-sm font-bold">
                Settings
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 dark:text-gray-400 font-numans text-sm">Theme</span>
                <AnimatedThemeToggler className="w-12 h-12 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors" />
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 font-numans">
              © {new Date().getFullYear()} REVZ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
