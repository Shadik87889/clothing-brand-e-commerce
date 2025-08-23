document.addEventListener("DOMContentLoaded", () => {
  const faqLink = document.getElementById("faq-link");
  const faqSection = document.getElementById("faq-section");

  // Detect if current page is home.html or root "/"
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("home.html");

  const scrollToFaq = () => {
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If redirected with scroll flag
  if (sessionStorage.getItem("scrollToFAQ") === "true" && isHomePage) {
    sessionStorage.removeItem("scrollToFAQ");

    // Use requestAnimationFrame so it runs right after DOM render
    requestAnimationFrame(() => {
      scrollToFaq();
    });
  }

  // Handle click on FAQ link
  if (faqLink) {
    faqLink.addEventListener("click", (e) => {
      e.preventDefault();

      if (isHomePage) {
        scrollToFaq();
      } else {
        sessionStorage.setItem("scrollToFAQ", "true");
        window.location.href = "/home.html"; // ✅ use leading slash
      }
    });
  }
});
