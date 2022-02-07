let elemBlue = document.getElementById('blueBallAnimation');
let elemGreen = document.getElementById('greenBallAnimation');
let elemRed = document.getElementById('redBallAnimation');
let like = document.getElementById('like');

const INTERVAL = 5;

const redEndPos = {
    X: 0,
    Y: 600,
};
const blueEndPos = {
    X: 600,
    Y: 600,
};
const greenEndPos = {
    X: 600,
    Y: 0,
}

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

function isOnPlace(currPos, endPos) {
    return currPos.X == endPos.X && currPos.Y == endPos.Y;
}

async function moveElement(elemHTML, interval, endPos) {
    return new Promise(function (resolve) {
        let id = setInterval(frameSync, interval);
        function frameSync() {
            let currPos = {
                X: Number(elemHTML.style.left.replace('px', '')), 
                Y: Number(elemHTML.style.top.replace('px','')),
            };

            if (isOnPlace(currPos, endPos)) {
                clearInterval(id);
                resolve();
            } else {
                let newPos = getNewPos(currPos, endPos);

                elemHTML.style.top = newPos.Y + 'px';
                elemHTML.style.left = newPos.X + 'px';
            }
        }       
    }); 
}

function showLike() {
    like.style.visibility = 'visible';
}

async function simultaneous() {
    if (running) {
        return null;
    }
    running = true;
    
    init()
    return Promise.all([
        moveElement(elemRed, INTERVAL, redEndPos),
        moveElement(elemBlue, INTERVAL, blueEndPos),
        moveElement(elemGreen, INTERVAL, greenEndPos)]).then(() => {
            showLike();

            running = false;
        });
}
    
async function alternate() {
    if (running) {
        return null;
    }
    running = true;

    init();
    return moveElement(elemRed, INTERVAL, redEndPos).
            then(() => {
                moveElement(elemBlue, INTERVAL, blueEndPos).
                    then(() => {
                        moveElement(elemGreen, INTERVAL, greenEndPos).then(() => { 
                            showLike();

                            running = false;
                        }).catch((e) => {console.log('Error!'); });
                    }).catch((e) => {console.log('Error!'); });
            }).catch((e) => {console.log('Error!'); });
};

module.exports = {
    getNewPos,
    isOnPlace,
    moveElement,
    alternate,
    simultaneous,
    elemRed,
    elemBlue,
    elemGreen
};
