/**
 * A Tracker is a list that keeps track of characters in a combat scenario.
 * These characters are sorted by when their turn is compared with eachother.
 * The order of turns is usually determined by the highest to lowest initiatives.
 */
export interface Tracker {
    /**
     * Ends the turn of the current character in turn, to give the turn to the next.
     */
    nextTurn(): void;

    /**
     * Returns the character whose turn it currently is.
     * @returns The character in turn.
     */
    get characterInTurn(): Character | null;

    /**
     * Adds a new character to the tracker.
     * @param name The name of the new character.
     * @param initiative The initiative of the new character.
     * @param type The type of the new character.
     */
    addCharacter(name: String, initiative: number, type: CharacterType): void;

    /**
     * Removes a character from the tracker.
     * @param name The character to be removed from the tracker.
     * @returns The character that was removed.
     */
    remove(name: String): Character | null;

    /**
     * Returns a specific character form the tracker.
     * @param name The name of the character to be fetched.
     * @returns The character fetched.
     */
    getCharacter(name: String): Character | undefined;

    /**
     * Removes all characters and resets round count.
     */
    clear(): void;

    /**
     * Returns a list of all the characters in the tracker.
     * @returns List of all the characters.
     */
    get characters(): Character[];

    /**
     * Returns the round count of the tracker.
     * @returns Round count.
     */
    get round(): number;

    /**
     * Returns the size of the tracker.
     * @returns Tracker size.
     */
    get size(): number;
}

/**
 * A Character represents a character of the game, having
 * @property {String} name The name of the character.
 * @property {number} initiative The initiative of the character.
 * @property {CharacterType} type The type of the character.
 */
export interface Character {
    get name(): String;
    get initiative(): number;
    get type(): CharacterType;
}

/**
 * Represents the types of characters.
 * @constant player "PLAYER"
 * @constant enemy "ENEMY"
 */
export enum CharacterType {
    player = "PLAYER",
    enemy = "ENEMY"
}