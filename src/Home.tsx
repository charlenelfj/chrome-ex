import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ColorizeIcon from '@material-ui/icons/Colorize';
import TuneIcon from '@material-ui/icons/Tune';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import $ from 'jquery';

interface LooseObject {
  [key: string]: any;
}

const Home: React.FunctionComponent<{}> = () => {

  let bgPage;
  const [pointerEnabled, setPointerEnabled] = useState(false);
  const [showDisabledMessage, setShowDisabledMessage] = useState(false);
  const [tab, setTab] = useState<LooseObject>({});

  const hello = () => {
    document.body.style.backgroundColor = "#000000";
  }

  const showPointer = () => {
    // here we will call the background method
    // console.log(tab)
    if (pointerEnabled) {
      chrome.runtime.sendMessage({picker: tab}, (response) => {
        console.log(response);
        console.log("sending message");
      })
    }

    // chrome.runtime.getBackgroundPage((backgroundPage) => {
    //   console.log(backgroundPage);
    // })
  }

  // const showPointer = () => {
  //   console.log(tab)
  //   // you need to hide the window and show the cursor
  //   // maybe we can send a message to the bg script and ask them to close??
  //   // chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  //   //   console.log(response);
  //   //   console.log("sending message to close the popup");
  //   // });

  //   // we will activate the picker here
  //   // need to change cursor to the cross hair type

  //   // if you want to do function call then you might need to create a file then
  //   // call the init function
  //   let color = 'green';
  //   document.body.style.cursor = 'crosshair';
  //   // chrome.tabs.executeScript(
  //   //   tab.id,
  //   //   {code: 'document.body.style.backgroundColor = "' + color + '";'}
  //   // )
    // chrome.tabs.executeScript(
    //   tab.id,
    //   {file: '/dropper.ts'}
    // )

  //   // window.close();
    
  // }

  useEffect(() => {
    // here you need to check if the page is loaded???
    // if its loaded then we set pointer to true
    // else we show error message
    chrome.tabs.query({active: true}, (tabs) => {
      if (tabs[0].active === true) {

        // check tabs if the url is valid
        if (tabs[0].url === undefined) {
          setShowDisabledMessage(true);
        }
        // if its in special page, then extension won't work from here as well
        else if (tabs[0].url.match(/^(file|chrome:\/\/)+/g)) {
          setShowDisabledMessage(true);
        }
        else {
          setPointerEnabled(true);
          setTab(tabs[0]);
        }
      }
    })

    console.log(document.readyState);

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request === "close-window") {
        window.close();
      }
    })
  }, []);

  return (
    <div style={{ height: '350px', width: '300px'}}>
      <Grid 
        container
        direction="column"
      >
        {showDisabledMessage ?
          <Typography variant="caption">Chrome doesn't allow picking colours from this special page</Typography>
        : null}

        <Grid 
          container
          direction="row"
          justify="flex-end"
          >
            <Button onClick={showPointer}>
              <ColorizeIcon />
            </Button>

            <Button>
              <TuneIcon />
            </Button>
            
            <Button>
              <LibraryAddIcon />
            </Button>
          </Grid>
        <Typography variant="h3">hello</Typography>
      </Grid>
    </div>
  )
}

export default Home;