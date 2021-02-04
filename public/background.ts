// // // chrome.runtime.onMessage.addListener(
// // //   function(request, sender, sendResponse) {
// // //     console.log(sender.tab ?
// // //                 "from a content script:" + sender.tab.url :
// // //                 "from the extension");
// // //     if (request.greeting == "hello")
// // //       sendResponse({farewell: "goodbye"});
// // //   }
// // // );

// const initPicker = () => {
//   console.log("initializing");
//   // we will start the picker here
//   // need to send a message to the content script????? which is dropper.ts 
//   // to show the crosshair????? 

//   // trying to get the tab details
//   chrome.tabs.query({active: true}, (tabs) => {
//     console.log(tabs)
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       {file: '/dropper.ts'}
//     )

//     chrome.tabs.sendMessage(tabs[0].id, {greeting: "bye"}, (response) => {
//       console.log(response)
//     });
//   });

// }

// console.log("wew");


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.greeting === "hello") {
//     initPicker();
//     sendResponse({farewell: "goodbye"});
//   }
// })

document.addEventListener('DOMContentLoaded', () => {
  initialize();
})

let tabObj;

const getTabInfo = () => {
  chrome.tabs.query({active: true}, (tabs) => {
  
  })
}

/**
 * sending messages to the content script
 * @param tabid tab id for a particular tab in google chrome extension
 */
const messageSender = (tabid) => {
  chrome.tabs.sendMessage(tabid, "cursor", (response) => {
    console.log(response);
  })
}


/**
 * listen to messages sent that are meant for the background
 */
const listener = () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(Object.keys(request)[0]) {
      case 'picker':
        tabObj = request.picker;
        messageSender(tabObj.id);
    }
   sendResponse({})
  })
}

const initialize = () => {
  console.log("initialize")
  // setting up listening object
  listener();

  // setting up bg object
}
