// -------------------------------------------ПЕРЕМЕННЫЕ
let board = document.querySelector(".board");
let cursor = document.querySelector(".cursor");
let info = document.querySelector(".info");
let startBoard = document.querySelector(".start");
let body = document.querySelector("body");
let title = document.querySelector("title");
let btnStart = document.querySelector("#btnStart");
let btnRestart = document.querySelector(".btnRestart");
let btnRestart2 = document.querySelector(".btnRestart2");
let game_block = document.querySelector(".game_block");
let endGame_block = document.querySelector(".endGame");
let textLoose = document.querySelector(".textLoose");
let gameWin = document.querySelector(".gameWin");
let textWin = document.querySelector(".textWin");


let holesList = [];
let gridBoard = 3;
let countHole = gridBoard * gridBoard;
let sizeHole = 420 / gridBoard * 0.85;
let frequencySpike = 2;
let updateAnim = 100;
let updateMove = 50;
let score = 0;
let scoreBoard = document.querySelector(".score");
let countLifes = 3;

//---------------- Выполнение программы
btnStart.onclick = function() {
    startGame();
}
btnRestart.onclick = function() {
    location.reload();
}
btnRestart2.onclick = function() {
    location.reload();
}









// -------------------------------------------- ФУНКЦИИ -------------------------------------------
// ------------------------------------------------------------------------------------------------



function startGame() {
    startBoard.style.display = "none";
    game_block.style.display = "flex";
    fillBoard(countHole);
    startTimer(5);
    createLifes();
    addEnemy();
    cheekMouse();
    cursor.style.backgroundImage = "url('img/cursor3.png')";
    body.style.cursor = "none";
}

function endGame() {
    game_block.style.display = "none";
    endGame_block.style.display = "flex";
    cursor.style.backgroundImage = "none";
    body.style.cursor = "auto";
    textLoose.innerHTML = "Вы проиграли!!! Ваш счет: " + score;
}

function winGame() {
    game_block.style.display = "none";
    gameWin.style.display = "flex";
    cursor.style.backgroundImage = "none";
    body.style.cursor = "auto";
    textWin.innerHTML = "Вы выиграли!!! Ваш счет: " + score;
}






//-- Функция заполняет поле количеством отверстий
function fillBoard (countHole) {
    holesList = [];
    for(let i = 0; i < countHole; i++) {
        let hole = document.createElement("div");
        hole.className = "hole";
        hole.id = "";
        hole.style.width = sizeHole + "px";
        hole.style.height = sizeHole + "px";
        board.appendChild(hole);
        holesList.push(hole);
    }
}
//========================================================================== Функция выбора цели (Джери или Спайк)
function addEnemy() {
    let randomX = random(1,frequencySpike);
    // console.log(randomX);
    if (randomX == frequencySpike) addSpike();
    else addJerry();
}

//========================================================================== Функция добавления Спайки
function addSpike() {
    let spike = document.createElement("img");
    spike.id = "spike";
    spike.src = "img/spike_1.png";
    spike.draggable = false;
    let x = random(0, countHole - 1);
    holesList[x].appendChild(spike);
    animSpike(spike);
    spike.className = "act";
}
//========================================================================== Анимация движение Спайки
//----- Анимация спайка лай
function barkSpike(spike) {
    let interval4;
    clearInterval(interval4);
    cntSpike = 1;
    interval4 = setInterval (function() {
        spike.src = "img/spike_" + cntSpike++ +".png";
        if (cntSpike > 2) cntSpike = 1;
    }, updateAnim);
}
function moveSpikeUP(spike) {
    let posSpike = spike.offsetWidth * - 1;
    // console.log(posSpike);
    spike.style.marginLeft = posSpike + "px";
    let interval3;
    clearInterval(interval3);
    interval3 = setInterval (function() {
        spike.style.marginLeft = posSpike + "px";
        posSpike += 7;
        if (posSpike >= spike.offsetWidth) {
            clearInterval(interval3);
            spike.className = "";
            // document.getElementById('spike').parentNode.id = ""
            // console.log(document.getElementById('spike').parentNode.id );
            spike.remove();
            addEnemy();
        }
    }, updateMove)
}
//----- Функция которая запускат анимацию и движение Спайка
function animSpike(spike) {
    barkSpike(spike);
    moveSpikeUP(spike);
}


//========================================================================== Функция добавления Джери
function addJerry() {
    let jerry = document.createElement("img");
    jerry.id = "jerry";
    let x = random(0, countHole - 1);
    holesList[x].appendChild(jerry);
    if (random(1,2) == 1) animJerryLeft(jerry);      // Рандомно запускаем анимацию в разные стороны
    else animJerryRight(jerry);
    jerry.src = "img/jeri_3_1.png";
    jerry.draggable = false;
    // holesList[x].id = "act";
    jerry.className = "act"
    // console.log(holesList[x].id);
    // console.dir(jerry)

}

//========================================================================== Анимация движение Джери влево
//----- Анимация бегающих ног влево
function runJerryLeft(jerry) {
    cnt = 1;
    jerry.style.transform = "scale(1, 1)";
    let interval = setInterval (function() {
        jerry.src = "img/jeri_3_" + cnt++ +".png";
        if (cnt >= 11) cnt = 1;
    }, updateAnim / 2.5);
}
//----- Движение картинки с анимацией влево
function moveJerryLeft(jerry) {
    let posL = jerry.offsetWidth;
    // console.dir(jerry);
    // console.log(posL);
    
    jerry.style.marginLeft = posL + "px";
    let interval2 = setInterval (function() {
        jerry.style.marginLeft = posL + "px";
        posL -= 5;
        if (posL <= (jerry.offsetWidth * -1) - 30 ) {
            clearInterval(interval2);
            // document.getElementById('jerry').parentNode.id = ""
            // console.log(document.getElementById('jerry').parentNode.id );
            jerry.className = "";
            posL = jerry.offsetWidth;
            jerry.remove();
            addEnemy();
        }
    }, updateMove)
}
//----- Функция которая запускат анимацию и движение влево
function animJerryLeft(jerry) {
    runJerryLeft(jerry);
    moveJerryLeft(jerry);
}
//----- Анимация бегающих ног вправо
function runJerryRight(jerry) {
    cnt = 1;
    jerry.style.transform = "scale(-1, 1)";
    let interval66 = setInterval (function() {
        jerry.src = "img/jeri_3_" + cnt++ +".png";
        if (cnt >= 11) cnt = 1;
    }, updateAnim / 2.5);
}
//----- Движение картинки с анимацией вправо
function moveJerryRight(jerry) {
    let pos = jerry.offsetWidth * - 1;
    // console.log(pos);
    jerry.style.marginLeft = pos + "px";
    let interval2 = setInterval (function() {
        jerry.style.marginLeft = pos + "px";
        pos += 5;
        if (pos >= jerry.offsetWidth + 30) {
            clearInterval(interval2);
            // document.getElementById('jerry').parentNode.id = ""
            // console.log(document.getElementById('jerry').parentNode.id );
            jerry.className = "";
            pos = jerry.offsetWidth;
            jerry.remove();
            addEnemy();
        }
    }, updateMove)
}
//----- Функция которая запускат анимацию и движение вправо
function animJerryRight(jerry) {
    runJerryRight(jerry);
    moveJerryRight(jerry);
}

//============================================================================ Таймер отсчета времени
function startTimer (n) {
    let timer = document.querySelector(".timer");
    let count = n;
    setInterval(function() {
        timer.innerHTML = count + "";
        count--;
        if (count == -2) {
            count = n;
            winGame()
        }
    }, 1000);
 }
 // =========================================================================== Жизни
 // переменная для жизней (количество жизней)


// создаем функцию жизней
function createLifes() {
    let lifesBlock = document.querySelector(".info .lifes");
// очищать блок
    lifesBlock.innerHTML = "";
// создаем счетчик
    let count = 1;
// создаем цикл
   while(count < countLifes + 1){
        let span = document.createElement("span");
        lifesBlock.appendChild(span);
        count = count + 1;
   }
 }
// создаем функцию уменьшения жизней, кликнули на собаку
function lifesDown() {
    countLifes = countLifes - 1;
    if (countLifes <= 0) {
        endGame();
    }
    createLifes();
}

//============================================================================== Курсор

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'

})

let cheekMouse = function() {
    window.addEventListener('mousedown', () => {
        cursor.classList.add('active')
        let enemytemp = document.querySelector(".act");
        enemytemp.addEventListener('click', () => {
            if (enemytemp.id == "jerry") {
                soundClickMouse();
                score ++;
                scoreBoard.textContent = "Рахунок: " + score; // переопределить значение очков"
                enemytemp.className = "";
                enemytemp.style.display = "none";
            } else if (enemytemp.id == "spike") {
                soundClickDog();
                lifesDown();
                enemytemp.className = "";
                enemytemp.style.display = "none";
            }
        })
        soundClickEmpty()
        
    })
}


window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})



//============================================================================== Звуковое сопровождение
//музыка
function soundClickDog() { // функция для проигрывания звука удара, используется при клике во время игры
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'sound/dog.mp3'; // Указываем путь к звуку "клика"
    audio.volume = 0.7;
    audio.autoplay = true; // Автоматически запускаем
}
function soundClickMouse() { // функция для проигрывания звука удара, используется при клике во время игры
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'sound/target.mp3'; // Указываем путь к звуку "клика"
    audio.volume = 0.7;
    audio.autoplay = true; // Автоматически запускаем
}
function soundClickEmpty() { // функция для проигрывания звука удара, используется при клике во время игры
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'sound/empty.mp3'; // Указываем путь к звуку "клика"
    audio.volume = 0.7;
    audio.autoplay = true; // Автоматически запускаем
}


// ============================================================================ Функция рандом от и до включительно
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }


