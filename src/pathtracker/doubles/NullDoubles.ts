import { Character, Tracker } from "../framework/TrackerInterfaces.js";
import { CharacterObserver, TrackerObserver } from "../framework/ObserverInterfaces";

export class NullObserver implements TrackerObserver,CharacterObserver {
    loaded(tracker: Tracker): void {}
    nameChanged(name: string): void {}
    initiativeChanged(initiative: number): void {}
    characterInTurnChanged(inturn: Character): void {}
    endOfTurn(next: Character): void {}
    characterAdded(character: Character): void {}
    characterRemoved(character: Character): void {}
    clear(): void {}
}