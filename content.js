// Average reading speed (words per minute)
const WORDS_PER_MINUTE = 200;

function calculateReadingTime() {
  // Get all text nodes in the visible area of the page
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let wordCount = 0;
  let node;
  const visibleElements = [];

  // Check if element is visible
  const isVisible = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      getComputedStyle(el).visibility !== 'hidden' &&
      getComputedStyle(el).display !== 'none'
    );
  };

  while ((node = walker.nextNode())) {
    if (node.parentNode && isVisible(node.parentNode)) {
      const text = node.textContent.trim();
      if (text) {
        wordCount += text.split(/\s+/).length;
      }
    }
  }

  // Calculate reading time
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return minutes;
}

function displayReadingTime() {
  const minutes = calculateReadingTime();
  
  // Create or update the reading time element
  let timeElement = document.getElementById('time-to-read-extension');
  
  if (!timeElement) {
    timeElement = document.createElement('div');
    timeElement.id = 'time-to-read-extension';
    document.body.prepend(timeElement);
  }
  
  timeElement.textContent = `~${minutes} min read`;
}

// Run on page load and on dynamic content changes
document.addEventListener('DOMContentLoaded', displayReadingTime);
const observer = new MutationObserver(displayReadingTime);
observer.observe(document.body, { childList: true, subtree: true });