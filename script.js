let cells = document.querySelectorAll('#field td');
let modal = document.querySelector('#modal');
let btnReload = document.querySelector('#btnReload');



// this - объект 'перед точкой' , который используется для вызова метода
function start(cells) {
    // gameOver - переменная для проверки окончания игры
    let gameOver = false;

    // Счетчик ходов
    let i = 0
    for (let cell of cells) {
        cell.addEventListener('click', function step() {
            // Если игра окончена то выйти из функции
            if (gameOver) {
                return;
            }
            // крести появляется ена четное значение счтчика, а 0 на нечетное
            if (i % 2 == 0) {
                this.textContent = '✕';
            } else {
                this.textContent = '⬯'
            }
            // Удалить обработку клика чтобы крестик не менялся на нолик в этой же ячейке
            this.removeEventListener('click', step)

            if (isWinner(cells)) {
                modal.textContent = `Победил ${this.textContent}`;
                gameOver = true;
                for (let cell of cells) {
                    cell.removeEventListener('click'.step);
                }
            } else if (i === 8) {
                modal.textContent = 'Нет победителя'
                gameOver = true;
            }
            // увеличить счетчик на
            i++;
        })
    }

}

function isWinner(cells) {
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    //по очереди в цикле проверяются все возможные комбинации и в результате
    // если есть совпавшие комбинации то функция возвращает true
    for (let comb of combs) {
        if (cells[comb[0]].textContent == cells[comb[1]].textContent &&
            cells[comb[1]].textContent == cells[comb[2]].textContent &&
            cells[comb[0]].textContent != '') {
            return true;
        }
    }
    return false;
}


// Кнопка перезапуска игры
btnReload.addEventListener('click', () => {
    // Перебрать и отчистить все ячейки
    for (let cell of cells) {
        cell.textContent = '';
    }
    // Отчистить поле с выводом результатов
    modal.textContent = '';
    // Перезапустить игру
    start(cells);

})


start(cells);

// cells = [td0, td1, td2, td3, td4, td5, td4, td5, td6, td7, td8]

// combs = [  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]

// [0, 1, 2]
