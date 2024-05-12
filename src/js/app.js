let btn = document.querySelector("#add-row");
let table = document.querySelector("#table-body");

//Add a row when + button clicked
btn.addEventListener("click", function () {
    let row = document.createElement("tr");

    let init_td = document.createElement("td");
    let name_td = document.createElement("td");
    let ac_td = document.createElement("td");
    let currentHP_td = document.createElement("td");
    let maxHP_td = document.createElement("td");
    let dmg_td = document.createElement("td");
    let remove_td = document.createElement("td");

    let initInput = document.createElement("input");
    updateInputAttributes(initInput, "number", "init", "init");
    init_td.appendChild(initInput);
    row.appendChild(init_td);

    let nameInput = document.createElement("input");
    updateInputAttributes(nameInput, "text", "name", "name");
    name_td.appendChild(nameInput);
    row.appendChild(name_td);

    let acInput = document.createElement("input");
    updateInputAttributes(acInput, "number", "armour-class", "armour-class");
    ac_td.appendChild(acInput);
    row.appendChild(ac_td);

    let currentHPInput = document.createElement("input");
    updateInputAttributes(currentHPInput, "number", "current-hp", "current-hp");
    currentHP_td.appendChild(currentHPInput);
    row.appendChild(currentHP_td);

    let maxHPInput = document.createElement("input");
    updateInputAttributes(maxHPInput, "number", "max-hp", "max-hp");
    maxHP_td.appendChild(maxHPInput);
    row.appendChild(maxHP_td);

    let dmgInput = document.createElement("input");
    updateInputAttributes(dmgInput, "number", "dmg", "dmg");
    dmg_td.appendChild(dmgInput);
    row.appendChild(dmg_td);

    //TODO: add click event on trash button to remove row
    let removeBtn = document.createElement("button");
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    removeBtn.appendChild(trashIcon);
    remove_td.appendChild(removeBtn);
    row.appendChild(remove_td);


    table.appendChild(row);
});

function updateInputAttributes(element, type, classAttr, nameAttr, min = 0) {
    if (type === "number") {
        element.min = min;
    }
    element.type = type;
    element.classList.add(classAttr);
    element.name = nameAttr;
}

//TODO: Sort table rows by initiative order
