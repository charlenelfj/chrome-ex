import React from 'react';
import logo from './logo.svg';
import html2canvas from 'html2canvas';
import './App.css';
import $ from 'jquery';

const App: React.FunctionComponent<{}> = () => {

  const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const testFunction = () => {
    // $(window).on("click", function(ev) {
    //   var x = ev.clientX;
    //   var y = ev.clientY;
    
    //   html2canvas(document.body).then(function(canvas) {
    //      var ctx = canvas.getContext('2d');
    //      console.log(ctx);
    //      var p = ctx!.getImageData(x, y, 1, 1).data; 

    //      console.log(p)
        //  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        //  // console.log(hex);
    //   });
    // });

    $(window).on("click", (event) => {
      // get the coordinates that are relative to the top left corner of the visible part 
      // of the page 
      let x = event.clientX;
      let y = event.clientY;

      console.log(x);
      console.log(y)



     // this one only works on the interface itself and not outside of the extension
      html2canvas(document.body).then((canvas) => {
        console.log(canvas);
        let ctx = canvas.getContext("2d");
        let p = ctx!.getImageData(x, y, 1, 1).data;
        // console.log(p)
        let hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        console.log(hex);
      })
    })
    
  }

  return (
    <div style={{backgroundColor: "green" , height: '500px'}}>
      <h2 style={{ color: 'red'}}>adss</h2>
      {testFunction()}
    </div>
  )
}
export default App;
