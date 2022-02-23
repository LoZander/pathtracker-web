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
            tracker.addCharacter('Test', 20, CharacterType.player);
            expect(tracker.getCharacter('Test').type).toBe(CharacterType.player);
        });
    
        test('Adding an enemy character should add a character with the right type', () => {
            tracker.addCharacter('Test', 12, CharacterType.enemy);
            expect(tracker.getCharacter('Test').type).toBe(CharacterType.enemy);
        });
    
        test('Adding a character with the name \"Test\" should add a character with that name', () => {
            tracker.addCharacter('Test', 23, CharacterType.player);
            expect(tracker.getCharacter('Test').name).toBe('Test');
        });
    
        test('Adding a character with the name \"Test2\" should add a character with that name', () => {
            tracker.addCharacter("Test2", 21, CharacterType.player);
            expect(tracker.getCharacter("Test2").name).toBe("Test2");
        });
    
        test('Adding a character with initiative 10 shold add a character with that initiative', () => {
            tracker.addCharacter("Test", 10, CharacterType.player);
            expect(tracker.getCharacter("Test").initiative).toBe(10);
        })
    
        test('Adding a character with initiative 20 should add a character with that initiative', () => {
            tracker.addCharacter('Test', 20, CharacterType.player);
            expect(tracker.getCharacter('Test').initiative).toBe(20);
        });
    
        test('Should be able to add multiple characters to tracker', () => {
            tracker.addCharacter('Test1', 20, CharacterType.player);
            tracker.addCharacter('Test2', 10, CharacterType.player);
    
            expect(tracker.size).toBe(2);
        });    

        test('Adding a character with a higher initiative, doesn\'t change the character in turn', () => {
            tracker.addCharacter('Test1', 20, CharacterType.player);
            tracker.addCharacter('Test2', 10, CharacterType.player);
            tracker.nextTurn();
            tracker.addCharacter('Test3', 30, CharacterType.enemy);
            expect(tracker.characterInTurn.name).toBe('Test1');
        });

        test('Adding an already existing character should throw an exception', () => {
            tracker.addCharacter('Test1', 20, CharacterType.player);
            expect(() => tracker.addCharacter('Test1', 20, CharacterType.player)).toThrowError("Can't add a character that already exists");
        })

        test('Adding a character with an empty name should throw an exception', () => {
            expect(() => tracker.addCharacter('', 10, CharacterType.player)).toThrowError("Can't add a character with no name");
        });
    });

    describe('TDD of ending turns and rounds', () => {
        test('When it isn\'t any one\'s turn yet, there should be no character in turn', () => {
            tracker.addCharacter('Test1',10, CharacterType.player);
            tracker.addCharacter('Test2',30, CharacterType.player);
            tracker.addCharacter('Test3',20, CharacterType.player);

            expect(tracker.characterInTurn).toBeNull();
        });

        test('When there is no character in turn, the next character in turn is the one with the highest initiative', () => {
            tracker.addCharacter('Test1',10, CharacterType.player);
            tracker.addCharacter('Test2',30, CharacterType.player);
            tracker.addCharacter('Test3',20, CharacterType.player);

            tracker.nextTurn();

            expect(tracker.characterInTurn.name).toBe("Test2");
        });

        test('NextTurn should change the character in turn to the next character', () => {
            tracker.addCharacter('Test1',10, CharacterType.player);
            tracker.addCharacter('Test2',30, CharacterType.player);
            tracker.addCharacter('Test3',20, CharacterType.player);
            tracker.addCharacter('Test4',25, CharacterType.enemy);

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test2');
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test4');
        });

        test('After the last character in the tracker, the next turn should belong to the first in the tracker', () => {
            tracker.addCharacter('Test1', 20, CharacterType.player);
            tracker.addCharacter('Test2', 16, CharacterType.player);
            tracker.addCharacter('Test3', 12, CharacterType.player);

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
            tracker.addCharacter('Test3', 10, CharacterType.player);
            tracker.addCharacter('Test1', 20, CharacterType.enemy);
            tracker.addCharacter('Test2', 15, CharacterType.player);
            
            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test1');

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test2');

            tracker.nextTurn();
            expect(tracker.characterInTurn.name).toBe('Test3');
        });

        test('Tracker should be sorted secondly by type', () => {
            tracker.addCharacter('Test4', 10, CharacterType.player);
            tracker.addCharacter('Test2', 20, CharacterType.enemy);
            tracker.addCharacter('Test1', 20, CharacterType.player);
            tracker.addCharacter('Test3', 15, CharacterType.player);

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
            tracker.addCharacter('d', 10, CharacterType.player);
            tracker.addCharacter('c', 20, CharacterType.enemy);
            tracker.addCharacter('b', 20, CharacterType.player);
            tracker.addCharacter('a', 20, CharacterType.player);

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
            tracker.addCharacter('Test1', 20, CharacterType.enemy);
            tracker.addCharacter('Test2', 15, CharacterType.player);
            tracker.addCharacter('Test3', 10, CharacterType.player);

            expect(tracker.remove('Test2').name).toBe('Test2');
            expect(tracker.getCharacter('Test2')).toBeUndefined();
        });

        test('Removing a character should not remove anything else', () => {
            tracker.addCharacter('Test1', 20, CharacterType.enemy);
            tracker.addCharacter('Test2', 15, CharacterType.player);
            tracker.addCharacter('Test3', 10, CharacterType.player);

            tracker.remove('Test2');
            expect(tracker.getCharacter('Test1')).toBeDefined();
            expect(tracker.getCharacter('Test3')).toBeDefined();
        });
        
        test('Removing the character in turn, makes the next character in turn', () => {
            tracker.addCharacter('Test1', 20, CharacterType.enemy);
            tracker.addCharacter('Test2', 15, CharacterType.player);
            tracker.addCharacter('Test3', 10, CharacterType.player);

            tracker.nextTurn();
            tracker.nextTurn();
            tracker.remove('Test2');
            expect(tracker.characterInTurn.name).toBe('Test3');
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
            tracker.addCharacter('Test1', 20, CharacterType.enemy);
            tracker.addCharacter('Test2', 15, CharacterType.player);
            tracker.addCharacter('Test3', 10, CharacterType.player);
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.clear()

            expect(tracker.size).toBe(0);
        });

        test('Clearing should reset round count to 0', () => {
            tracker.addCharacter('Test1', 20, CharacterType.enemy);
            tracker.addCharacter('Test2', 15, CharacterType.player);
            tracker.addCharacter('Test3', 10, CharacterType.player);
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.nextTurn()
            tracker.clear()

            expect(tracker.round).toBe(0);
        });
    });
});