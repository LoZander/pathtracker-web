import {Tracker,Character, CharacterType} from '../framework/interfaces';
export class TrackerImpl implements Tracker {
    _characters: Character[];
    _characterInTurn: Character;
    _round: number;
    constructor() {
        this._characters = [];
        this._characterInTurn = null;
        this._round = 0;
    }
    
    get characters(): Character[] {
        return this._characters;
    }
    
    get round(): number {
        return this._round;
    }

    get characterInTurn() {
        return this._characterInTurn;
    }

    get size(): number {
        return this._characters.length;
    }

    nextTurn(): void {
        const isTrackerEmpty: boolean = this.size == 0;
        if(isTrackerEmpty) return;

        const isFirstTurn: boolean = this._characterInTurn == null;
        if(isFirstTurn) {
            this._characterInTurn = this._characters[0];
            this._round = 1;
        } else {
            const nextIndex = this.nextIndex();
            this._characterInTurn = this.characters[nextIndex];
            const isNewRound: boolean = nextIndex == 0
            if(isNewRound) this._round++;
        }
    }

    private nextIndex(): number {
        return (this.characters.indexOf(this.characterInTurn) + 1) % this.size;
    }

    addCharacter(name: String, initiative: number, type: CharacterType): void {
        this._characters.push({name: name, initiative: initiative, type: type});
        this._characters.sort((a,b) => b.initiative - a.initiative);
    }
    removeCharacter(name: String): void {
        throw new Error('Method not implemented.');
    }
    getCharacter(name: String): Character {
        let c = this._characters.find(e => e.name == name);
        return c;
    }
}