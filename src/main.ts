import { ControllerImpl } from './pathtracker/gui/ControllerImpl.js';
import { Controller, Tracker } from './pathtracker/framework/interfaces.js';
import { GuiImpl } from './pathtracker/gui/GuiImpl.js';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl.js';

const tracker: Tracker = new TrackerImpl();
const gui = new GuiImpl(tracker);
const controller: Controller = new ControllerImpl(tracker);
tracker.addTrackerObserver(gui);

window.onload = () => {
    gui.update();
}