document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.sync.get(['wordsPerMinute'], function(result) {
      document.getElementById('words-per-minute').value = result.wordsPerMinute || 200;
    });
  
    // Save settings
    document.getElementById('save-settings').addEventListener('click', function() {
      const wordsPerMinute = parseInt(document.getElementById('words-per-minute').value);
      chrome.storage.sync.set({ wordsPerMinute: wordsPerMinute }, function() {
        alert('Settings saved!');
      });
    });
  
    // Donate button
    document.getElementById('donate-button').addEventListener('click', function() {
      const amount = document.getElementById('donation-amount').value;
      chrome.tabs.create({
        url: `https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID&amount=${amount}`
      });
    });
  });