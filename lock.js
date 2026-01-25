// /**
//  * ACCOUNT SUSPENSION LOCK SCRIPT
//  * * This script creates a high-priority overlay that blocks access to the site.
//  * * Premium Static Design: Minimalist, High-Contrast, No Animation.
//  */

// (function () {
//   "use strict";

//   const CONFIG = {
//     title: "SYSTEM LOCKED",
//     subtitle: "ADMINISTRATIVE ACCESS REQUIRED",
//     message:
//       "This interface has been restricted. Please verify your credentials or contact the site administrator to restore full access.",
//     contact: "CONTACT SUPPORT",
//     // Using the image from previous context
//     image: "Gemini_Generated_Image_ep4d03ep4d03ep4d (1).png",
//     colors: {
//       bg: "#050505",
//       card: "#0a0a0a",
//       border: "#1f1f1f",
//       text: "#ffffff",
//       subtext: "#666666",
//       accent: "#ffffff",
//     },
//   };

//   const LOCK_ID = "sys-lock-" + Math.random().toString(36).substring(7);

//   // Create the lock CSS
//   function injectStyles() {
//     const styleId = LOCK_ID + "-style";
//     if (document.getElementById(styleId)) return;

//     const css = `
//             #${LOCK_ID} {
//                 position: fixed !important;
//                 top: 0 !important;
//                 left: 0 !important;
//                 width: 100vw !important;
//                 height: 100vh !important;
//                 background-color: ${CONFIG.colors.bg} !important;
//                 z-index: 2147483647 !important; /* Max 32-bit integer */
//                 display: flex !important;
//                 align-items: center !important;
//                 justify-content: center !important;
//                 cursor: not-allowed !important;
//                 font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
//                 -webkit-font-smoothing: antialiased !important;
//                 user-select: none !important;
//                 overflow: hidden !important;
//             }

//             /* Premium Card - No Animation */
//             .${LOCK_ID}-card {
//                 position: relative !important;
//                 background: ${CONFIG.colors.card} !important;
//                 width: 100% !important;
//                 max-width: 440px !important;
//                 padding: 0 !important; /* Reset padding for internal layout */
//                 border: 1px solid ${CONFIG.colors.border} !important;
//                 box-shadow: 0 0 0 1px #000, 0 40px 80px -20px rgba(0,0,0,0.8) !important;
//                 display: flex !important;
//                 flex-direction: column !important;
//                 align-items: center !important;
//                 text-align: center !important;
//             }

//             .${LOCK_ID}-content {
//                 padding: 64px 48px !important;
//                 width: 100% !important;
//                 display: flex !important;
//                 flex-direction: column !important;
//                 align-items: center !important;
//             }

//             /* Static Avatar */
//             .${LOCK_ID}-avatar-frame {
//                 width: 80px !important;
//                 height: 80px !important;
//                 margin-bottom: 32px !important;
//                 border-radius: 50% !important;
//                 padding: 3px !important;
//                 border: 1px solid ${CONFIG.colors.border} !important;
//                 background: ${CONFIG.colors.card} !important;
//             }
//             .${LOCK_ID}-avatar {
//                 width: 100% !important;
//                 height: 100% !important;
//                 border-radius: 50% !important;
//                 object-fit: cover !important;
//                 display: block !important;
//                 opacity: 0.9 !important;
//             }

//             /* Typography */
//             .${LOCK_ID}-subtitle {
//                 color: ${CONFIG.colors.text} !important;
//                 font-size: 10px !important;
//                 letter-spacing: 3px !important;
//                 font-weight: 700 !important;
//                 text-transform: uppercase !important;
//                 margin-bottom: 20px !important;
//                 opacity: 0.5 !important;
//             }

//             .${LOCK_ID}-title {
//                 color: ${CONFIG.colors.text} !important;
//                 font-size: 24px !important;
//                 font-weight: 400 !important;
//                 letter-spacing: -0.2px !important;
//                 margin: 0 0 24px 0 !important;
//                 line-height: 1.3 !important;
//             }

//             .${LOCK_ID}-message {
//                 color: ${CONFIG.colors.subtext} !important;
//                 font-size: 13px !important;
//                 line-height: 1.7 !important;
//                 margin-bottom: 40px !important;
//                 font-weight: 400 !important;
//                 max-width: 280px !important;
//             }

//             /* Footer Section */
//             .${LOCK_ID}-footer {
//                 width: 100% !important;
//                 border-top: 1px solid ${CONFIG.colors.border} !important;
//                 padding: 20px !important;
//                 background: #080808 !important;
//             }

//             .${LOCK_ID}-badge {
//                 display: inline-block !important;
//                 font-size: 11px !important;
//                 letter-spacing: 1px !important;
//                 text-transform: uppercase !important;
//                 font-weight: 600 !important;
//                 color: ${CONFIG.colors.subtext} !important;
//             }
//         `;

//     const style = document.createElement("style");
//     style.id = styleId;
//     style.textContent = css;
//     document.head.appendChild(style);
//   }

//   // Create the DOM elements
//   function createOverlay() {
//     if (document.getElementById(LOCK_ID)) return;

//     const overlay = document.createElement("div");
//     overlay.id = LOCK_ID;

//     overlay.innerHTML = `
//             <div class="${LOCK_ID}-card">
//                 <div class="${LOCK_ID}-content">
//                     <div class="${LOCK_ID}-avatar-frame">
//                         <img src="${CONFIG.image}" class="${LOCK_ID}-avatar" alt="User" />
//                     </div>

//                     <div class="${LOCK_ID}-subtitle">${CONFIG.subtitle}</div>

//                     <h1 class="${LOCK_ID}-title">${CONFIG.title}</h1>

//                     <p class="${LOCK_ID}-message">
//                         ${CONFIG.message}
//                     </p>

//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                         <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//                         <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//                     </svg>
//                 </div>

//                 <div class="${LOCK_ID}-footer">
//                     <span class="${LOCK_ID}-badge">${CONFIG.contact}</span>
//                 </div>
//             </div>
//         `;

//     document.documentElement.appendChild(overlay);
//     document.body.style.overflow = "hidden";
//     document.documentElement.style.overflow = "hidden";
//   }

//   // Anti-Tamper Logic (Kept Strict)
//   function secureLock() {
//     injectStyles();
//     createOverlay();

//     const observer = new MutationObserver((mutations) => {
//       let needsRestore = false;
//       mutations.forEach((mutation) => {
//         if (mutation.removedNodes.length > 0) {
//           mutation.removedNodes.forEach((node) => {
//             if (node.id === LOCK_ID || node.id === LOCK_ID + "-style")
//               needsRestore = true;
//           });
//         }
//         if (mutation.type === "attributes" && mutation.target.id === LOCK_ID) {
//           if (
//             mutation.target.style.display === "none" ||
//             mutation.target.style.opacity === "0"
//           ) {
//             mutation.target.setAttribute("style", "");
//             needsRestore = true;
//           }
//         }
//       });

//       if (needsRestore) {
//         const existing = document.getElementById(LOCK_ID);
//         if (existing) existing.remove();
//         const existingStyle = document.getElementById(LOCK_ID + "-style");
//         if (existingStyle) existingStyle.remove();
//         injectStyles();
//         createOverlay();
//       }
//     });

//     observer.observe(document.documentElement, {
//       childList: true,
//       subtree: true,
//       attributes: true,
//       attributeFilter: ["style", "class"],
//     });

//     setInterval(() => {
//       if (!document.getElementById(LOCK_ID)) createOverlay();
//       injectStyles();
//       document.body.style.overflow = "hidden";
//     }, 500);

//     document.addEventListener("contextmenu", (e) => e.preventDefault(), true);
//     document.addEventListener(
//       "keydown",
//       function (e) {
//         if (
//           e.key === "F12" ||
//           (e.ctrlKey &&
//             e.shiftKey &&
//             (e.key === "I" || e.key === "J" || e.key === "C")) ||
//           (e.ctrlKey && e.key === "U")
//         ) {
//           e.preventDefault();
//           e.stopPropagation();
//           return false;
//         }
//       },
//       true,
//     );
//   }

//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", secureLock);
//   } else {
//     secureLock();
//   }
// })();
