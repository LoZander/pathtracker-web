var _a;
import { CharacterType } from './pathtracker/framework/interfaces.js';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl.js';
let list = document.getElementById("characters");
const tracker = new TrackerImpl();
function update() {
    list.innerHTML = "";
    tracker.characters.forEach(e => {
        let entry = document.createElement('li');
        let entryText = document.createTextNode(e.initiative + " " + e.name);
        entry.appendChild(entryText);
        if (list !== null) {
            list.appendChild(entry);
        }
    });
}
let add = () => {
    let nameField = document.getElementById("nameInput");
    let initiativeField = document.getElementById("initInput");
    let name = nameField.value;
    let initiative = initiativeField.value;
    console.log(name + initiative);
    tracker.addCharacter(name, parseInt(initiative), CharacterType.player);
    console.log(tracker.characters);
    update();
};
(_a = document.getElementById("addButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", add);
window.onload = () => {
    update();
};
