import { ControllerImpl } from './pathtracker/gui/ControllerImpl.js';
import { CharacterType, Controller, Tracker } from './pathtracker/framework/interfaces.js';
import { GuiImpl } from './pathtracker/gui/GuiImpl.js';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl.js';

const tracker: Tracker = new TrackerImpl();
const gui = new GuiImpl(tracker);
const controller: Controller = new ControllerImpl(tracker);
tracker.addTrackerObserver(gui);

tracker.addCharacter("Test1", 30, CharacterType.PLAYER);
tracker.addCharacter("Test2", 10, CharacterType.PLAYER);
tracker.addCharacter("Test3", 2, CharacterType.ENEMY);
tracker.addCharacter("Test4", 20, CharacterType.ENEMY);
tracker.addCharacter("Test5", 23, CharacterType.PLAYER);

window.onload = () => {
    gui.update();
}