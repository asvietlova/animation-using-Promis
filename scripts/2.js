let elemBlue = document.getElementById("blueBallAnimation");
let elemGreen = document.getElementById("greenBallAnimation");
let elemRed = document.getElementById("redBallAnimation");
let like = document.getElementById("like");

let running = false;

function init() {
    elemBlue.style.left = '0px';
    elemBlue.style.top = '0px';
    elemGreen.style.left = '0px';
    elemGreen.style.top = '0px';
    elemRed.style.left = '0px';
    elemRed.style.top = '0px';
    like.style.visibility = "hidden";
}

obj = {
    style: {
        left: "",
        top: "",
    }
}


// ******************** Решение через функцию
// function myMove1() {
//     like.style.visibility = "hidden";
//     let position = 0;
//     let id = setInterval(frameSync, 5);
    
//     function frameSync() {
//         if (position == 600) {
//             clearInterval(id);
//             like.style.visibility = "visible";
//         } else {
//             position++;
//             elem.style.left = position + "px";
//             elem.style.top = position + "px";
//             elemGreen.style.left = position + "px";
//             elemRed.style.top = position + "px";
//         }
//     }
// };

// ******************Решение поочередной анимации через обычную функцию
// function frameRed() {
//     if (positionRed == 600) {
//         clearInterval(idRedInterval);

//         positionBlue = 0;
//         idBlueInterval = setInterval(frameBlue, 5);
//     } else {
//         positionRed++;
//         elemRed.style.top = positionRed + "px";
//     }
// }

// function frameBlue() {
//     if (positionBlue == 600) {
//         clearInterval(idBlueInterval);

//         positionGreen = 0;
//         idGreenInterval = setInterval(frameGreen, 5);
//     } else {
//         positionBlue++;
//         elem.style.left = positionBlue + "px";
//         elem.style.top = positionBlue + "px";
//     }
// }

// function frameGreen () {
//     if (positionGreen == 600) {
//         clearInterval(idGreenInterval);

//         like.style.visibility = "visible";
//     } else {
//         positionGreen++;
//         elemGreen.style.left = positionGreen + "px";
//     }
// }


// let idRedInterval;
// let positionRed = 0;
    
// let positionBlue = 0;
// let idBlueInterval;

// let positionGreen = 0;
// let idGreenInterval;

// function myMove2() {
//     like.style.visibility = "hidden";
//     positionRed = 0;
//     positionBlue = 0;
//     positionGreen = 0;
//     idRedInterval = setInterval(frameRed, 5);
// }

// ******************Первый вариант промиса
async function myMove3() {
    // return new Promise(function (resolve) { 
    //     let position = 0;
    //     let id = setInterval(frameSync, 5);
    //     function frameSync() {
    //         if (position == 600) {
    //             clearInterval(id);
    //             like.style.visibility = "visible";

    //             resolve();
    //         } else {
    //             position++;
    //             elemBlue.style.left = position + "px";
    //             elemBlue.style.top = position + "px";
    //             elemGreen.style.left = position + "px";
    //             elemRed.style.top = position + "px";
    //         }
    //     }
    
    // }); 

// hide like 
// init position
    if (running) {
        return null;
    }
    running = true;
  init()
    return Promise.all([redMove(), blueMove(), greenMove()]).then(() => {
        like.style.visibility = "visible";
          running = false;
});
}

// asycn => (async, async, async)


async function redMove() {
    return new Promise(function (resolve) { 
        let position = 0;
        let id = setInterval(frameSync, 5);
        function frameSync() {
           
            if (position == 600) {
                clearInterval(id);
                resolve();
            } else {

                position++;
                elemRed.style.top = position + "px";
            }
        }       
    }); 
}

async function blueMove() {
    return new Promise(function (resolve) { 
        let position = 0;
        let id = setInterval(frameSync, 5);
        function frameSync() {
            if (position == 600) {
                clearInterval(id);
                resolve();
            } else {
                position++;
                elemBlue.style.left = position + "px";
                elemBlue.style.top = position + "px";
            }
        }       
    }); 
}

async function greenMove() {
    return new Promise(function (resolve) { 
        let position = 0;
        let id = setInterval(frameSync, 5);
        function frameSync() {
            if (position == 600) {
                clearInterval(id);
                resolve();
            } else {
                position++;
                elemGreen.style.left = position + "px";
            }
        }       
    }); 
}

async function myMove2() {
    if (running) {
        return null;
    }
    running = true;

    init();
    return redMove(elemRed, 1).
            then(() => {
                blueMove().
                    then(() => {
                        greenMove().then(() => { 
                            like.style.visibility = "visible"; 
                            running = false;
                        }).catch((e) => { });
                    }).catch((e) => { });
            }).
            catch((e) => { });
}



//myMove3().then(myMove3()).
//  ****************Второй вариант промиса
// function go() {
//     Animate(0).then(() => {
//         like.style.visibility = "visible";
//         clearInterval()
//     });
//   }

//   function Animate(posit) {
//     return new Promise(resolve => {
//         setInterval(() => {
//             posit++;
//             elem.style.left = posit + "px";
//             elem.style.top = posit + "px";
//             elemGreen.style.left = posit + "px";
//             elemRed.style.top = posit + "px";
                        
//             elem.addEventListener('transitionend', function handler() {
//                 elem.removeEventListener('transitionend', handler);
//                 resolve(elem);
//             });
           
//         }, 5);
        
//     })
//   }


// *************************************цепочка промисов
//   new Promise(function(resolve, reject) {

//   setTimeout(() => resolve(1), 1000); // (*)

// }).then(function(result) { // (**)

//   alert(result); // 1
//   return result * 2;

// }).then(function(result) { // (***)

//   alert(result); // 2
//   return result * 2;

// }).then(function(result) {

//   alert(result); // 4
//   return result * 2;

// });




// ******************Черновик

function getNewPos(curr, end) {
    let res = {
        X: curr.X,
        Y: curr.Y,
    }

    if (curr.X != end.X) {
        res.X = curr.X + 1;
    }

    if (curr.Y != end.Y) {
        res.Y = curr.Y + 1;
    }

    return res
}

function isItEnd(curr, end) {
    return curr.X === end.X && curr.Y == end.Y;
}


async function animate(elem, posEnd) {
    return new Promise(resolve => {
        let annimationID;
        let  frame = () => {
            let currPos = {
                X: elem.style.left.replace('px',''),
                Y: elem.style.top.replace('px',''),
            };   
            
            
            if (isItEnd(currPos, posEnd)) {
                clearInterval(annimationID);
                resolve(True);
            } else {
                let newPos =   getNewPos(currPos, posEnd);
                elem.style.lef =newPos.X  +'px';
            //   elem.style.top.replace('px',''),
            }
       };

        annimationID = setInterval(frame, 5);
    });
}

function waitForALl() {
    let elem1 = document.getElementById("myAnimation");
    let elem2 = document.getElementById("myAnimation");
    let elem3 = document.getElementById("myAnimation");
    let like = document.getElementById("myAnimation");

    animate
}
