export interface Gui {
    update(): void;
}

export interface Controller { }

export interface CharacterEntry {
    get entryDiv(): HTMLDivElement;
}
