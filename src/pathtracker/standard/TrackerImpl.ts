import {Tracker,Character, CharacterType} from '../framework/interfaces';
export class TrackerImpl implements Tracker {
    _characters: Character[];
    _characterInTurn: Character | null;
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
        const isTrackerEmpty: boolean = this.size === 0;
        if(isTrackerEmpty) return;

        const isFirstTurn: boolean = this._characterInTurn === null;
        if(isFirstTurn) {
            this._characterInTurn = this._characters[0];
            this._round = 1;
        } else {
            const nextIndex = this.nextIndex();
            this._characterInTurn = this.characters[nextIndex];
            const isNewRound: boolean = nextIndex === 0
            if(isNewRound) this._round++;
        }
    }

    private nextIndex(): number {
        if(this.characterInTurn === null) return 0;
        return (this.characters.indexOf(this.characterInTurn) + 1) % this.size;
    }

    addCharacter(name: string, initiative: number, type: CharacterType): void {
        this._characters.push({name: name, initiative: initiative, type: type});
        this.sort();
    }

    private sort(): void {
        this._characters.sort((a,b) => {
            if(a.name.toLowerCase() == b.name.toLocaleUpperCase()) return 0;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 1;
        }).sort((a,b) => {
            if(a.type === b.type) return 0;
            if(a.type === CharacterType.player) return -1;
            return 1;
        }).sort((a,b) => b.initiative - a.initiative);
    }

    remove(name: string): Character | null {
        const removee = this.getCharacter(name);
        if(removee === undefined) return null;
        const removeIndex = this.characters.indexOf(removee);
        if(removee == this.characterInTurn) this.nextTurn();
        this.characters.splice(removeIndex,1);
        return removee;
    }
    getCharacter(name: string): Character | undefined {
        return this.characters.find(e => e.name == name);;
    }

    clear(): void {
        this._characters = []
        this._round = 0;
    }
}