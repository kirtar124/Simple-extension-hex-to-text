document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("convertBtn").addEventListener("click", convertHex);
  document.getElementById("copyBtn").addEventListener("click", copyResult);
  document.getElementById("openLinkBtn").addEventListener("click", openLink);
  document.getElementById("saveBtn").addEventListener("click", saveLink);
  document.getElementById("openHistoryBtn").addEventListener("click", openHistory);
});

function convertHex() {
  const hexInput = document.getElementById("hexInput").value.trim().replace(/\s+/g, '');
  if (hexInput.length % 2 !== 0) {
    document.getElementById("result").value = "Error: Hex string must have an even number of characters.";
    document.getElementById("openLinkBtn").style.display = "none";
    return;
  }

  try {
    const byteArray = new Uint8Array(hexInput.length / 2);
    for (let i = 0; i < hexInput.length; i += 2) {
      const byte = parseInt(hexInput.substr(i, 2), 16);
      if (isNaN(byte)) throw new Error("Invalid hex");
      byteArray[i / 2] = byte;
    }

    const decoder = new TextDecoder("utf-8");
    const decodedText = decoder.decode(byteArray);

    document.getElementById("result").value = decodedText;
    document.getElementById("openLinkBtn").style.display = isValidURL(decodedText) ? "block" : "none";
  } catch (e) {
    document.getElementById("result").value = "Error: Invalid hex string or not UTF-8.";
    document.getElementById("openLinkBtn").style.display = "none";
  }
}

function copyResult() {
  const result = document.getElementById("result");
  navigator.clipboard.writeText(result.value)
    .then(() => alert("Result copied!"))
    .catch(() => alert("Unable to copy result."));
}

function saveLink() {
  const result = document.getElementById("result");
  if (!result) {
    alert("Result element not found.");
    return;
  }
  const text = result.value.trim();
  if (!text) {
    return alert("No content to save.");
  }

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get({ history: [] }, function(data) {
      let history = data.history;
      history.push(text);
      chrome.storage.local.set({ history: history }, function() {
        if (chrome.runtime.lastError) {
          console.error("Error saving data:", chrome.runtime.lastError);
          alert("Error saving data.");
        } else {
          console.log("Data saved:", history);
          alert("Saved!");
        }
      });
    });
  } else {
    console.error("Environment does not support storage.");
    alert("Environment does not support storage. Please run in Chrome Extension.");
  }
}

function openLink() {
  const url = document.getElementById("result").value;
  if (isValidURL(url)) {
    chrome.tabs.create({ url: url });
  }
}

function openHistory() {
  chrome.tabs.create({ url: chrome.runtime.getURL('history.html') });
}

// Load utils.js
const script = document.createElement('script');
script.src = chrome.runtime.getURL('utils.js');
document.head.appendChild(script);