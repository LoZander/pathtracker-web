import { Character, CharacterObserver, TrackerObserver } from "../framework/interfaces.js";

export class NullObserver implements TrackerObserver,CharacterObserver {
    nameChanged(name: string): void {}
    initiativeChanged(initiative: number): void {}
    characterInTurnChanged(inturn: Character): void {}
    endOfTurn(next: Character): void {}
    characterListChanged(): void {}
    clear(): void {}
}