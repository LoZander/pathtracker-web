import { CharacterType, Tracker } from "../framework/TrackerInterfaces";
import { Controller } from "../framework/GuiInterfaces";
import { characterTypeFromString } from "./Util";
export class ControllerImpl implements Controller {
    private _tracker: Tracker;
    
    constructor(tracker: Tracker) {
        this._tracker = tracker;
        console.log(this._tracker);
        document.getElementById("addButton").addEventListener("click", () => this.add());
        document.getElementById("nextTurnButton").addEventListener("click", () => this.nextTurn());
    }

    private nextTurn(): void {
        this._tracker.nextTurn();
    }
    
    private add(): void {
        let name = this.getNameInput()
        let initiative = this.getInitiativeInput();
        let type = this.getTypeInput();
        try {
            this._tracker.addCharacter(name, initiative, type);
        } catch (err) {
            alert(err + 'adadadad');
        }
        this.clearInputValue('nameInput');
        this.clearInputValue('initInput');
    }

    private getNameInput(): string {
        return this.getInputValue("nameInput");
    }
    
    private getInitiativeInput(): number {
        return parseInt(this.getInputValue("initInput"));
    }
    
    private getTypeInput(): CharacterType {
        const typeString: string = this.getInputValue('typeInput');
        const type: CharacterType = characterTypeFromString(typeString);
        return type;
    }
    
    private getInputValue(id: string) {
        return (<HTMLInputElement> document.getElementById(id)).value;
    }

    private clearInputValue(id: string) {
        (<HTMLInputElement> document.getElementById(id)).value = "";
    }
}