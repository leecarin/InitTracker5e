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

    //Remove row if trash can button clicked
    removeBtn.onclick = function () {
        deleteRow(row);
    }
});

function updateInputAttributes(element, type, classAttr, nameAttr, min = 0) {
    if (type === "number") {
        element.min = min;
        element.value = 0;
    }
    element.type = type;
    element.classList.add(classAttr);
    element.name = nameAttr;
}

function deleteRow(tr) {
    console.log(`Row index is ${tr.rowIndex}`);
    let idx = tr.rowIndex;
    table.deleteRow(idx - 1);   //to avoid running out of bounds
}

//TODO: Sort table rows by initiative order - to debug, values inside input not being read
function sortTable(table) {
    let rows = table.rows;
    let swap;
    switchFlag = true;

    while (switchFlag) {
        switchFlag = false;

        for (i = 1; i < rows.length; i++) {
            swap = false;
            first = rows[i].getElementsByTagName("td")[0];  //to fix to get input values instead
            second = rows[i + 1].getElementsByTagName("td")[0];

            if (first.value > second.value) {
                swap = true;
                break;
            }
        }

        if (swap) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switchFlag = true;
        }
    }
}

let sort = document.querySelector("#sort-btn");
sort.onclick = sortTable(table);

