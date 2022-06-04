import { Character, CharacterType, Tracker } from "../pathtracker/framework/TrackerInterfaces";
import { FileManager } from '../pathtracker/framework/FileManager';
import { TrackerObserver } from '../pathtracker/framework/ObserverInterfaces';
import { TrackerImpl } from "../pathtracker/standard/TrackerImpl";
import { NullObserver } from "../pathtracker/doubles/NullDoubles";
import { SyncJSONFileManager } from "../pathtracker/standard/SyncJSONFileManager";
import { NoAutosaveStrategy } from "../pathtracker/standard/NoAutosaveStrategy";
import { StandardAutosaveStrategy} from "../pathtracker/standard/StandardAutosaveStrategy";
import path from "path";

describe('TDD of TrackerImpl', () => {
    let tracker: Tracker;
    let mockFileManager: FileManager;
    beforeEach(() => {
        mockFileManager = new MockFileManager();
        tracker = new TrackerImpl(mockFileManager, new NoAutosaveStrategy())
        tracker.addTrackerObserver(new NullObserver());
    });

    describe('TDD of adding characters', () => {
        test('Adding a player character should add a character with the right type', () => {
            tracker.addCharacter('Test', 20, CharacterType.PLAYER);
            expect(tracker.getCharacter('Test').type).toBe(CharacterType.PLAYER);
        });
    
        test('Adding an enemy character should add a character with the right type', () => {
            tracker.addCharacter('Test', 12, CharacterType.ENEMY);
            expect(tracker.getCharacter('Test').type).toBe(CharacterType.ENEMY);
        });
    
        test('Adding a character with the name \"Test\" should add a character with that name', () => {
            tracker.addCharacter('Test', 23, CharacterType.PLAYER);
            expect(tracker.getCharacter('Test').name).toBe('Test');
        });
    
        test('Adding a character with the name \"Test2\" should add a character with that name', () => {
            tracker.addCharacter("Test2", 21, CharacterType.PLAYER);
            expect(tracker.getCharacter("Test2").name).toBe("Test2");
        });
    
        test('Adding a character with initiative 10 shold add a character with that initiative', () => {
            tracker.addCharacter("Test", 10, CharacterType.PLAYER);
            expect(tracker.getCharacter("Test").initiative).toBe(10);
        })
    
        test('Adding a character with initiative 20 should add a character with that initiative', () => {
            tracker.addCharacter('Test', 20, CharacterType.PLAYER);
            expect(tracker.getCharacter('Test').initiative).toBe(20);
        });
    
        test('Should be able to add multiple characters to tracker', () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 10, CharacterType.PLAYER);
    
            expect(tracker.size).toBe(2);
        });    

        test('Adding a character with a higher initiative, doesn\'t change the character in turn', () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 10, CharacterType.PLAYER);
            tracker.nextTurn();
            tracker.addCharacter('Test3', 30, CharacterType.ENEMY);
            expect(tracker.characterInTurn.name).toBe('Test1');
        });

        test('Adding an already existing character should throw an exception', () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            expect(() => tracker.addCharacter('Test1', 20, CharacterType.PLAYER)).toThrowError("Can't add a character that already exists");
        })

        test('Adding a character with an empty name should throw an exception', () => {
            expect(() => tracker.addCharacter('', 10, CharacterType.PLAYER)).toThrowError("Can't add a character with no name");
        });

        test('Adding a character with a name that is not a number should throw and exception', () => {
            expect(() => tracker.addCharacter('Test', NaN, CharacterType.PLAYER)).toThrowError("Can't add a character with non-number initiative");
        });
    });

    describe('TDD of ending turns and rounds', () => {
        test('When it isn\'t any one\'s turn yet, there should be no character in turn', () => {
            tracker.addCharacter('Test1',10, CharacterType.PLAYER);
            tracker.addCharacter('Test2',30, CharacterType.PLAYER);
            tracker.addCharacter('Test3',20, CharacterType.PLAYER);

            expect(tracker.characterInTurn).toBeNull();
        });

        test('When there is no character in turn, the next character in turn is the one with the highest initiative', () => {
            tracker.addCharacter('Test1',10, CharacterType.PLAYER);
            tracker.addCharacter('Test2',30, CharacterType.PLAYER);
            tracker.addCharacter('Test3',20, CharacterType.PLAYER);

            tracker.nextTurn();

            expect(tracker.characterInTurn.name).toBe("Test2");
        });

        test('NextTurn should change the character in turn to the next character', () => {
            tracker.addCharacter('Test1',10, CharacterType.PLAYER);
            tracker.addCharacter('Test2',30, CharacterType.PLAYER);
            tracker.addCharacter('Test3',20, CharacterType.PLAYER);
            tracker.addCharacter('Test4',25, CharacterType.ENEMY);

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test2');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test4');
        });

        test('After the last character in the tracker, the next turn should belong to the first in the tracker', () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 16, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 12, CharacterType.PLAYER);

            tracker.nextTurn();
            tracker.nextTurn();
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test3');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test1');
        });
    });

    describe('TDD of sorting', () => {
        test('Tracker should be sorted firstly by initiative', () => {
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);
            tracker.addCharacter('Test1', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 15, CharacterType.PLAYER);
            
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test1');

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test2');

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test3');
        });

        test('Tracker should be sorted secondly by type', () => {
            tracker.addCharacter('Test4', 10, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 15, CharacterType.PLAYER);

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test1');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test2');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test3');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test4');
        });

        test('Tracker should be sorted thirdly by name', () => {
            tracker.addCharacter('d', 10, CharacterType.PLAYER);
            tracker.addCharacter('c', 20, CharacterType.ENEMY);
            tracker.addCharacter('b', 20, CharacterType.PLAYER);
            tracker.addCharacter('a', 20, CharacterType.PLAYER);

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('a');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('b');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('c');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('d');
        });
    });

    describe('TDD of removing characters', () => {
        test('Characters should be removable by name', () => {
            tracker.addCharacter('Test1', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 15, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);

            expect(tracker.remove('Test2').name).toBe('Test2');
            expect(tracker.getCharacter('Test2')).toBeUndefined();
        });

        test('Removing a character should not remove anything else', () => {
            tracker.addCharacter('Test1', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 15, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);

            tracker.remove('Test2');
            expect(tracker.getCharacter('Test1')).toBeDefined();
            expect(tracker.getCharacter('Test3')).toBeDefined();
        });
        
        test('Removing the character in turn, makes the next character in turn', () => {
            tracker.addCharacter('Test1', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 15, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);

            tracker.nextTurn();
            tracker.nextTurn();
            tracker.remove('Test2');
            expect(tracker.characterInTurn.name).toBe('Test3');
        });

        test('Removing the character in turn, actually removes it', () => {
            tracker.addCharacter('Test1', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 15, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);

            tracker.nextTurn();
            tracker.nextTurn();
            tracker.remove('Test2');
            let character = tracker.getCharacter('Test2');
            expect(character).toBeUndefined();
        });
    });

    describe('TDD of getting characters', () => {
        test('Getting a character that doesn\'t exist returns undefined', () => {
            expect(tracker.getCharacter('Test')).toBeUndefined;
        });

        test('Getting the character in turn, when no one is in turn, returns null', () => {
            expect(tracker.characterInTurn).toBeNull;
        });
    });

    describe('TDD of clearing of the tracker', () => {
        test('Clearing should remove all characters', () => {
            tracker.addCharacter('Test1', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 15, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.clear()

            expect(tracker.size).toBe(0);
        });

        test('Clearing should reset round count to 0', () => {
            tracker.addCharacter('Test1', 20, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 15, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.clear()

            expect(tracker.round).toBe(0);
        });
    });

    describe('TDD of observer pattern', () => {
        let observer: ObserverSpy;
        beforeEach(() => {
            tracker = new TrackerImpl(new MockFileManager(), new NoAutosaveStrategy());
            observer = new ObserverSpy();
            tracker.addTrackerObserver(observer);
        });
        
        test('Removing a character should call upon characterRemoved', () => {
            tracker.addCharacter('Test', 20, CharacterType.PLAYER);
            tracker.remove('Test');

            expect(observer.characterRemovedCalled).toBe(1);
        });

        test('Removing the character in turn, should call upon characterRemoved', () => {
            tracker.addCharacter('Test1', 30, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 24, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 23, CharacterType.PLAYER);
            tracker.addCharacter('Test4', 19, CharacterType.PLAYER);
            tracker.nextTurn();
            tracker.nextTurn();

            tracker.remove('Test2');

            expect(observer.characterRemovedCalled).toBe(1);
        });

        test('Attempting to remove a character not on the tracker will not call upon characterRemoved', () => {
            tracker.remove('Something');
            expect(observer.characterRemovedCalled).toBe(0);
        });

        test('Adding a character will call upon characterAdded', () => {
            tracker.addCharacter('Test', 10, CharacterType.ENEMY);
            expect(observer.characterAddedCalled).toBe(1);
        });

        test('Clearing the tracker will call upon clear', () => {
            tracker.addCharacter('Test', 10, CharacterType.ENEMY);
            tracker.clear();
            expect(observer.clearCalled).toBe(1);
        });

        test('Ending the turn, should call upon endOfTurn', () => {
            tracker.addCharacter('Test', 10, CharacterType.ENEMY);
            tracker.addCharacter('Test2', 2, CharacterType.ENEMY);
            tracker.nextTurn();
            expect(observer.endOfTurnCalled).toBe(1);
        });

        test('Ending the turn, should not call upon endOfTurn if tracker is empty', () => {
            tracker.nextTurn();
            expect(observer.endOfTurnCalled).toBe(0);
        });

        test('Loading a save should call upon loaded', () => {
            tracker.save(path.join(__dirname, 'save.json'));
            tracker.load(path.join(__dirname, 'save.json'));
            expect(observer.loadedCalled).toBe(1);
        });
    });

    describe('Testing save/load functionality', () => {
        test('When saving the tracker, 20 Test1 Player should be recovered upon loading', async () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.save('slTest1');
            tracker = new TrackerImpl(mockFileManager, new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());

            tracker.load('slTest1');
            console.log(tracker.characters);
            const test1 = tracker.getCharacter('Test1');
            expect(test1).toBeDefined();
        });

        test('When saving the tracker, 10 Test2 Enemy should be recovered upon loading', async () => {
            tracker.addCharacter('Test2', 10, CharacterType.ENEMY);
            tracker.save('slTest2');
            tracker = new TrackerImpl(mockFileManager, new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());

            tracker.load('slTest2');
            let test2 = tracker.getCharacter('Test2');
            expect(test2).toBeDefined();
        });

        test("When saving the tracker, the character in turn is also saved", () => {
            tracker.addCharacter('Test1', 30, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 16, CharacterType.PLAYER);
            tracker.addCharacter('Test4', 12, CharacterType.PLAYER);

            tracker.nextTurn();
            tracker.nextTurn();
            tracker.nextTurn();

            tracker.save('slTest3');

            tracker = new TrackerImpl(mockFileManager, new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());
            tracker.load('slTest3');
            expect(tracker.characterInTurn.name).toBe('Test3');
        });

        test('When saving the tracker, the round count is also saved', () => {
            tracker.addCharacter('Test1', 30, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 20, CharacterType.PLAYER);

            tracker.nextTurn();
            tracker.nextTurn();
            tracker.nextTurn();

            tracker.save('slTest4');
            
            tracker = new TrackerImpl(mockFileManager, new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());
            tracker.load('slTest4');
            expect(tracker.round).toBe(2);
        });

        test('Integration test for saving', () => {
            tracker = new TrackerImpl(new SyncJSONFileManager(), new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());
            tracker.addCharacter('Test', 20, CharacterType.PLAYER);
            tracker.save(path.join(__dirname, 'test.files', 'integration.json'));

            tracker = new TrackerImpl(new SyncJSONFileManager(), new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());
            tracker.load(path.join(__dirname, 'test.files', 'integration.json'));
            const test = tracker.getCharacter('Test');
            expect(test).toBeDefined();
        });

        test('Integration test: saving saves character in turn', () => {
            tracker = new TrackerImpl(new SyncJSONFileManager(), new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());
            tracker.addCharacter('Test1', 30, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 10, CharacterType.PLAYER);

            tracker.nextTurn();
            tracker.nextTurn();

            tracker.save(path.join(__dirname, 'test.files', 'integration2.json'));
            
            tracker = new TrackerImpl(new SyncJSONFileManager(), new NoAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());
            tracker.load(path.join(__dirname, 'test.files', 'integration2.json'))

            const test = tracker.characterInTurn;
            expect(test.name).toBe('Test2');

            tracker.nextTurn();
            
            const test2 = tracker.characterInTurn;
            expect(test2.name).toBe('Test3');
        });
    });

    describe('Testing auto-saving', () => {
        let spy: SpyFileManagerDecorator;
        beforeEach(() => {
            spy = new SpyFileManagerDecorator(new MockFileManager());
            tracker = new TrackerImpl(spy, new StandardAutosaveStrategy());
            tracker.addTrackerObserver(new NullObserver());
        });

        test('Tracker should auto-save after adding a character', () => {
            tracker.addCharacter('Test', 20, CharacterType.PLAYER);
            expect(spy.writeCalled).toBe(1);
        });

        test('Tracker shold auto-save after removing a character', () => {
            tracker.addCharacter('Test', 20, CharacterType.PLAYER);
            tracker.remove('Test');
            expect(spy.writeCalled).toBe(2);
        });

        test('Tracker should auto-save after a characters turn ending', () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 10, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 5, CharacterType.PLAYER);

            tracker.nextTurn();

            expect(spy.writeCalled).toBe(3 + 1);
        });

        test('Tracker should auto-save after clearing the tracker', () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 10, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 5, CharacterType.PLAYER);

            tracker.clear();
            expect(spy.writeCalled).toBe(3 + 1);
        });

        test('Tracker should auto-save after loading a save', () => {
            tracker.addCharacter('Test1', 20, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 10, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 5, CharacterType.PLAYER);

            tracker.save(path.join(__dirname, 'test.json'));

            tracker.load(path.join(__dirname, 'test.json'));

            expect(spy.writeCalled).toBe(3 + 1 + 1);
        });
    });
});

class ObserverSpy implements TrackerObserver {
    private _endOfTurnCalled: number;
    private _characterAddedCalled: number;
    private _characterRemovedCalled: number;
    private _clearCalled: number;
    private _loadedCalled: number;

    constructor() {
        this._endOfTurnCalled = 0;
        this._characterAddedCalled = 0;
        this._characterRemovedCalled = 0;
        this._clearCalled = 0;
        this._loadedCalled = 0;
    }
    loaded(tracker: Tracker): void {
        this._loadedCalled++;
    }
    characterAdded(character: Character): void {
        this._characterAddedCalled++;
    }
    characterRemoved(character: Character): void {
        this._characterRemovedCalled++;
    }

    endOfTurn(next: Character): void {
        this._endOfTurnCalled++;
    }

    clear(): void {
        this._clearCalled++;
    }

    get endOfTurnCalled(): number {return this._endOfTurnCalled}
    get characterAddedCalled(): number {return this._characterAddedCalled}
    get characterRemovedCalled(): number {return this._characterRemovedCalled}
    get clearCalled(): number {return this._clearCalled}
    get loadedCalled(): number {return this._loadedCalled}
}

class MockFileManager implements FileManager {
    private _files: Map<string,any>;

    constructor() {
        this._files = new Map();
    }

    read(dir: string) {
        return this._files.get(dir);
    }
    write(dir: string, value: any): void {
        this._files.set(dir, value);
    }
}

class SpyFileManagerDecorator implements FileManager {
    private _decoratee: FileManager;
    private _readCalled: number;
    private _writeCalled: number;

    constructor(fileManager: FileManager) {
        this._decoratee = fileManager;
        this._readCalled = 0;
        this._writeCalled = 0;
    }

    read(dir: string) {
        this._readCalled++;
        return this._decoratee.read(dir);
    }
    write(dir: string, value: any): void {
        this._writeCalled++;
        this._decoratee.write(dir, value);
    }

    get readCalled(): number {return this._readCalled}
    get writeCalled(): number {return this._writeCalled}
}