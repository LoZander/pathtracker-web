import { Character, CharacterEntry, CharacterObserver, CharacterType, Tracker } from "../framework/interfaces.js";

export class CharacterEntryImpl implements CharacterEntry,CharacterObserver {
    _entryDiv: HTMLDivElement;
    _character: Character;
    _nameDiv: HTMLDivElement;
    _initDiv: HTMLDivElement;
    constructor(character: Character, tracker: Tracker) {
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
        if(character.type == CharacterType.ENEMY) this.entryDiv.classList.add("enemy");

        let removeButton = document.createElement('button');
        removeButton.addEventListener('click', () => {
            tracker.remove(character.name);
        });

        removeButton.classList.add('removeButton');
        
        let removeButtonText = document.createTextNode('\xD7');
        removeButton.appendChild(removeButtonText);
        
        this.entryDiv.appendChild(removeButton);
        
        this.setInTurn(tracker.characterInTurn);
    }

    setInTurn(inturn: Character) {
        if(this._character === inturn) {
            this.entryDiv.classList.add("inturn");
        } else {
            this.entryDiv.classList.remove("inturn");
        }
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
        this.setInTurn(inturn);
    }
}