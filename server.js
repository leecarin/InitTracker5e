const express = require("express");
const { engine } = require('express-handlebars');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");
app.use(express.urlencoded({ extended: true })); // For parsing form data

//Test Data
let characters = [
    { init: 1, name: "Alice", ac: 15, current_hp: 10, max_hp: 20 },
    { init: 2, name: "Bob", ac: 12, current_hp: 8, max_hp: 15, }
];

app.get("/", (req, res) => {
    res.redirect("/tracker");
})

app.get("/tracker", (req, res) => {
    res.render("tracker", { characters });
});

app.post("/save", (req, res) => {
    const updatedCharacters = [];
    const characterCount = Object.keys(req.body).length / 6;

    for (let i = 0; i < characterCount; i++) {
        updatedCharacters.push({
            init: req.body[`init-${i}`] || '',
            name: req.body[`name-${i}`] || '',
            ac: req.body[`ac-${i}`] || '',
            current_hp: req.body[`current_hp-${i}`] || '',
            max_hp: req.body[`max_hp-${i}`] || '',
            dmg: req.body[`dmg-${i}`] || ''
        });
    }
    characters = updatedCharacters;
    res.redirect("/tracker");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//TODO: set up mongoDB
