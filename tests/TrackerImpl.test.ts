import { CharacterType, Tracker } from "../src/pathtracker/framework/interfaces";
import { TrackerImpl } from "../src/pathtracker/standard/TrackerImpl";

describe('TDD of TrackerImpl', () => {
    let tracker: Tracker;
    beforeEach(() => tracker = new TrackerImpl());

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
});