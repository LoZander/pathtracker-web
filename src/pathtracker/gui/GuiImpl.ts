import { Character, CharacterType, Gui, Tracker, TrackerObserver } from "../framework/interfaces.js";
import { TrackerImpl } from "../standard/TrackerImpl.js";
import { CharacterEntryImpl } from "./CharacterEntryImpl.js";

export class GuiImpl implements Gui,TrackerObserver {
    _tracker: Tracker;
    _charactersDiv: HTMLDivElement;

    constructor(tracker: Tracker) {
        this._tracker = tracker;
        tracker.addTrackerObserver(this);
        this._charactersDiv = <HTMLDivElement> document.getElementById("characters");
    }
    
    update(): void {
        this._charactersDiv.innerHTML = "";
        this._tracker.characters.forEach(e => {
            let entry = new CharacterEntryImpl(e,this._tracker);
            this._tracker.addCharacterObserver(entry);
            this._charactersDiv.append(entry.entryDiv);
        });
    }
    
    nextTurn(): void {
        this._tracker.nextTurn();
    }
    add(): void {
        let name = this.getNameInput()
        let initiative = this.getInitiativeInput();
        let type = this.getTypeInput();
        this._tracker.addCharacter(name, initiative, type);
    }
    
    remove(): void {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    
    getNameInput(): string {
        return this.getInputValue("nameInput");
    }
    
    getInitiativeInput(): number {
        return parseInt(this.getInputValue("initInput"));
    }
    
    getTypeInput(): CharacterType {
        const typeString: string = this.getInputValue('typeInput');
        const type: CharacterType = this.characterTypeFromString(typeString);
        return type;
    }
    
    getInputValue(id: string) {
        return (<HTMLInputElement> document.getElementById(id)).value;
    }
    
    endOfTurn(next: Character): void {}
    
    characterAdded(character: Character): void {
        this.update();
    }

    characterRemoved(character: Character): void {
        this.update();
    }
    
    characterTypeFromString(type: string): CharacterType {
        switch(type) {
            case CharacterType.PLAYER: return CharacterType.PLAYER;
            case CharacterType.ENEMY: return CharacterType.ENEMY;
            default: throw new Error(`${type} is not a valid charactertype.`);
        }
    }

}



