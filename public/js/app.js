document.addEventListener('DOMContentLoaded', () => {
    function sortTable() {
        // Get the table body
        const tableBody = document.querySelector('#charactersTable tbody');
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        // Sort the rows based on the initiative value
        rows.sort((rowA, rowB) => {
            // Extract initiative values
            const initA = parseFloat(rowA.querySelector('input[name^="init-"]').value) || 0;
            const initB = parseFloat(rowB.querySelector('input[name^="init-"]').value) || 0;

            // Compare in descending order
            return initB - initA;
        });

        // Append sorted rows back to the table body
        rows.forEach(row => tableBody.appendChild(row));
    }

    sortTable();

    document.querySelector('#charactersTable').addEventListener('input', (event) => {
        if (event.target.classList.contains('damage-taken')) {
            const row = event.target.closest('tr');
            const currentHpInput = row.querySelector('input[name^="current_hp-"]');
            const damageTaken = parseFloat(event.target.value) || 0;
            const currentHp = parseFloat(currentHpInput.value) || 0;

            currentHpInput.value = Math.max(currentHp - damageTaken, 0); // Ensure HP does not go below 0
        }
    });

    document.getElementById('addRow').addEventListener('click', () => {
        const tableBody = document.querySelector('#charactersTable tbody');
        const rowCount = tableBody.querySelectorAll('tr').length;
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><input type="number" name="init-${rowCount}" class="form-control" /></td>
            <td><input type="text" name="name-${rowCount}" class="form-control" /></td>
            <td><input type="number" name="ac-${rowCount}" class="form-control" /></td>
            <td><input type="number" name="current_hp-${rowCount}" class="form-control" /></td>
            <td><input type="number" name="max_hp-${rowCount}" class="form-control" /></td>
            <td><input type="number" name="dmg-${rowCount}" class="form-control" /></td>
            <td><button type="button" class="btn btn-secondary btn-sm remove-row">Remove</button></td>
        `;

        tableBody.appendChild(newRow);
    });

    document.querySelector('#charactersTable').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-row')) {
            event.target.closest('tr').remove();
        }
    });
});
