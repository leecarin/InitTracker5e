let addBtn = document.querySelector("#add-row");
let table = document.querySelector("#table-body");
let rows = document.querySelectorAll(".input-row")

let rmBtns = document.querySelectorAll(".rm-btn");
for (let i = 0; i < rmBtns.length; i++) {
    rmBtns[i].onclick = function () {
        rows.forEach((elem) => deleteRow(elem));
    }
}

//Add a row when + button clicked
addBtn.addEventListener("click", function () {
    let row = document.createElement("tr");
    row.classList.add("input-row");

    let init_td = row.insertCell();
    let name_td = row.insertCell();
    let ac_td = row.insertCell();
    let currentHP_td = row.insertCell();
    let maxHP_td = row.insertCell();
    let dmg_td = row.insertCell();
    let remove_td = row.insertCell();

    let initInput = document.createElement("input");
    updateInputAttributes(initInput, "number", "init", "init");
    init_td.appendChild(initInput);

    let nameInput = document.createElement("input");
    updateInputAttributes(nameInput, "text", "name", "name");
    name_td.appendChild(nameInput);

    let acInput = document.createElement("input");
    updateInputAttributes(acInput, "number", "armour-class", "armour-class");
    ac_td.appendChild(acInput);

    let currentHPInput = document.createElement("input");
    updateInputAttributes(currentHPInput, "number", "current-hp", "current-hp");
    currentHP_td.appendChild(currentHPInput);

    let maxHPInput = document.createElement("input");
    updateInputAttributes(maxHPInput, "number", "max-hp", "max-hp");
    maxHP_td.appendChild(maxHPInput);

    let dmgInput = document.createElement("input");
    updateInputAttributes(dmgInput, "number", "dmg", "dmg");
    dmg_td.appendChild(dmgInput);

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("rm-btn");
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    removeBtn.appendChild(trashIcon);
    remove_td.appendChild(removeBtn);

    table.appendChild(row);

    // Add damage calculation on change with debouncing
    let debounceTimer;
    dmgInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            updateCurrentHP(row);
        }, 500); // Adjust the delay as necessary
    });

    // //Remove row if trash can button clicked
    removeBtn.onclick = function () {
        deleteRow(row);
    }

});

function updateInputAttributes(element, type, classAttr, nameAttr) {
    element.type = type;
    element.classList.add(classAttr);
    element.name = nameAttr;
}

function deleteRow(tr) {
    console.log(`Row index is ${tr.rowIndex}`);
    let idx = tr.rowIndex;
    table.deleteRow(idx - 1);   //to avoid running out of bounds
}


function sortTable() {
    let rows = Array.from(table.querySelectorAll("tr"));
    rows.sort((rowA, rowB) => {
        let initA = parseFloat(rowA.querySelector(".init").value);
        let initB = parseFloat(rowB.querySelector(".init").value);
        return initB - initA;
    });

    rows.forEach(row => table.appendChild(row));
}

function updateCurrentHP(row) {
    let currentHPInput = row.querySelector(".current-hp");
    let dmgInput = row.querySelector(".dmg");

    let currentHP = parseFloat(currentHPInput.value) || 0;
    let damageTaken = parseFloat(dmgInput.value) || 0;

    // Calculate new HP
    let newHP = currentHP - damageTaken;

    // Update the current HP value
    currentHPInput.value = newHP;
}

//Event Listeners for Existing Content
let sortBtn = document.querySelector("#sort-btn");
sortBtn.addEventListener("click", sortTable);

document.querySelectorAll(".dmg").forEach(input => {
    let debounceTimer;
    input.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            updateCurrentHP(this.closest("tr"));
        }, 500); // Adjust the delay as necessary
    });
});