// -------------------------------------------ПЕРЕМЕННЫЕ
let board = document.querySelector(".board");
let cursor = document.querySelector(".cursor");
let holesList = [];
let gridBoard = 3;
let countHole = gridBoard * gridBoard;
let sizeHole = board.offsetHeight / gridBoard * 0.85;
let frequencySpike = 1;

//---------------- Выполнение программы


fillBoard(countHole);
startTimer(10);
addJerry();














// -------------------------------------------- ФУНКЦИИ -------------------------------------------
// ------------------------------------------------------------------------------------------------

//-- Функция заполняет поле количеством отверстий
function fillBoard (countHole) {
    holesList = [];
    for(let i = 0; i < countHole; i++) {
        let hole = document.createElement("div");
        hole.className = "hole";
        hole.style.width = sizeHole + "px";
        hole.style.height = sizeHole + "px";
        board.appendChild(hole);
        holesList.push(hole);
    }
}
//========================================================================== Функция выбора цели (Джери или Спайк)
function addEnemy() {
    let randomX = random(1,frequencySpike);
    console.log(randomX);
    if (randomX == frequencySpike) addSpike();
    else addJerry();
}

//========================================================================== Функция добавления Спайки
function addSpike() {
    let spike = document.querySelector("#spike");
    let x = random(0, countHole - 1);
    holesList[x].appendChild(spike);
    spike.style.display = "block";
    animSpike();
}
//========================================================================== Анимация движение Спайки
//----- Анимация спайка лай
function barkSpike() {
    cnt = 1;
    let interval4 = setInterval (function() {
        spike.src = "img/spike_" + cnt++ +".png";
        if (cnt > 2) cnt = 1;
        if (posSpike >= spike.offsetWidth + 30) {
            clearInterval(interval4);
        }
    }, 300);
}
function moveSpikeUP() {
    let posSpike = spike.offsetWidth * - 1;
    spike.style.marginLeft = posSpike + "px";
    let interval3 = setInterval (function() {
        spike.style.marginLeft = posSpike + "px";
        posSpike += 5;
        if (posSpike >= spike.offsetWidth + 30) {
            clearInterval(interval3);
            addEnemy();
        }
    }, 50)
}
//----- Функция которая запускат анимацию и движение Спайка
function animSpike() {
    barkSpike();
    moveSpikeUP();
}


//========================================================================== Функция добавления Джери
function addJerry() {
    let jerry = document.querySelector("#jerry");
    let x = random(0, countHole - 1);
    holesList[x].appendChild(jerry);
    if (random(1,2) == 1) animJerryLeft();      // Рандомно запускаем анимацию в разные стороны
    else animJerryRight();

}

//========================================================================== Анимация движение Джери влево
//----- Анимация бегающих ног влево
function runJerryLeft() {
    cnt = 1;
    jerry.style.transform = "scale(1, 1)";
    let interval = setInterval (function() {
        jerry.src = "img/jeri_3_" + cnt++ +".png";
        if (cnt >= 11) cnt = 1;
    }, 40);
}
//----- Движение картинки с анимацией влево
function moveJerryLeft() {
    let pos = jerry.offsetWidth;
    jerry.style.marginLeft = pos + "px";
    let interval2 = setInterval (function() {
        jerry.style.marginLeft = pos + "px";
        pos -= 9;
        if (pos <= (jerry.offsetWidth * -1) - 30 ) {
            clearInterval(interval2);
            addJerry();
        }
    }, 50)
}
//----- Функция которая запускат анимацию и движение влево
function animJerryLeft() {
    runJerryLeft();
    moveJerryLeft();
}
//----- Анимация бегающих ног вправо
function runJerryRight() {
    cnt = 1;
    jerry.style.transform = "scale(-1, 1)";
    let interval66 = setInterval (function() {
        jerry.src = "img/jeri_3_" + cnt++ +".png";
        if (cnt >= 11) cnt = 1;
    }, 40);
}
//----- Движение картинки с анимацией вправо
function moveJerryRight() {
    let pos = jerry.offsetWidth * - 1;
    jerry.style.marginLeft = pos + "px";
    let interval2 = setInterval (function() {
        jerry.style.marginLeft = pos + "px";
        pos += 9;
        if (pos >= jerry.offsetWidth + 30) {
            clearInterval(interval2);
            addJerry();
        }
    }, 50)
}
//----- Функция которая запускат анимацию и движение вправо
function animJerryRight() {
    runJerryRight();
    moveJerryRight();
}

//============================================================================ Таймер отсчета времени
function startTimer (n) {
    let timer = document.querySelector(".timer");
    let count = n;
    setInterval(function() {
        timer.innerHTML = count + "";
        count--;
        if (count == -1) {
            // alert("Таймер окончен, хотите перезапустить страницу?");
            count = n;
            // location.reload;
        }
    }, 1000);
 }
 // =========================================================================== Жизни
 // переменная для жизней (количество жизней)
countLifes = 5;

// создаем функцию жизней
function createLifes() {
    let lifesBlock = document.querySelector(".info .lifes");
// очищать блок
    lifesBlock.innerHTML = "";
// создаем счетчик
    let count = 0;
// создаем цикл
   while(count < countLifes){
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
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})

// ============================================================================ Функция рандом от и до включительно
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

