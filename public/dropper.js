
// this activated in the main window
// not the ext window
console.log("in dropper");

// trying to change the cursor
// alert("hello87887")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("listening")

  if (request === "cursor") {
    // you need to change this cursor into like something else 
    // see if can do like custom cursor not
    // should be can
    document.documentElement.style.cursor = 'cursorurl';

    // sending to react to close the window;
    chrome.runtime.sendMessage("close-window", (response) => {
      console.log(response);
    })
    sendResponse({});
  }
})