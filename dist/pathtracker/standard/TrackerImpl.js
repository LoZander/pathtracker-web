import { CharacterType } from '../framework/interfaces.js';
export class TrackerImpl {
    constructor() {
        this._characters = [];
        this._characterInTurn = null;
        this._round = 0;
    }
    get characters() {
        return this._characters;
    }
    get round() {
        return this._round;
    }
    get characterInTurn() {
        return this._characterInTurn;
    }
    get size() {
        return this._characters.length;
    }
    nextTurn() {
        const isTrackerEmpty = this.size === 0;
        if (isTrackerEmpty)
            return;
        const isFirstTurn = this._characterInTurn === null;
        if (isFirstTurn) {
            this._characterInTurn = this._characters[0];
            this._round = 1;
        }
        else {
            const nextIndex = this.nextIndex();
            this._characterInTurn = this.characters[nextIndex];
            const isNewRound = nextIndex === 0;
            if (isNewRound)
                this._round++;
        }
    }
    nextIndex() {
        if (this.characterInTurn === null)
            return 0;
        return (this.characters.indexOf(this.characterInTurn) + 1) % this.size;
    }
    addCharacter(name, initiative, type) {
        this._characters.push({ name: name, initiative: initiative, type: type });
        this.sort();
    }
    sort() {
        this._characters.sort((a, b) => {
            if (a.name.toLowerCase() == b.name.toLocaleUpperCase())
                return 0;
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            return 1;
        }).sort((a, b) => {
            if (a.type === b.type)
                return 0;
            if (a.type === CharacterType.player)
                return -1;
            return 1;
        }).sort((a, b) => b.initiative - a.initiative);
    }
    remove(name) {
        const removee = this.getCharacter(name);
        if (removee === undefined)
            return null;
        const removeIndex = this.characters.indexOf(removee);
        if (removee == this.characterInTurn)
            this.nextTurn();
        this.characters.splice(removeIndex, 1);
        return removee;
    }
    getCharacter(name) {
        return this.characters.find(e => e.name == name);
        ;
    }
    clear() {
        this._characters = [];
        this._round = 0;
    }
}
