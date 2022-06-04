import {Tracker,Character, CharacterType} from '../framework/TrackerInterfaces';
import { TrackerObserver, CharacterObserver } from "../framework/ObserverInterfaces";
import { FileManager } from "../framework/FileManager";
import { AutosaveStrategy } from '../framework/strategies/AutosaveStrategy';
import { AutoloadStrategy } from '../framework/strategies/AutoloadStrategy';
import { TrackerFactory } from '../framework/TrackerFactory';
import { NullObserver } from '../doubles/NullDoubles';

export class TrackerImpl implements Tracker {
    private _characters: Character[];
    private _characterInTurn: Character | null;
    private _round: number;
    private _trackerObserver: TrackerObserver = new NullObserver();
    private _characterObservers: CharacterObserver[];
    private _fileManager: FileManager;
    private _autosaveStrategy: AutosaveStrategy;
    private _autoloadStrategy: AutoloadStrategy;
    
    constructor(factory: TrackerFactory) {
        this._characters = [];
        this._characterInTurn = null;
        this._round = 0;
        this._characterObservers = [];
        this._fileManager = factory.createFileManager();
        this._autosaveStrategy = factory.createAutosaveStrategy();
        this._autoloadStrategy = factory.createAutoloadStrategy();

        this._autoloadStrategy.autoload(this);
    }

    save(filename: string): void {
        this._fileManager.write(filename, {characters: this._characters, characterInTurn: this._characterInTurn, round: this._round});
    }
    
    load(filename: string): void {
        let loaded = this._fileManager.read(filename);
        this._characters = loaded.characters as Character[];
        this._characterInTurn = loaded.characterInTurn as Character;
        this._round = loaded.round as number;
        this._trackerObserver.loaded(this);

        this._autosaveStrategy.autosave(this);
    }

    get characters(): Character[] {
        return this._characters;
    }
    
    get round(): number {
        return this._round;
    }

    get characterInTurn(): Character {
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

        this._autosaveStrategy.autosave(this);
    }

    private nextIndex(): number {
        if(this.characterInTurn === null) return 0;
        const beforeIndex = this.characters.findIndex(c => c.name == this.characterInTurn.name)
        return (beforeIndex + 1) % this.size;
    }

    addCharacter(name: string, initiative: number, type: CharacterType): void {
        this.checkCharacterIsValid(name, initiative, type);

        const character: Character = {name: name, initiative: initiative, type: type}
        this._characters.push(character);
        this.sort();

        this._trackerObserver.characterAdded(character);

        this._autosaveStrategy.autosave(this);
    }

    private checkCharacterIsValid(name: string, initiative: number, type: CharacterType): void {
        const isEmptyName = name === '';
        if(isEmptyName) throw new Error("Can't add a character with no name");
        
        const isInitiativeNotNumber = isNaN(initiative);
        if(isInitiativeNotNumber) throw new Error("Can't add a character with non-number initiative");

        const isDuplicate = this.getCharacter(name) !== undefined;
        if(isDuplicate) throw new Error("Can't add a character that already exists");
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

        const trackerIsEmpty: boolean = this.size === 0;
        if(trackerIsEmpty) this.characterInTurn = null;

        this._trackerObserver.characterRemoved(removee);

        this._autosaveStrategy.autosave(this);

        return removee;
    }


    getCharacter(name: string): Character | undefined {
        return this.characters.find(e => e.name == name);;
    }

    clear(): void {
        this._characters = []
        this._round = 0;
        this._trackerObserver.clear();

        this._autosaveStrategy.autosave(this);
    }

    addTrackerObserver(trackerObserver: TrackerObserver): void {
        this._trackerObserver = trackerObserver;
        this._trackerObserver.loaded(this);
    }

    addCharacterObserver(characterObserver: CharacterObserver): void {
        this._characterObservers.push(characterObserver);
    }
}