// Dynamically add a new row to the table
function addRow(no, position = '', sampleName = '', primer = 'Premixed') {
    const tableBody = document.querySelector('#sampleTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${no}</td>
        <td><input type="text" value="${position}" placeholder="Position"></td>
        <td><input type="text" value="${sampleName}" placeholder="Sample Name"></td>
        <td><input type="text" value="${primer}" placeholder="Primer"></td>
        <td><button type="button" class="deleteRow">Delete</button></td>
    `;

    // Add delete functionality to the row
    row.querySelector('.deleteRow').addEventListener('click', () => {
        row.remove();
        updateRowNumbers();
    });

    tableBody.appendChild(row);
}

// Update row numbers after deletion
function updateRowNumbers() {
    const rows = document.querySelectorAll('#sampleTable tbody tr');
    rows.forEach((row, index) => {
        row.children[0].textContent = index + 1;
    });
}

// Handle "Add Row" button
document.getElementById('addRow').addEventListener('click', () => {
    const rows = document.querySelectorAll('#sampleTable tbody tr');
    addRow(rows.length + 1);
});

// Handle "Add Multiple Rows" button
document.getElementById('addMultipleRows').addEventListener('click', () => {
    const rowCount = parseInt(document.getElementById('rowCount').value) || 1;
    const rows = document.querySelectorAll('#sampleTable tbody tr');
    let currentCount = rows.length;

    for (let i = 0; i < rowCount; i++) {
        addRow(currentCount + 1 + i);
    }
});

// Form submission handler
document.getElementById('sequencingForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Gather form data
    const data = [];
    const rows = document.querySelectorAll('#sampleTable tbody tr');
    rows.forEach((row) => {
        const position = row.children[1].querySelector('input').value;
        const sampleName = row.children[2].querySelector('input').value;
        const primer = row.children[3].querySelector('input').value;
        data.push({ position, sampleName, primer });
    });

    // Display gathered data in console (or send to server)
    console.log('Submitted Data:', data);
    alert('Form submitted! Check the console for details.');
});
