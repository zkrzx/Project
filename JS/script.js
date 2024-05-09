document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');

    // Recuperar estado guardado al cargar la página
    const markedCells = JSON.parse(localStorage.getItem('markedCells')) || [];

    // Crear celdas del tablero con números del 1 al 50
    for (let i = 1; i <= 50; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.number = i;
        cell.textContent = i;
        cell.addEventListener('click', () => markCell(cell));

        // Marcar celdas si están en el estado guardado
        if (markedCells.includes(i)) {
            cell.classList.add('marked');
        }

        board.appendChild(cell);
    }

    resetButton.addEventListener('click', () => resetCells());

    function markCell(cell) {
        cell.classList.toggle('marked');
        const number = parseInt(cell.dataset.number);
        const markedCells = JSON.parse(localStorage.getItem('markedCells')) || [];
        if (markedCells.includes(number)) {
            markedCells.splice(markedCells.indexOf(number), 1);
        } else {
            markedCells.push(number);
        }
        localStorage.setItem('markedCells', JSON.stringify(markedCells));
    }
    

    function resetCells() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('marked'));
        localStorage.removeItem('markedCells');
    }
});

// Función para marcar o desmarcar una celda y emitir un evento personalizado
function markCell(cell) {
    cell.classList.toggle('marked');
    const number = parseInt(cell.dataset.number);
    if (markedCells.includes(number)) {
        markedCells.splice(markedCells.indexOf(number), 1);
        document.dispatchEvent(new CustomEvent('cellUnmarked', { detail: number }));
    } else {
        markedCells.push(number);
        document.dispatchEvent(new CustomEvent('cellMarked', { detail: number }));
    }
    localStorage.setItem('markedCells', JSON.stringify(markedCells)); // Guardar los números marcados en el almacenamiento local
}
