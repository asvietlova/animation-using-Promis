let elemBlue = document.getElementById('blueBallAnimation');
let elemGreen = document.getElementById('greenBallAnimation');
let elemRed = document.getElementById('redBallAnimation');
let like = document.getElementById('like');

let running = false;

function init() {
    elemBlue.style.left = '0px';
    elemBlue.style.top = '0px';
    elemGreen.style.left = '0px';
    elemGreen.style.top = '0px';
    elemRed.style.left = '0px';
    elemRed.style.top = '0px';
    like.style.visibility = 'hidden';
}

async function simultaneous() {
    if (running) {
        return null;
    }
    running = true;
  init()
    return Promise.all([redMove(), blueMove(), greenMove()]).then(() => {
        like.style.visibility = 'visible';
          running = false;
});
}

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
                elemRed.style.top = position + 'px';
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
                elemBlue.style.left = position + 'px';
                elemBlue.style.top = position + 'px';
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
                elemGreen.style.left = position + 'px';
            }
        }       
    }); 
}

async function alternate() {
    if (running) {
        return null;
    }
    running = true;

    init();
    return redMove().
            then(() => {
                blueMove().
                    then(() => {
                        greenMove().then(() => { 
                            like.style.visibility = 'visible'; 
                            running = false;
                        }).catch((e) => {console.log('Error!'); });
                    }).catch((e) => {console.log('Error!'); });
            }).catch((e) => {console.log('Error!'); });
}
