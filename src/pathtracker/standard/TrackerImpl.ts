import path from 'path';
import {Tracker,Character, CharacterType, TrackerObserver, CharacterObserver, FileManager} from '../framework/interfaces';
export class TrackerImpl implements Tracker {
    _characters: Character[];
    _characterInTurn: Character | null;
    _round: number;
    _trackerObserver: TrackerObserver;
    _characterObservers: CharacterObserver[];
    _fileManager: FileManager;
    
    constructor(fileManager: FileManager) {
        this._characters = [];
        this._characterInTurn = null;
        this._round = 0;
        this._characterObservers = [];
        this._fileManager = fileManager;
    }

    save(filename: string): void {
        this._fileManager.write(path.join(__dirname, '..', 'saves', filename) + '.json', this);
    }
    
    load(filename: string): void {
        const tracker = this._fileManager.read(path.join(__dirname, '..', 'saves', filename) + '.json');
        this._characters = tracker._characters;
        this._characterInTurn = tracker._characterInTurn;
        this._round = tracker._round;
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

    set characterInTurn(character: Character) {
        this._characterInTurn = character;
        this._characterObservers.forEach(e => e.characterInTurnChanged(character));
    }

    get size(): number {
        return this._characters.length;
    }

    nextTurn(): void {
        const isTrackerEmpty: boolean = this.size === 0;
        if(isTrackerEmpty) return;

        const isFirstTurn: boolean = this.characterInTurn === null;
        if(isFirstTurn) {
            this.characterInTurn = this._characters[0];
            this._round = 1;
        } else {
            const nextIndex = this.nextIndex();
            this.characterInTurn = this.characters[nextIndex];
            const isNewRound: boolean = nextIndex === 0
            if(isNewRound) this._round++;
        }
        this._trackerObserver.endOfTurn(this.characterInTurn);
    }

    private nextIndex(): number {
        if(this.characterInTurn === null) return 0;
        return (this.characters.indexOf(this.characterInTurn) + 1) % this.size;
    }

    addCharacter(name: string, initiative: number, type: CharacterType): void {
        const isEmptyName = name === '';
        if(isEmptyName) throw new Error("Can't add a character with no name");

        const isDuplicate = this.getCharacter(name) !== undefined;
        if(isDuplicate) throw new Error("Can't add a character that already exists");

        const character = {name: name, initiative: initiative, type: type}
        this._characters.push(character);
        this.sort();

        this._trackerObserver.characterAdded(character);
    }

    private sort(): void {
        this._characters.sort((a,b) => {
            if(a.name.toLowerCase() == b.name.toLocaleUpperCase()) return 0;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 1;
        }).sort((a,b) => {
            if(a.type === b.type) return 0;
            if(a.type === CharacterType.PLAYER) return -1;
            return 1;
        }).sort((a,b) => b.initiative - a.initiative);
    }

    remove(name: string): Character | null {
        const removee = this.getCharacter(name);
        if(removee === undefined) return null;
        
        const removeIndex = this.characters.indexOf(removee);
        if(removee == this.characterInTurn) this.nextTurn();
        this.characters.splice(removeIndex,1);

        this._trackerObserver.characterRemoved(removee);
        return removee;
    }


    getCharacter(name: string): Character | undefined {
        return this.characters.find(e => e.name == name);;
    }

    clear(): void {
        this._characters = []
        this._round = 0;
        this._trackerObserver.clear();
    }

    addTrackerObserver(trackerObserver: TrackerObserver): void {
        this._trackerObserver = trackerObserver;
    }

    addCharacterObserver(characterObserver: CharacterObserver): void {
        this._characterObservers.push(characterObserver);
    }
}