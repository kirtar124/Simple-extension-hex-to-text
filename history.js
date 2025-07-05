document.addEventListener('DOMContentLoaded', function() {
  // Load utils.js and wait for it to be ready
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('utils.js');
  script.onload = function() {
    // Once utils.js is loaded, proceed with history display
    const list = document.getElementById('historyList');
    if (!list) {
      console.error('History list element not found.');
      return;
    }
    chrome.storage.local.get({ history: [] }, function(data) {
      const history = data.history;
      console.log("Retrieved data:", history);

      if (history.length === 0) {
        list.innerHTML = '<li>No data available.</li>';
        return;
      }

      history.forEach(function(item) {
        const li = document.createElement('li');
        if (isValidURL(item)) {
          const link = document.createElement('a');
          link.href = item;
          link.textContent = item;
          link.target = '_blank'; // Open in new tab
          li.appendChild(link);
        } else {
          li.textContent = item;
        }
        list.appendChild(li);
      });
    });
  };
  document.head.appendChild(script);
  document.getElementById("clearHistoryBtn").addEventListener("click", function() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ history: [] }, function() {
        if (chrome.runtime.lastError) {
          console.error('Error clearing history:', chrome.runtime.lastError);
          alert('Error clearing history.');
        } else {
          console.log('History cleared.');
          alert('History cleared!');
          location.reload();
        }
      });
    } else {
      console.error('Environment does not support storage.');
      alert('Environment does not support storage.');
    }
  });
});