/**
 * @jest-environment jsdom
*/


test('simultaneous ', () => {  
  document.body.innerHTML =
    '<div>' +
    '   <div id="greenBallAnimation"></div>' +
    '<div id="blueBallAnimation"></div>' +
    '<div id="redBallAnimation"></div>' +
    '  <img id="like" src="img/Ei-like.svg" alt="like">' +
    '</div>';
  
  
  const { simultaneous,
      elemRed,
    elemBlue,
    elemGreen} = require('./2.js');
  return simultaneous().then(() => {
    expect(elemRed.style.top).toBe('600px');

    expect(elemBlue.style.top).toBe('600px');
    expect(elemBlue.style.left).toBe('600px');
    
    expect(elemGreen.style.left).toBe('600px');
    
  });
}, 10000)