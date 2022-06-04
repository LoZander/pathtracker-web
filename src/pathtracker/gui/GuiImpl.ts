import { Character, CharacterType, Tracker } from "../framework/TrackerInterfaces";
import { TrackerObserver } from "../framework/ObserverInterfaces";
import { Gui } from "../framework/GuiInterfaces";
import { CharacterEntryImpl } from "./CharacterEntryImpl";

export class GuiImpl implements Gui,TrackerObserver {
    private _tracker: Tracker;
    private _charactersDiv: HTMLDivElement;

    constructor(tracker: Tracker) {
        this._tracker = tracker;
        this._charactersDiv = <HTMLDivElement> document.getElementById("characters");
    }
    
    update(): void {
        this._charactersDiv.innerHTML = "";
        this._tracker.characters.forEach(e => {
            let entry = new CharacterEntryImpl(e,this._tracker);
            this._tracker.addCharacterObserver(entry);
            this._charactersDiv.appendChild(entry.entryDiv);
        });
        
        this._charactersDiv.appendChild(this.createCharacterStopper());
    }
    
    private createCharacterStopper(): HTMLDivElement {
        const stopper = document.createElement('div');
        stopper.classList.add('stopper');
        return stopper;
    }
    
    clear(): void {
        this._charactersDiv.innerHTML = '';
        document.getElementById('round').innerText = this._tracker.round + '';
    }

    loaded(tracker: Tracker): void {
        this.update();
    }

    endOfTurn(next: Character): void {
        document.getElementById('round').innerText = this._tracker.round + '';
    }
    
    characterAdded(character: Character): void {
        this.update();
    }
    
    characterRemoved(character: Character): void {
        this.update();
    }
}



