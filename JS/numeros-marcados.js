// Función para limpiar el tablero y actualizar la lista de números marcados
function clearBoard() {
    // Limpiar el almacenamiento local
    localStorage.removeItem('markedCells');
    // Actualizar la lista visualmente
    updateMarkedNumbersList();
}

// Función para guardar información adicional en el almacenamiento local
function saveAdditionalInfo(number, info) {
    localStorage.setItem(`info_${number}`, info);
}

// Función para obtener la información adicional asociada a un número
function getAdditionalInfo(number) {
    return localStorage.getItem(`info_${number}`) || '';
}

// Función para actualizar la lista de números marcados
function updateMarkedNumbersList() {
    const markedNumbersList = document.getElementById('markedNumbers');
    // Limpiar la lista antes de volver a generarla
    markedNumbersList.innerHTML = '';

    // Obtener los números marcados del almacenamiento local
    let markedCells = JSON.parse(localStorage.getItem('markedCells')) || [];

    // Ordenar los números marcados
    markedCells.sort((a, b) => a - b);

    markedCells.forEach(number => {
        const listItem = document.createElement('li');
        listItem.textContent = `Número ${number}`;

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Ingrese información adicional';
        inputField.dataset.number = number;
        inputField.value = getAdditionalInfo(number); // Obtener información adicional guardada

        inputField.addEventListener('input', (event) => {
            saveAdditionalInfo(event.target.dataset.number, event.target.value);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.number = number; // Establecer el número asociado al botón de eliminar
        deleteButton.addEventListener('click', (event) => {
            const numberToDelete = event.currentTarget.dataset.number; // Obtener el número asociado al botón de eliminar
            localStorage.removeItem(`info_${numberToDelete}`); // Eliminar la información adicional asociada al número
            updateMarkedNumbersList(); // Actualizar la lista visualmente
        });

        listItem.appendChild(inputField);
        listItem.appendChild(deleteButton);
        markedNumbersList.appendChild(listItem);
    });
}

// Llamar a la función para generar la lista inicialmente
updateMarkedNumbersList();