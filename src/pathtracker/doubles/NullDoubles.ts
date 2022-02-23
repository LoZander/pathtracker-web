import { Character, TrackerObserver } from "../framework/interfaces";

export class NullObserver implements TrackerObserver {
    endOfTurn(next: Character): void {}
    characterListChanged(): void {}
    clear(): void {}
}