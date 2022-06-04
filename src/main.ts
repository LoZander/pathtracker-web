import { ControllerImpl } from './pathtracker/gui/ControllerImpl';
import { Tracker } from './pathtracker/framework/TrackerInterfaces';
import { Controller } from "./pathtracker/framework/GuiInterfaces";
import { GuiImpl } from './pathtracker/gui/GuiImpl';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl';
import { SyncJSONFileManager } from './pathtracker/standard/SyncJSONFileManager';
import { StandardAutosaveStrategy } from './pathtracker/standard/StandardAutosaveStrategy';
import { NoAutosaveStrategy } from './pathtracker/standard/NoAutosaveStrategy';
import { ipcRenderer } from 'electron';

const tracker: Tracker = new TrackerImpl(new SyncJSONFileManager(), new StandardAutosaveStrategy());
const gui = new GuiImpl(tracker);
const controller: Controller = new ControllerImpl(tracker);
tracker.addTrackerObserver(gui);

ipcRenderer.on('request_next_turn', (event,_) => {
    tracker.nextTurn();
});
ipcRenderer.on('request_save', (event,savefile) => {
    tracker.save(savefile);

});
ipcRenderer.on('request_load', (event,savefile) => {
    if(savefile === undefined) return;
    tracker.load(savefile);
});
ipcRenderer.on('request_clear', (event,_) => {
    tracker.clear();
});

window.onload = () => {
    gui.update();
}