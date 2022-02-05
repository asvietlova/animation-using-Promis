let elem = document.getElementById("blueBallAnimation");
let elemGreen = document.getElementById("greenBallAnimation");
let elemRed = document.getElementById("redBallAnimation");
let like = document.getElementById("like");

// ******************** Решение через функцию
function myMove1() {
    let position = 0;
    let id = setInterval(frameSync, 5);
    function frameSync() {
        if (position == 600) {
            clearInterval(id);
            like.style.visibility = "visible";
        } else {
            position++;
            elem.style.left = position + "px";
            elem.style.top = position + "px";
            elemGreen.style.left = position + "px";
            elemRed.style.top = position + "px";
        }
    }
};

// ******************Решение поочередной анимации через обычную функцию
function myMove2() {
    let positionRed = 0;
    let id = setInterval(frame, 5);
    
    function frame() {
        if (positionRed == 600) {
            clearInterval(id);
            let positionBlue = 0;
            let id2 = setInterval(frame2, 5);
            function frame2() {
                if (positionBlue == 600) {
                    clearInterval(id2);
                    let positionGreen = 0;
                    let id3 = setInterval(frame3, 5);
                    function frame3() {
                        if (positionGreen == 600) {
                            clearInterval(id3);
                            like.style.visibility = "visible";
                        } else {
                        positionGreen++;
                        elemGreen.style.left = positionGreen + "px";
                        }
                    }

                } else {
                positionBlue++;
                elem.style.left = positionBlue + "px";
                elem.style.top = positionBlue + "px";
                }
            }

        } else {
            positionRed++;
            elemRed.style.top = positionRed + "px";
        }
       
    }
};

// ******************Первый вариант промиса
// async function myMove3() {
//     return new Promise(function (resolve, reject) { 
//         let position = 0;
//         let id = setInterval(frameSync, 5);
//         function frameSync() {
//             if (position == 600) {
//                 clearInterval(id);
//                 like.style.visibility = "visible";
//             } else {
//                 position++;
//                 elem.style.left = position + "px";
//                 elem.style.top = position + "px";
//                 elemGreen.style.left = position + "px";
//                 elemRed.style.top = position + "px";
//             }
//         }

//         frameSync.onload = () => resolve(frameSync);
//         frameSync.onerror = () => reject(new Error("Ошибка"));
        
//     }); 
// }

//  let promise = myMove3();


//  ****************Второй вариант промиса
function go() {
    Animate(0).then(() => {
        like.style.visibility = "visible";
        clearInterval()
    });
  }

  function Animate(posit) {
    return new Promise(resolve => {
        setInterval(() => {
            posit++;
            elem.style.left = posit + "px";
            elem.style.top = posit + "px";
            elemGreen.style.left = posit + "px";
            elemRed.style.top = posit + "px";
                        
            elem.addEventListener('transitionend', function handler() {
                elem.removeEventListener('transitionend', handler);
                resolve(elem);
            });
           
        }, 5);
        
    })
  }


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
