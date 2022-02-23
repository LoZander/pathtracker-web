import { CharacterType } from '../framework/interfaces.js';
export class TrackerImpl {
    constructor() {
        this._characters = [];
        this._characterInTurn = null;
        this._round = 0;
        this._characterObservers = [];
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
    set characterInTurn(character) {
        this._characterInTurn = character;
        this._characterObservers.forEach(e => e.characterInTurnChanged(character));
    }
    get size() {
        return this._characters.length;
    }
    nextTurn() {
        const isTrackerEmpty = this.size === 0;
        if (isTrackerEmpty)
            return;
        const isFirstTurn = this.characterInTurn === null;
        if (isFirstTurn) {
            this.characterInTurn = this._characters[0];
            this._round = 1;
        }
        else {
            const nextIndex = this.nextIndex();
            this.characterInTurn = this.characters[nextIndex];
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
        const isEmptyName = name === '';
        if (isEmptyName)
            throw new Error("Can't add a character with no name");
        const isDuplicate = this.getCharacter(name) !== undefined;
        if (isDuplicate)
            throw new Error("Can't add a character that already exists");
        this._characters.push({ name: name, initiative: initiative, type: type });
        this.sort();
        this._trackerObserver.characterListChanged();
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
    addTrackerObserver(trackerObserver) {
        this._trackerObserver = trackerObserver;
    }
    addCharacterObserver(characterObserver) {
        this._characterObservers.push(characterObserver);
    }
}
