import path from "path";
import { CharacterType, FileManager } from "../pathtracker/framework/interfaces";
import { SyncJSONFileManager } from '../pathtracker/standard/SyncJSONFileManager';

let manager: FileManager;

/* describe('Testing read/write', () => {
    beforeEach(() => {
        manager = new JSONFileManager()
    })
    test('If we write "A" to a file "test", when we read "test" we should get "A"', () => {
        manager.write(path.join(__dirname, 'rwTest1.json'), "A");
        manager.read(path.join(__dirname, 'rwTest1.json'))
        .then(data => expect(data).toBe("A"));
    });

    test('If we write character "20 Test Player", then when we read we should get that character', async () => {
        manager.write(path.join(__dirname, 'rwTest2.json'), {"name": 'Test', "initiative": 20, "type": CharacterType.PLAYER});
        return manager.read(path.join(__dirname, 'rwTest2.json'))
        .then(data => expect(data).toStrictEqual({name: 'Test', initiative: 20, type: CharacterType.PLAYER}));
    })

    test('If we write list of characters, we can read them again', async () => {
        const characters = [
            {name: 'Test1', initiative: 20, type: CharacterType.PLAYER},
            {name: 'Test2', initiative: 15, type: CharacterType.PLAYER},
            {name: 'Test3', initiative: 10, type: CharacterType.ENEMY}
        ]
        manager.write(path.join(__dirname, 'rwTest3.json'), characters);
        return manager.read(path.join(__dirname, 'rwTest3.json'))
        .then(data => expect(data).toStrictEqual(characters));
    });
}); */

describe('Testing synchronous read/write', () => {
    beforeEach(() => {
        manager = new SyncJSONFileManager();
    })

    test('If we write "A" to a file "test", when we read "test" we should get "A"', () => {
        manager.write(path.join(__dirname, 'test.files', 'rwTest1.json'), "A");
        const result = manager.read(path.join(__dirname, 'test.files', 'rwTest1.json'));
        expect(result).toBe("A");

    });

    test('If we write character "20 Test Player", then when we read we should get that character', async () => {
        manager.write(path.join(__dirname, 'test.files', 'rwTest2.json'), {"name": 'Test', "initiative": 20, "type": CharacterType.PLAYER});
        const result = manager.read(path.join(__dirname, 'test.files', 'rwTest2.json'));
        expect(result).toStrictEqual({name: 'Test', initiative: 20, type: CharacterType.PLAYER});
    })

    test('If we write list of characters, we can read them again', async () => {
        const characters = [
            {name: 'Test1', initiative: 20, type: CharacterType.PLAYER},
            {name: 'Test2', initiative: 15, type: CharacterType.PLAYER},
            {name: 'Test3', initiative: 10, type: CharacterType.ENEMY}
        ]
        manager.write(path.join(__dirname, 'test.files', 'rwTest3.json'), characters);
        const result = manager.read(path.join(__dirname, 'test.files', 'rwTest3.json'))
        expect(result).toStrictEqual(characters);
    });
})