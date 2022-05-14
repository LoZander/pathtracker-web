import { CharacterType } from "../framework/interfaces.js";

export function characterTypeFromString(type: string): CharacterType {
    switch(type) {
        case CharacterType.PLAYER: return CharacterType.PLAYER;
        case CharacterType.ENEMY: return CharacterType.ENEMY;
        default: throw new Error(`${type} is not a valid charactertype.`);
    }
}