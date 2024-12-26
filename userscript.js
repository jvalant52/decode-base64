// ==UserScript==
// @name         Decode base64
// @namespace    http://tampermonkey.net/
// @version      2024-12-25
// @description  Adds a "decode" button on rentry website to decode base64 strings
// @author       jvalant52
// @match        *://*.rentry.co/*
// @match        *://*.rentry.org/*
// @grant        none
// ==/UserScript==

(function() {
// Select all <code> elements within <ul> tags
document.querySelectorAll("ul code").forEach((codeElement) => {
  // Decode the Base64 string in the <code> element
  const decodedString = atob(codeElement.textContent);

  // Create a "Decode All" button element
  const decodeAllButton = document.createElement("button");
  decodeAllButton.textContent = "decode all";

  // Create a new "Action" button element
  const button = document.createElement("button");
  button.textContent = "decode";

  // Add an event listener to the "Action" button
  button.addEventListener("click", () => {
    // Replace the <code> content with a hyperlink
    const link = document.createElement("a");
    link.href = decodedString;
    link.textContent = decodedString;
    link.target = "_blank"; // Open the link in a new tab

    // Replace the code element with the link
    codeElement.replaceWith(link);
  });

  // Add an event listener to the "Decode All" button
  decodeAllButton.addEventListener("click", () => {
    document.querySelectorAll("ul code").forEach((codeEl) => {
      const decodedStr = atob(codeEl.textContent);
      const link = document.createElement("a");
      link.href = decodedStr;
      link.textContent = decodedStr;
      link.target = "_blank"; // Open the link in a new tab

      codeEl.replaceWith(link);
    });
  });

  // Insert both buttons immediately after the <code> element
  codeElement.insertAdjacentElement("afterend", button);
  button.insertAdjacentElement("afterend", decodeAllButton);
});


})();
