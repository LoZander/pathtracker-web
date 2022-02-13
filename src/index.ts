import { CharacterType } from './pathtracker/framework/interfaces.js';
import {TrackerImpl} from './pathtracker/standard/TrackerImpl.js';
let list = (<HTMLLIElement> document.getElementById("characters"));
const tracker = new TrackerImpl();
tracker.addCharacter("Test1", 30, CharacterType.player);
tracker.addCharacter("Test2", 10, CharacterType.player);
tracker.addCharacter("Test3", 2, CharacterType.enemy);
tracker.addCharacter("Test4", 20, CharacterType.enemy);
tracker.addCharacter("Test5", 23, CharacterType.player);

function update() {
    list.innerHTML = "";
    tracker.characters.forEach(e => {
        let entry = createEntry(e.name, e.initiative, e.type);
        list.append(entry);
    });
}

function createEntry(name: string, initiative: number, type: CharacterType): HTMLDivElement {
    let entry = document.createElement("div");
    let initDiv = document.createElement("div");
    initDiv.textContent = initiative + "";

    let nameDiv = document.createElement("div");
    nameDiv.textContent = name;

    entry.appendChild(initDiv);
    entry.appendChild(nameDiv);

    entry.classList.add("character");
    initDiv.classList.add("init");
    nameDiv.classList.add("name");
    if(tracker.characterInTurn === null) return entry;
    if(tracker.characterInTurn.name === name) entry.classList.add("inturn");
    return entry;
}

let add = () => {
    let name = getNameInput()
    let initiative = getInitiativeInput();
    tracker.addCharacter(name, initiative, CharacterType.player);

    update();
}

let nextTurn = () => {
    tracker.nextTurn();
    update();
}

function getNameInput(): string {
    return getInputValue("nameInput");
}

function getInitiativeInput(): number {
    return parseInt(getInputValue("initInput"));
}

function getInputValue(id: string): string {
    return (<HTMLInputElement> document.getElementById(id)).value;
}

document.getElementById("addButton").addEventListener("click", add);
document.getElementById("nextTurnButton").addEventListener("click", nextTurn);

window.onload = () => {
    update();
}