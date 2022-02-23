import { Character, CharacterEntry, CharacterObserver, Tracker } from "../framework/interfaces";

export class CharacterEntryImpl implements CharacterEntry,CharacterObserver {
    _entryDiv: HTMLDivElement;
    _character: Character;
    _nameDiv: HTMLDivElement;
    _initDiv: HTMLDivElement;
    constructor(character: Character) {
        this._entryDiv = document.createElement("div");
        this._character = character;
        let initDiv = document.createElement("div");
        initDiv.textContent = character.initiative + "";

        let nameDiv = document.createElement("div");
        nameDiv.textContent = character.name;

        this.entryDiv.appendChild(initDiv);
        this.entryDiv.appendChild(nameDiv);

        this.entryDiv.classList.add("character");
        initDiv.classList.add("init");
        nameDiv.classList.add("name");
    }

    get entryDiv(): HTMLDivElement {
        return this._entryDiv;
    }

    nameChanged(name: string): void {
        throw new Error("Method not implemented.");
    }
    initiativeChanged(initiative: number): void {
        throw new Error("Method not implemented.");
    }
    characterInTurnChanged(inturn: Character): void {
        if(this._character === inturn) this.entryDiv.classList.add("inturn");
    }
}