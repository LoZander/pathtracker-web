import { CharacterType, Controller, Tracker } from "../framework/interfaces.js";
export class ControllerImpl implements Controller {
    private _tracker: Tracker;
    
    constructor(tracker: Tracker) {
        console.log("test");
        this._tracker = tracker;
        console.log(this._tracker);
        document.getElementById("addButton").addEventListener("click", () => this.add());
        document.getElementById("nextTurnButton").addEventListener("click", () => this.nextTurn());
    }
    setupNextCharacterController(): void {
        throw new Error("Method not implemented.");
    }
    setupAddCharacterController(): void {
        throw new Error("Method not implemented.");
    }
    setupClearController(): void {
        throw new Error("Method not implemented.");
    }
    setupRemoveController(): void {
        throw new Error("Method not implemented.");
    }


    private nextTurn(): void {
        this._tracker.nextTurn();
    }
    
    private add(): void {
        let name = this.getNameInput()
        let initiative = this.getInitiativeInput();
        let type = this.getTypeInput();
        this._tracker.addCharacter(name, initiative, type);
    }

    private getNameInput(): string {
        return this.getInputValue("nameInput");
    }
    
    private getInitiativeInput(): number {
        return parseInt(this.getInputValue("initInput"));
    }
    
    private getTypeInput(): CharacterType {
        const typeString: string = this.getInputValue('typeInput');
        const type: CharacterType = this.characterTypeFromString(typeString);
        return type;
    }
    
    private getInputValue(id: string) {
        return (<HTMLInputElement> document.getElementById(id)).value;
    }
    
    private characterTypeFromString(type: string): CharacterType {
        switch(type) {
            case CharacterType.PLAYER: return CharacterType.PLAYER;
            case CharacterType.ENEMY: return CharacterType.ENEMY;
            default: throw new Error(`${type} is not a valid charactertype.`);
        }
    }
}