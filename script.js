//============================================ ПЕРЕМЕННЫЕ =============================================
//=====================================================================================================

//------------- Блок настроек ---------------
let gridBoard = 4;          // размер сетки игрового поля
let frequencySpike = 3;     // частота появления спайки
let updateMove = 45;        // скрость движения героев (частота перемещения картинки)
let countLifes = 3;         // Кол-во жизней
let timeSec = 15;           // Установка таймера игры

//------------- Вспомогательные ---------------
let board = document.querySelector(".board");               // Игровое поле
let cursor = document.querySelector(".cursor");             // Картинка курсора при активации игры
let info = document.querySelector(".info");                 // Информационный блок
let intervalTimer;                                          // Интервал который работает в таймере
let score = 0;                                              // счетчик для блока очков
let scoreBoard = document.querySelector(".score");          // Блок для очков
let btnSound = document.querySelector(".sound");            // Кнопка звука
let img_sound = document.querySelector(".img_sound")        // Иконка кнопки звука
var audio = new Audio();                                    // Звуковой файл фоновой музыки
    audio.src = 'sound/main.mp3'; 
    audio.volume = 0.3;
let startBoard = document.querySelector(".start");          // Блок старта
let body = document.querySelector("body");                  // Тело страницы
let title = document.querySelector("title");                // Лого во время игрового процесса
let btnStart = document.querySelector("#btnStart");         // Кнопка старта
let btnRestart = document.querySelector(".btnRestart");     // Кнопка рестарта при проиграше
let btnRestart2 = document.querySelector(".btnRestart2");   // Кнопка рестарта при выиграше
let game_block = document.querySelector(".game_block");     // Общий блок при игровом процессе (лого инфо блок и игровое поле)
let endGame_block = document.querySelector(".endGame");     // Блок окончания инры при проиграше
let textLoose = document.querySelector(".textLoose");       // Текст блока при проиграше
let gameWin = document.querySelector(".gameWin");           // Блок окончания инры при выиграше
let textWin = document.querySelector(".textWin");           // Текст блока при выиграш
let holesList = [];                                         // масив для отверстий в игровом поле
let countHole = gridBoard * gridBoard;                      // количество отверстий
let sizeHole = 420 / gridBoard * 0.85;                      // автоматически расчитываем размер каждого отверстия при изминение размера сетки
let updateAnim = 100;                                       // частота для анимации героев


//============================================ СОБЫТИЯ ================================================
//=====================================================================================================
btnStart.onclick = function() {
    startGame();
}
btnRestart.onclick = function() {
    location.reload();
}
btnRestart2.onclick = function() {
    location.reload();
}
btnSound.onclick = function() {
    if(!audio.paused) {
        img_sound.src = "img/volume_off.png";
        audio.pause()
    }
    else {
        img_sound.src = "img/volume_on.png";
        audio.play()
    }
}

//============================================ ФУНКЦИИ ================================================
//=====================================================================================================

//========================= Функции при старте и окончании игры

// ------------------------------------ Запуск игры
function startGame() {
    startBoard.style.display = "none";
    game_block.style.display = "flex";
    fillBoard(countHole);
    startTimer(timeSec);
    createLifes();
    addEnemy();
    cheekMouse();
    cursor.style.backgroundImage = "url('img/cursor3.png')";
    body.style.cursor = "none";
    img_sound.src = "img/volume_on.png";
    audio.play()
}

// ------------------------------------ При завершении (проиграл)
function endGame() {
    game_block.style.display = "none";
    endGame_block.style.display = "flex";
    cursor.style.backgroundImage = "none";
    body.style.cursor = "auto";
    textLoose.innerHTML = "Програш. Ваш рахунок:  " + score;
    clearInterval(intervalTimer);
    img_sound.src = "img/volume_off.png";
        audio.pause()
}

// ------------------------------------ При завершении (выиграл)
function winGame() {
    game_block.style.display = "none";
    gameWin.style.display = "flex";
    cursor.style.backgroundImage = "none";
    body.style.cursor = "auto";
    textWin.innerHTML = "Вітаємо!!! Ваш рахунок: " + score;
    img_sound.src = "img/volume_off.png";
        audio.pause()
}

//------------------ Функция заполняет поле количеством отверстий
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
//========================= Вид курсора и дейсвия при нажатии на левую кнопку мыши
function cheekMouse() {
    window.addEventListener('mousedown', () => {
        cursor.classList.add('active')
        let enemytemp = document.querySelector(".act");
        enemytemp.addEventListener('click', () => {
            if (enemytemp.id == "jerry") {
                soundClickMouse();
                score += 10;
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
    window.addEventListener('mousemove', e => {
        cursor.style.top = e.pageY + 'px'
        cursor.style.left = e.pageX + 'px'
    })
    window.addEventListener('mouseup', () => {
        cursor.classList.remove('active')
    })
}

//===================================================== Функция выбора цели (Джери или Спайк)
function addEnemy() {
    let randomX = random(1,frequencySpike);
    // console.log(randomX);
    if (randomX == frequencySpike) addSpike();
    else addJerry();
}

//================================================================ Функция добавления Спайки
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
//================================================================ Анимация движение Спайки
//------------ Анимация спайка лай
function barkSpike(spike) {
    let interval4;
    clearInterval(interval4);
    cntSpike = 1;
    interval4 = setInterval (function() {
        spike.src = "img/spike_" + cntSpike++ +".png";
        if (cntSpike > 2) cntSpike = 1;
    }, updateAnim);
}
// ---------- Движение картинки
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
            spike.remove();
            addEnemy();
        }
    }, updateMove)
}
//----- Запуск анимации и движения спайки
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
    jerry.draggable = false;                        // запрещаем передвигать картинку при клике
    jerry.className = "act"
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
    jerry.style.marginLeft = posL + "px";
    let interval2 = setInterval (function() {
        jerry.style.marginLeft = posL + "px";
        posL -= 5;
        if (posL <= (jerry.offsetWidth * -1) - 30 ) {
            clearInterval(interval2);
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
            jerry.className = "";
            pos = jerry.offsetWidth;
            jerry.remove();
            addEnemy();
        }
    }, updateMove)
}

//----- Запускает анимацию и движение вправо
function animJerryRight(jerry) {
    runJerryRight(jerry);
    moveJerryRight(jerry);
}

//============================================================================== Таймер отсчета времени
function startTimer (n) {
    let timer = document.querySelector(".timer");
    let count = n;
    intervalTimer = setInterval(function() {
        timer.innerHTML = count + "";
        count--;
        if (count == -2) {
            count = n;
            winGame()
        }
    }, 1000);
 }

// ============================================================================= Жизни

// ------------   создаем функцию жизней
function createLifes() {
    let lifesBlock = document.querySelector(".info .lifes");
    lifesBlock.innerHTML = "";
    let count = 1;
    while(count < countLifes + 1){
        let span = document.createElement("span");
        lifesBlock.appendChild(span);
        count = count + 1;
   }
 }

// -------------- уменьшения жизней, кликнули на собаку
function lifesDown() {
    countLifes = countLifes - 1;
    if (countLifes <= 0) {
        endGame();
    }
    createLifes();
}

//============================================================================== Звуковое сопровождение

//------------------- Звук при попадании в спайки
function soundClickDog() {          // функция для проигрывания звука удара, используется при клике во время игры
    var audio = new Audio();        // Создаём новый элемент Audio
    audio.src = 'sound/dog.mp3';    // Указываем путь к звуку "клика"
    audio.volume = 0.7;
    audio.autoplay = true;          // Автоматически запускаем
}

//------------------- Звук при попадании в джери
function soundClickMouse() {        // функция для проигрывания звука удара, используется при клике во время игры
    var audio = new Audio();        // Создаём новый элемент Audio
    audio.src = 'sound/target.mp3'; // Указываем путь к звуку "клика"
    audio.volume = 0.7;
    audio.autoplay = true;          // Автоматически запускаем
}

//------------------- Звук при ударе молотка
function soundClickEmpty() {        // функция для проигрывания звука удара, используется при клике во время игры
    var audio = new Audio();        // Создаём новый элемент Audio
    audio.src = 'sound/empty.mp3';  // Указываем путь к звуку "клика"
    audio.volume = 0.7;
    audio.autoplay = true;          // Автоматически запускаем
}

//============================================================================ Функция рандом от и до включительно
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }


