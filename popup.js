document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.create({ url: 'https://github.com/Ratott/profile-preview' }); // Replace with the desired URL
    window.close();
  });