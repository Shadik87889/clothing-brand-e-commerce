// NOVOFITBD Admin Panel - Easy Bangla Translation Module
// This script runs automatically to translate the interface without modifying the HTML.

(function () {
  console.log("Easy Bangla Translator Loaded - Invoice COD Fix v8");

  // CONFIGURATION: Default shipping cost if 'N/A', 'PAID' or 'Free' is found
  // This ensures shipping is NEVER shown as paid/free.
  const DEFAULT_SHIPPING_COST = 120; // Change this amount as needed

  // --- 0. FONT SETUP (Hind Siliguri for Bangla) ---
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  const banglaStyle = document.createElement("style");
  banglaStyle.id = "bangla-font-style";
  banglaStyle.innerHTML = `
      body, .font-heading, h1, h2, h3, h4, h5, h6, button, input, select, textarea, .btn {
          font-family: 'Hind Siliguri', 'Inter', sans-serif !important;
      }
  `;

  // --- 1. THE DICTIONARY (Real Life Site Terminology) ---
  const dictionary = {
    // --- Sidebar & Navigation ---
    Dashboard: "ড্যাশবোর্ড",
    Products: "পণ্য তালিকা",
    Orders: "অর্ডার",
    Invoices: "ইনভয়েস / মেমো",
    Settings: "সেটিংস",
    Logout: "বের হন",
    "Sign In": "লগ ইন করুন",
    NovofitBD: "নভোফিট বিডি",
    "Admin Panel": "এডমিন প্যানেল",

    // --- Dashboard Stats ---
    "Total Revenue": "মোট বিক্রি",
    "Total Profit": "মোট লাভ",
    "Pending Orders": "নতুন অর্ডার",
    "Total Products": "মোট পণ্য",
    "Revenue & Profit Over Time": "বিক্রি এবং লাভের হিসাব",
    "Sales by Category": "ক্যাটাগরি অনুযায়ী বিক্রি",
    "Recent Orders": "সাম্প্রতিক অর্ডার",
    "7 Days": "৭ দিন",
    "30 Days": "৩০ দিন",
    "Month to Date": "এই মাস",
    "Year to Date": "এই বছর",

    // --- Invoice & Money Logic ---
    Subtotal: "পণ্যের মোট মূল্য", // Product Price Only
    Shipping: "ডেলিভারি চার্জ", // Delivery Charge
    Tax: "ভ্যাট/ট্যাক্স",

    // Labels for Totals
    "Amount Due": "সর্বমোট (ডেলিভারি চার্জ সহ)",
    "Total:": "সর্বমোট:", // For Order Details page

    // Column Headers
    Item: "পণ্যের নাম",
    Quantity: "পরিমাণ",
    "Unit Price": "একক দাম",
    Total: "মোট",

    // Invoice Header Info
    "Invoice ID": "ইনভয়েস নং",
    "Order ID": "অর্ডার নং",
    Date: "তারিখ",
    "Bill To": "গ্রাহকের ঠিকানা",
    "Print Invoice": "প্রিন্ট করুন",

    // Status Logic
    PAID: "পরিশোধিত",
    UNPAID: "বাকি",

    // --- Product Table & Actions ---
    "Add New Product": "নতুন পণ্য যোগ করুন",
    "Search by ID, name, category...": "নাম বা আইডি দিয়ে খুঁজুন...",
    Actions: "কাজ",
    "Delete Selected": "মুছে ফেলুন",
    All: "সব",
    Published: "প্রকাশিত",
    Draft: "খসড়া",
    Archived: "বাতিল",
    Image: "ছবি",
    "Name & ID": "নাম ও আইডি",
    Status: "অবস্থা",
    Price: "দাম",
    Department: "বিভাগ",
    Category: "ক্যাটাগরি",
    category: "ক্যাটাগরি",

    // --- Product Form ---
    "Back to Products": "তালিকায় ফিরে যান",
    "Edit Product": "পণ্য পরিবর্তন করুন",
    "Product Details": "পণ্যের বিবরণ",
    "Product Name": "পণ্যের নাম",
    "Select Department": "বিভাগ বাছাই করুন",
    "Select Category": "ক্যাটাগরি বাছাই করুন",
    "Cost Price": "কেনা দাম",
    "Base Price": "বিক্রয় মূল্য (আসল)",
    Discount: "ছাড় (%)",
    "Final Price": "ফাইনাল দাম",
    "Short Description": "ছোট বিবরণ",
    "Detailed Description": "বিস্তারিত বিবরণ",
    Specifications: "বৈশিষ্ট্য",
    Material: "কাপড়/উপাদান",
    Fit: "ফিটিং",
    "Care Instructions": "ধোয়ার নিয়ম",
    "Media & Variants": "ছবি, রং ও সাইজ",
    Images: "ছবিসমূহ",
    Colors: "রং (Colors)",
    Sizes: "সাইজ (Sizes)",
    "Shipping & Tax": "শিপিং ও ভ্যাট",
    Weight: "ওজন",
    Dimensions: "আকার",
    "Tax Class": "ভ্যাট ক্লাস",
    "SEO & Metadata": "গুগল এসইও (SEO)",
    "Meta Title": "টাইটেল",
    "Meta Description": "বিবরণ",
    "Update Product": "আপডেট করুন",
    "Add Product": "সেভ করুন",
    Cancel: "বাতিল",

    // --- Order Status ---
    Pending: "পেন্ডিং",
    Confirmed: "কনফার্ম",
    Delivered: "ডেলিভারি হয়েছে",
    Cancelled: "বাতিল",

    // --- Order Details ---
    "Back to Orders": "অর্ডারে ফিরে যান",
    "Items Ordered": "অর্ডার করা পণ্য",
    "Payment Summary": "পেমেন্ট হিসাব", // Important target for calculation logic
    "Customer Info": "কাস্টমার তথ্য",
    Name: "নাম",
    Email: "ইমেইল",
    Mobile: "মোবাইল",
    "Shipping Address": "ডেলিভারি ঠিকানা",
    "Order Status": "অর্ডারের অবস্থা",
    "Shipping Payment": "ডেলিভারি চার্জ পেমেন্ট",

    // --- UPDATED BUTTON LABEL FOR FULL COD ---
    "Mark Shipping Paid & Confirm Order":
      "অর্ডার কনফার্ম করুন (পণ্য হাতে পেয়ে পেমেন্ট)",

    "Update Status (Manual)": "অবস্থা পরিবর্তন করুন",
    "Payment Method": "পেমেন্ট মাধ্যম",
    "Transaction ID": "ট্রানজেকশন আইডি",
    "Order Date": "অর্ডারের তারিখ",
    "Generate Invoice": "ইনভয়েস তৈরি করুন",
    "View Invoice": "ইনভয়েস দেখুন",
    "Thank you for your business!": "আমাদের সাথে থাকার জন্য ধন্যবাদ!",

    // --- Settings ---
    "Account Security": "একাউন্ট নিরাপত্তা",
    "Current Password": "বর্তমান পাসওয়ার্ড",
    "New Password": "নতুন পাসওয়ার্ড",
    "Confirm New Password": "নতুন পাসওয়ার্ড নিশ্চিত করুন",
    "Update Password": "পরিবর্তন করুন",
    "Shipping Settings": "শিপিং সেটিং",
    "Base Shipping Cost": "সাধারণ ডেলিভারি চার্জ",
    "Free Shipping Threshold": "ফ্রি ডেলিভারি লিমিট",
    "Orders over this amount will have free shipping.":
      "এই টাকার বেশি অর্ডার করলে ডেলিভারি ফ্রি।",
    "Save Shipping Settings": "সেভ করুন",
    "Tax Settings": "ভ্যাট সেটিং",
    "Default Tax Rate": "ভ্যাট হার (%)",
    "Save Tax Settings": "সেভ করুন",

    // --- Common Terms ---
    Men: "পুরুষ",
    Women: "মহিলা",
    Kids: "বাচ্চা",
    Others: "অন্যান্য",
    Yes: "হ্যাঁ",
    No: "না",
    OK: "ঠিক আছে",
    Dismiss: "বাদ দিন",
    Success: "সফল",
    Error: "সমস্যা",
  };

  // --- 2. STATE MANAGEMENT ---
  const STORAGE_KEY = "aurora_admin_lang";
  const storedLang = localStorage.getItem(STORAGE_KEY);
  let isBangla = storedLang === null ? true : storedLang === "bn";

  // --- 3. TRANSLATION LOGIC ---

  function applyFont() {
    if (isBangla) {
      if (!document.head.contains(banglaStyle)) {
        document.head.appendChild(banglaStyle);
      }
    } else {
      if (document.head.contains(banglaStyle)) {
        document.head.removeChild(banglaStyle);
      }
    }
  }

  function normalize(text) {
    return text ? text.trim() : "";
  }

  function translateNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;

    const text = normalize(node.nodeValue);
    if (!text) return;

    if (dictionary[text]) {
      if (!node.parentElement.hasAttribute("data-original-en")) {
        node.parentElement.setAttribute("data-original-en", text);
      }
      node.nodeValue = dictionary[text];
      return;
    }
  }

  function restoreNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const parent = node.parentElement;
    if (parent && parent.hasAttribute("data-original-en")) {
      node.nodeValue = parent.getAttribute("data-original-en");
    }
  }

  // --- NEW: UNIFIED SMART CALCULATION LOGIC ---
  function fixFinancialCalculations(root) {
    // Helper: Override Status Text to 'Unpaid/COD'
    function overridePaidStatus(cell) {
      if (!cell) return;
      const txt = cell.textContent.trim().toLowerCase();
      // If it says Paid, Porishodhito, or empty or Yes
      if (
        txt === "paid" ||
        txt === "unpaid" ||
        txt === "yes" ||
        txt === "free"
      ) {
        cell.textContent = "ক্যাশ অন ডেলিভারি (বাকি)";
        cell.style.color = "#d63031"; // Red color
        cell.style.fontWeight = "600";
      }
    }

    // --- 1. INVOICE VIEW LOGIC ---
    const invoiceContainer = root.querySelector("#invoice-container");
    if (invoiceContainer) {
      const rows = invoiceContainer.querySelectorAll("tfoot tr, tbody tr"); // Scan body too for status rows
      let subtotalRow, shippingRow, taxRow, totalRow;

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();

        // Check for specific "Shipping Payment" status row if it exists separately
        if (
          text.includes("shipping payment") ||
          text.includes("ডেলিভারি চার্জ পেমেন্ট")
        ) {
          overridePaidStatus(row.lastElementChild);
        }

        if (text.includes("subtotal") || text.includes("পণ্যের মোট মূল্য"))
          subtotalRow = row;
        else if (text.includes("shipping") || text.includes("ডেলিভারি চার্জ"))
          shippingRow = row;
        else if (text.includes("tax") || text.includes("ভ্যাট")) taxRow = row;
        else if (text.includes("amount due") || text.includes("সর্বমোট"))
          totalRow = row;
      });

      if (shippingRow && totalRow && subtotalRow) {
        // Force the Label to be simple "Delivery Charge"
        const labelCell = shippingRow.firstElementChild;
        if (labelCell) labelCell.textContent = "ডেলিভারি চার্জ";

        const shippingCell = shippingRow.lastElementChild;
        // Check current text content before parsing
        const currentShippingText = shippingCell.textContent
          .trim()
          .toLowerCase();

        let shippingCost = parseFloat(
          shippingCell.textContent.replace(/[^\d.-]/g, ""),
        );

        // AGGRESSIVE OVERRIDE:
        // If it says "PAID", "Porishodhito", "Free", or implies it's 0/NaN
        // WE FORCE IT TO BE THE DEFAULT COST (120).
        if (
          isNaN(shippingCost) ||
          shippingCost === 0 ||
          currentShippingText.includes("paid") ||
          currentShippingText.includes("পরিশোধিত") ||
          currentShippingText.includes("free") ||
          currentShippingText.includes("n/a")
        ) {
          shippingCost = DEFAULT_SHIPPING_COST;
          // Set the visual text to the cost
          shippingCell.textContent = `৳${shippingCost.toFixed(2)}`;
          // Remove 'paid' green styling if present
          shippingCell.classList.remove("text-green-400");
          shippingCell.style.color = ""; // Reset color
        }

        // FORCE Recalculate Invoice Total (Subtotal + Tax + Shipping)
        // This ensures that even if the admin system subtracted shipping (because it thought it was paid),
        // we add it back here for the "Total Due".
        const subtotal =
          parseFloat(
            subtotalRow.lastElementChild.textContent.replace(/[^\d.-]/g, ""),
          ) || 0;
        const tax =
          parseFloat(
            taxRow
              ? taxRow.lastElementChild.textContent.replace(/[^\d.-]/g, "")
              : "0",
          ) || 0;

        const newTotal = subtotal + tax + shippingCost;
        totalRow.lastElementChild.textContent = `৳${newTotal.toFixed(2)}`;
      }
    }

    // --- 2. ORDER DETAILS / CONFIRMATION VIEW LOGIC ---
    const headers = root.querySelectorAll("h3");
    let paymentSummaryCard = null;

    headers.forEach((h) => {
      if (
        h.textContent.includes("Payment Summary") ||
        h.textContent.includes("পেমেন্ট হিসাব")
      ) {
        paymentSummaryCard = h.closest(".card");
      }
    });

    if (paymentSummaryCard) {
      const rows = paymentSummaryCard.querySelectorAll(".flex.justify-between");
      let subtotalEl, shippingEl, taxEl, totalEl;
      let shippingLabelEl;

      rows.forEach((row) => {
        const label = row.firstElementChild.textContent.toLowerCase();

        // Check for "Shipping Payment" status row in Order Status card (if inside this loop scope, but usually separate)
        // We need to look elsewhere for status card.

        if (
          label.includes("subtotal") ||
          label.includes("পণ্যের মোট মূল্য") ||
          label.includes("পণ্যের দাম")
        )
          subtotalEl = row.lastElementChild;
        else if (
          label.includes("shipping") ||
          label.includes("ডেলিভারি চার্জ")
        ) {
          shippingEl = row.lastElementChild;
          shippingLabelEl = row.firstElementChild;
        } else if (label.includes("tax") || label.includes("ভ্যাট"))
          taxEl = row.lastElementChild;
        else if (label.includes("total") || label.includes("সর্বমোট"))
          totalEl = row.lastElementChild;
      });

      if (shippingEl && totalEl) {
        // Force clean label here too
        if (shippingLabelEl) shippingLabelEl.textContent = "ডেলিভারি চার্জ";

        const currentShippingText = shippingEl.textContent.trim().toLowerCase();
        let shippingCost = parseFloat(
          shippingEl.textContent.replace(/[^\d.-]/g, ""),
        );

        // Force Default Cost if "Paid", "Free", "0" etc.
        if (
          isNaN(shippingCost) ||
          shippingCost === 0 ||
          currentShippingText.includes("paid") ||
          currentShippingText.includes("পরিশোধিত") ||
          currentShippingText.includes("free") ||
          currentShippingText.includes("n/a")
        ) {
          shippingCost = DEFAULT_SHIPPING_COST;
          shippingEl.textContent = `৳${shippingCost.toFixed(2)}`;
          // Ensure visibility
          shippingEl.classList.remove("text-[var(--secondary-text)]");
          shippingEl.classList.add("text-white", "font-semibold");
        }

        // Force Recalculate Total
        const subtotal =
          parseFloat(subtotalEl?.textContent.replace(/[^\d.-]/g, "")) || 0;
        const tax = parseFloat(taxEl?.textContent.replace(/[^\d.-]/g, "")) || 0;

        const newTotal = subtotal + tax + shippingCost;
        totalEl.textContent = `৳${newTotal.toFixed(2)}`;
      }
    }
  }

  function walkAndTranslate(root, mode = "bn") {
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (
            node.parentElement.tagName === "SCRIPT" ||
            node.parentElement.tagName === "STYLE" ||
            node.parentElement.classList.contains("material-icons") ||
            node.parentElement.classList.contains("ph") ||
            node.parentElement.tagName === "I"
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      },
      false,
    );

    let node;
    while ((node = walker.nextNode())) {
      if (mode === "bn") {
        translateNode(node);
      } else {
        restoreNode(node);
      }
    }

    const inputs = root.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      if (mode === "bn") {
        const ph = input.getAttribute("placeholder");
        if (ph && dictionary[ph]) {
          if (!input.hasAttribute("data-original-ph")) {
            input.setAttribute("data-original-ph", ph);
          }
          input.setAttribute("placeholder", dictionary[ph]);
        }
      } else {
        if (input.hasAttribute("data-original-ph")) {
          input.setAttribute(
            "placeholder",
            input.getAttribute("data-original-ph"),
          );
        }
      }
    });

    // Run the smart calculation fix for BOTH Invoices and Order Details
    if (mode === "bn") {
      fixFinancialCalculations(root);
    }
  }

  // --- 4. OBSERVER ---
  const observer = new MutationObserver((mutations) => {
    if (!isBangla) return;

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          walkAndTranslate(node, "bn");
        }
      });
    });
  });

  function startObserver() {
    const contentArea = document.getElementById("content-area");
    const sidebar = document.getElementById("admin-sidebar");
    const loginSection = document.getElementById("login-section");
    const modal = document.getElementById("message-modal");

    const config = { childList: true, subtree: true };

    if (contentArea) observer.observe(contentArea, config);
    if (sidebar) observer.observe(sidebar, config);
    if (loginSection) observer.observe(loginSection, config);
    if (modal) observer.observe(modal, config);
  }

  // --- 5. UI CONTROLLER ---
  function createToggleButton() {
    const existing = document.getElementById("lang-toggle-btn");
    if (existing) existing.remove();

    const btn = document.createElement("button");
    btn.id = "lang-toggle-btn";
    btn.innerHTML = isBangla ? "🇺🇸 English" : "🇧🇩 বাংলা";

    Object.assign(btn.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "9999",
      padding: "10px 20px",
      backgroundColor: "#e5c18c",
      color: "#000",
      border: "none",
      borderRadius: "50px",
      fontWeight: "bold",
      boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
      cursor: "pointer",
      fontFamily: "sans-serif",
      fontSize: "14px",
      transition: "transform 0.2s",
    });

    btn.onmouseover = () => (btn.style.transform = "scale(1.05)");
    btn.onmouseout = () => (btn.style.transform = "scale(1)");
    btn.onclick = toggleLanguage;

    document.body.appendChild(btn);
  }

  function toggleLanguage() {
    isBangla = !isBangla;
    localStorage.setItem(STORAGE_KEY, isBangla ? "bn" : "en");

    const btn = document.getElementById("lang-toggle-btn");
    if (btn) btn.innerHTML = isBangla ? "🇺🇸 English" : "🇧🇩 বাংলা";

    applyFont();

    if (isBangla) {
      walkAndTranslate(document.body, "bn");
    } else {
      walkAndTranslate(document.body, "en");
    }
  }

  // --- 6. INITIALIZATION ---
  window.addEventListener("DOMContentLoaded", () => {
    createToggleButton();
    startObserver();
    applyFont();

    if (isBangla) {
      setTimeout(() => {
        walkAndTranslate(document.body, "bn");
      }, 100);
    }
  });
})();
