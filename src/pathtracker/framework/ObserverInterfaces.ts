import { Character, Tracker } from "./TrackerInterfaces";

/**
 * Observer for the tracker, as part of an observer pattern.
 */

export interface TrackerObserver {

    /**
     * Handles the observers reaction to the end of a turn in tracker.
     * Becareful not to confuse "turn" with "round". Turn refers to each characters turn during a round.
     * @param next The next character, after the end of the turn.
     */
    endOfTurn(next: Character): void;

    /**
     * Handles the observers reaction to a character being added to the tracker.
     * @param character The character that has been added to the tracker.
     */
    characterAdded(character: Character): void;

    /**
     * Handles the observers reaction to a character being removed from the tracker.
     * @param character The character who has been removed.
     */
    characterRemoved(character: Character): void;

    /**
     * Handles the observers reaction to the tracker being cleared.
     * Here clear refers to a complete reset of the current tracker state,
     * meaning all characters are removed, round count reset, etc.
     */
    clear(): void;

    /**
     * Handles the observers reaction to the loading of a saved tracker.
     */
    loaded(tracker: Tracker): void;
}
/**
 * Observer for an individual character on the tracker, as a part of an observer pattern.
 */

export interface CharacterObserver {

    /**
     * Handles the observers reaction to the characters name being changed.
     * @param name The name of the character being removed.
     */
    nameChanged(name: string): void;

    /**
     * Handles the observers reaction to the initiative of the character being changed.
     * @param initiative The new initiative to which the character's is being changed.
     */
    initiativeChanged(initiative: number): void;

    /**
     * Handles the observers reaction to the character in turn being changed.
     * @param character The character who is now in turn.
     */
    characterInTurnChanged(character: Character): void;
}
