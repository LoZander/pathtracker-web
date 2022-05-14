import { Character, CharacterEntry, CharacterObserver, CharacterType, Tracker } from "../framework/interfaces.js";

export class CharacterEntryImpl implements CharacterEntry,CharacterObserver {
    _entryDiv: HTMLDivElement;
    _character: Character;
    _nameDiv: HTMLDivElement;
    _initDiv: HTMLDivElement;
    constructor(character: Character, tracker: Tracker) {
        this._entryDiv = document.createElement('div');
        this._character = character;

        const initDiv = this.createInitDiv(character.initiative);
        this.entryDiv.appendChild(initDiv);

        const nameDiv = this.createNameDiv(character.name);
        this.entryDiv.appendChild(nameDiv);        
        
        const removeButton = this.createRemoveButton(character.name, tracker);
        this.entryDiv.appendChild(removeButton);
        
        this.entryDiv.classList.add('character');
        if(character.type == CharacterType.ENEMY) this.entryDiv.classList.add('enemy');
        
        this.setInTurn(tracker.characterInTurn);
    }


    private createInfoDiv(value: string): HTMLDivElement {
        const infoDiv = document.createElement('div');
        const infoText = document.createTextNode(value);
        infoDiv.appendChild(infoText);
        return infoDiv;
    }

    private createInitDiv(initiative: number): HTMLDivElement {
        const initDiv = this.createInfoDiv(initiative + '')
        initDiv.classList.add("init");
        return initDiv;
    }

    private createNameDiv(name: string): HTMLDivElement {
        const nameDiv = this.createInfoDiv(name);
        nameDiv.classList.add("name");
        return nameDiv;
    }

    private createRemoveButton(name: string,tracker: Tracker): HTMLButtonElement {
        const removeButton = document.createElement('button');
        const removeButtonText = document.createTextNode('\xD7'); // Adds cross to remove button
        removeButton.appendChild(removeButtonText);
        
        removeButton.classList.add('removeButton');
        
        removeButton.addEventListener('click', () => {
            tracker.remove(name);
        });

        return removeButton;
    }

    setInTurn(inturn: Character) {
        if(this._character === inturn) {
            this.entryDiv.classList.add('inturn');
            this.entryDiv.scrollIntoView();
        } else {
            this.entryDiv.classList.remove('inturn');
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