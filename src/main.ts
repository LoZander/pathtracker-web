import { ControllerImpl } from './pathtracker/gui/ControllerImpl';
import { Tracker } from './pathtracker/framework/TrackerInterfaces';
import { Controller } from "./pathtracker/framework/GuiInterfaces";
import { GuiImpl } from './pathtracker/gui/GuiImpl';
import { TrackerImpl } from './pathtracker/standard/TrackerImpl';
import { SyncJSONFileManager } from './pathtracker/standard/SyncJSONFileManager';
import { app, dialog, ipcMain, ipcRenderer } from 'electron';

const tracker: Tracker = new TrackerImpl(new SyncJSONFileManager());
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
    alert(savefile);
    tracker.load(savefile);
});

window.onload = () => {
    gui.update();
}