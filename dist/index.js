import { CharacterType } from './pathtracker/framework/interfaces.js';
import { GuiImpl } from './pathtracker/gui/GuiImpl.js';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl.js';
const tracker = new TrackerImpl();
const gui = new GuiImpl(tracker);
tracker.addCharacter("Test1", 30, CharacterType.player);
tracker.addCharacter("Test2", 10, CharacterType.player);
tracker.addCharacter("Test3", 2, CharacterType.enemy);
tracker.addCharacter("Test4", 20, CharacterType.enemy);
tracker.addCharacter("Test5", 23, CharacterType.player);
document.getElementById("addButton").addEventListener("click", gui.add);
document.getElementById("nextTurnButton").addEventListener("click", gui.nextTurn);
window.onload = () => {
    gui.update();
};
