import { Character, CharacterType, Tracker, TrackerObserver } from "../pathtracker/framework/interfaces";
import { TrackerImpl } from "../pathtracker/standard/TrackerImpl";
import { NullObserver} from "../pathtracker/doubles/NullDoubles"

describe('TDD of TrackerImpl', () => {
    let tracker: Tracker;
    beforeEach(() => {
        tracker = new TrackerImpl()
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
            tracker = new TrackerImpl();
            observer = new ObserverSpy();
            tracker.addTrackerObserver(observer);
        });
        
        test('Removing a charater should call upon characterListChanged', () => {
            tracker.addCharacter('Test', 20, CharacterType.PLAYER);
            tracker.remove('Test');

            expect(observer.characterListChangedCalled).toBe(2);
        });

        test('Removing the character in turn, should call upon characterListcahnged', () => {
            tracker.addCharacter('Test1', 30, CharacterType.PLAYER);
            tracker.addCharacter('Test2', 24, CharacterType.PLAYER);
            tracker.addCharacter('Test3', 23, CharacterType.PLAYER);
            tracker.addCharacter('Test4', 19, CharacterType.PLAYER);
            tracker.nextTurn();
            tracker.nextTurn();

            tracker.remove('Test2');

            expect(observer.characterListChangedCalled).toBe(1);
        });

        test('Attempting to remove a character not on the tracker will not call upon characterListChanged', () => {
            tracker.remove('Something');
            expect(observer.characterListChangedCalled).toBe(0);
        });

        test('Adding a character will call upon characterListChanged', () => {
            tracker.addCharacter('Test', 10, CharacterType.ENEMY);
            expect(observer.characterListChangedCalled).toBe(1);
        });

        test('Clearing the tracker will call upon characterListChaned', () => {
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
    });
});

class ObserverSpy implements TrackerObserver {
    private _endOfTurnCalled: number;
    private _characterListChangedCalled: number;
    private _clearCalled: number;

    constructor() {
        this._endOfTurnCalled = 0;
        this._characterListChangedCalled = 0;
        this._clearCalled = 0;
    }

    endOfTurn(next: Character): void {
        this._endOfTurnCalled++;
    }
    characterListChanged(): void {
        this._characterListChangedCalled++;
    }
    clear(): void {
        this._clearCalled++;
    }

    get endOfTurnCalled(): number {return this._endOfTurnCalled}
    get characterListChangedCalled(): number {return this._characterListChangedCalled}
    get clearCalled(): number {return this._clearCalled}
}