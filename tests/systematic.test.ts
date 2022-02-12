import {Tracker,CharacterType} from '../src/pathtracker/framework/interfaces'
import {TrackerImpl} from '../src/pathtracker/standard/TrackerImpl'

describe('Systematic testing of nextTurn and round count updating', () => {
    let tracker: Tracker;
    beforeEach(() => {
        tracker = new TrackerImpl();
        tracker.addCharacter('Test1', 20, CharacterType.player);
        tracker.addCharacter('Test2', 16, CharacterType.enemy);
        tracker.addCharacter('Test5', 4 , CharacterType.player);
        tracker.addCharacter('Test4', 10, CharacterType.player);
        tracker.addCharacter('Test3', 11, CharacterType.enemy);
    });

    test('ECs [a2],[b1],[c2]: Should be character 4 after 3 when turn ends and round count shouldn\'t change', () => {
        tracker.nextTurn();
        tracker.nextTurn();
        tracker.nextTurn();

        const roundBefore = tracker.round;
        expect(tracker.characterInTurn.name).toBe('Test3');
        
        tracker.nextTurn();
        const roundAfter = tracker.round;
        expect(tracker.characterInTurn.name).toBe('Test4');
        expect(roundAfter - roundBefore).toBe(0);
    });

    test('ECs [a2],[b2],[c1]: Should be first character after last character and round count should change', () => {
        tracker.nextTurn();
        tracker.nextTurn();
        tracker.nextTurn();
        tracker.nextTurn();
        tracker.nextTurn();

        const roundBefore = tracker.round;
        expect(tracker.characterInTurn.name).toBe('Test5');

        tracker.nextTurn();
        const roundAfter = tracker.round;
        expect(tracker.characterInTurn.name).toBe('Test1');
        expect(roundAfter - roundBefore).toBe(1);
    });

    test('ECs [a2],[b3],[c3]: Should be the first character when nextTurn is called and no character is in turn and round count should be updated to 1', () => {
        tracker.nextTurn();

        expect(tracker.characterInTurn.name).toBe('Test1');
        expect(tracker.round).toBe(1);
    });

    test('ECs [a1]: Nothing should happen when turn ends with no characters', () => {
        tracker = new TrackerImpl();
        tracker.nextTurn();
        expect(tracker.characterInTurn).toBeNull;
        expect(tracker.round).toBe(0);
    });
});