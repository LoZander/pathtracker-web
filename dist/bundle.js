/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pathtracker_gui_ControllerImpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathtracker/gui/ControllerImpl */ \"./src/pathtracker/gui/ControllerImpl.ts\");\n/* harmony import */ var _pathtracker_gui_GuiImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathtracker/gui/GuiImpl */ \"./src/pathtracker/gui/GuiImpl.ts\");\n/* harmony import */ var _pathtracker_standard_TrackerImpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pathtracker/standard/TrackerImpl */ \"./src/pathtracker/standard/TrackerImpl.ts\");\n/* harmony import */ var _pathtracker_standard_SyncJSONFileManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pathtracker/standard/SyncJSONFileManager */ \"./src/pathtracker/standard/SyncJSONFileManager.ts\");\n\n\n\n\nconst tracker = new _pathtracker_standard_TrackerImpl__WEBPACK_IMPORTED_MODULE_2__.TrackerImpl(new _pathtracker_standard_SyncJSONFileManager__WEBPACK_IMPORTED_MODULE_3__.SyncJSONFileManager());\nconst gui = new _pathtracker_gui_GuiImpl__WEBPACK_IMPORTED_MODULE_1__.GuiImpl(tracker);\nconst controller = new _pathtracker_gui_ControllerImpl__WEBPACK_IMPORTED_MODULE_0__.ControllerImpl(tracker);\ntracker.addTrackerObserver(gui);\nwindow.onload = () => {\n    gui.update();\n};\n\n\n//# sourceURL=webpack://pathtracker/./src/main.ts?");

/***/ }),

/***/ "./src/pathtracker/framework/interfaces.ts":
/*!*************************************************!*\
  !*** ./src/pathtracker/framework/interfaces.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CharacterType\": () => (/* binding */ CharacterType)\n/* harmony export */ });\n/**\n * Represents the types of characters.\n * @constant player \"PLAYER\"\n * @constant enemy \"ENEMY\"\n */\nvar CharacterType;\n(function (CharacterType) {\n    CharacterType[\"PLAYER\"] = \"PLAYER\";\n    CharacterType[\"ENEMY\"] = \"ENEMY\";\n})(CharacterType || (CharacterType = {}));\n\n\n//# sourceURL=webpack://pathtracker/./src/pathtracker/framework/interfaces.ts?");

/***/ }),

/***/ "./src/pathtracker/gui/CharacterEntryImpl.ts":
/*!***************************************************!*\
  !*** ./src/pathtracker/gui/CharacterEntryImpl.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CharacterEntryImpl\": () => (/* binding */ CharacterEntryImpl)\n/* harmony export */ });\n/* harmony import */ var _framework_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/interfaces */ \"./src/pathtracker/framework/interfaces.ts\");\n\nclass CharacterEntryImpl {\n    constructor(character, tracker) {\n        this._entryDiv = document.createElement('div');\n        this._character = character;\n        const initDiv = this.createInitDiv(character.initiative);\n        this.entryDiv.appendChild(initDiv);\n        const nameDiv = this.createNameDiv(character.name);\n        this.entryDiv.appendChild(nameDiv);\n        const removeButton = this.createRemoveButton(character.name, tracker);\n        this.entryDiv.appendChild(removeButton);\n        this.entryDiv.classList.add('character');\n        if (character.type == _framework_interfaces__WEBPACK_IMPORTED_MODULE_0__.CharacterType.ENEMY)\n            this.entryDiv.classList.add('enemy');\n        this.setInTurn(tracker.characterInTurn);\n    }\n    createInfoDiv(value) {\n        const infoDiv = document.createElement('div');\n        const infoText = document.createTextNode(value);\n        infoDiv.appendChild(infoText);\n        return infoDiv;\n    }\n    createInitDiv(initiative) {\n        const initDiv = this.createInfoDiv(initiative + '');\n        initDiv.classList.add(\"init\");\n        return initDiv;\n    }\n    createNameDiv(name) {\n        const nameDiv = this.createInfoDiv(name);\n        nameDiv.classList.add(\"name\");\n        return nameDiv;\n    }\n    createRemoveButton(name, tracker) {\n        const removeButton = document.createElement('button');\n        const removeButtonText = document.createTextNode('\\xD7'); // Adds cross to remove button\n        removeButton.appendChild(removeButtonText);\n        removeButton.classList.add('removeButton');\n        removeButton.addEventListener('click', () => {\n            tracker.remove(name);\n        });\n        return removeButton;\n    }\n    setInTurn(inturn) {\n        if (this._character === inturn) {\n            this.entryDiv.classList.add('inturn');\n            this.entryDiv.scrollIntoView();\n        }\n        else {\n            this.entryDiv.classList.remove('inturn');\n        }\n    }\n    get entryDiv() {\n        return this._entryDiv;\n    }\n    nameChanged(name) {\n        throw new Error(\"Method not implemented.\");\n    }\n    initiativeChanged(initiative) {\n        throw new Error(\"Method not implemented.\");\n    }\n    characterInTurnChanged(inturn) {\n        this.setInTurn(inturn);\n    }\n}\n\n\n//# sourceURL=webpack://pathtracker/./src/pathtracker/gui/CharacterEntryImpl.ts?");

/***/ }),

/***/ "./src/pathtracker/gui/ControllerImpl.ts":
/*!***********************************************!*\
  !*** ./src/pathtracker/gui/ControllerImpl.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ControllerImpl\": () => (/* binding */ ControllerImpl)\n/* harmony export */ });\n/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util */ \"./src/pathtracker/gui/Util.ts\");\n\nclass ControllerImpl {\n    constructor(tracker) {\n        console.log(\"test\");\n        this._tracker = tracker;\n        console.log(this._tracker);\n        document.getElementById(\"addButton\").addEventListener(\"click\", () => this.add());\n        document.getElementById(\"nextTurnButton\").addEventListener(\"click\", () => this.nextTurn());\n    }\n    nextTurn() {\n        this._tracker.nextTurn();\n    }\n    add() {\n        let name = this.getNameInput();\n        let initiative = this.getInitiativeInput();\n        let type = this.getTypeInput();\n        try {\n            this._tracker.addCharacter(name, initiative, type);\n        }\n        catch (err) {\n            alert(err);\n        }\n    }\n    getNameInput() {\n        return this.getInputValue(\"nameInput\");\n    }\n    getInitiativeInput() {\n        return parseInt(this.getInputValue(\"initInput\"));\n    }\n    getTypeInput() {\n        const typeString = this.getInputValue('typeInput');\n        const type = (0,_Util__WEBPACK_IMPORTED_MODULE_0__.characterTypeFromString)(typeString);\n        return type;\n    }\n    getInputValue(id) {\n        return document.getElementById(id).value;\n    }\n}\n\n\n//# sourceURL=webpack://pathtracker/./src/pathtracker/gui/ControllerImpl.ts?");

/***/ }),

/***/ "./src/pathtracker/gui/GuiImpl.ts":
/*!****************************************!*\
  !*** ./src/pathtracker/gui/GuiImpl.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GuiImpl\": () => (/* binding */ GuiImpl)\n/* harmony export */ });\n/* harmony import */ var _CharacterEntryImpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CharacterEntryImpl */ \"./src/pathtracker/gui/CharacterEntryImpl.ts\");\n\nclass GuiImpl {\n    constructor(tracker) {\n        this._tracker = tracker;\n        this._charactersDiv = document.getElementById(\"characters\");\n    }\n    update() {\n        this._charactersDiv.innerHTML = \"\";\n        this._tracker.characters.forEach(e => {\n            let entry = new _CharacterEntryImpl__WEBPACK_IMPORTED_MODULE_0__.CharacterEntryImpl(e, this._tracker);\n            this._tracker.addCharacterObserver(entry);\n            this._charactersDiv.appendChild(entry.entryDiv);\n        });\n        this._charactersDiv.appendChild(this.createCharacterStopper());\n    }\n    createCharacterStopper() {\n        const stopper = document.createElement('div');\n        stopper.classList.add('stopper');\n        return stopper;\n    }\n    clear() {\n        throw new Error(\"Method not implemented.\");\n    }\n    endOfTurn(next) { }\n    characterAdded(character) {\n        this.update();\n    }\n    characterRemoved(character) {\n        this.update();\n    }\n}\n\n\n//# sourceURL=webpack://pathtracker/./src/pathtracker/gui/GuiImpl.ts?");

/***/ }),

/***/ "./src/pathtracker/gui/Util.ts":
/*!*************************************!*\
  !*** ./src/pathtracker/gui/Util.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"characterTypeFromString\": () => (/* binding */ characterTypeFromString)\n/* harmony export */ });\n/* harmony import */ var _framework_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/interfaces */ \"./src/pathtracker/framework/interfaces.ts\");\n\nfunction characterTypeFromString(type) {\n    switch (type) {\n        case _framework_interfaces__WEBPACK_IMPORTED_MODULE_0__.CharacterType.PLAYER: return _framework_interfaces__WEBPACK_IMPORTED_MODULE_0__.CharacterType.PLAYER;\n        case _framework_interfaces__WEBPACK_IMPORTED_MODULE_0__.CharacterType.ENEMY: return _framework_interfaces__WEBPACK_IMPORTED_MODULE_0__.CharacterType.ENEMY;\n        default: throw new Error(`${type} is not a valid charactertype.`);\n    }\n}\n\n\n//# sourceURL=webpack://pathtracker/./src/pathtracker/gui/Util.ts?");

/***/ }),

/***/ "./src/pathtracker/standard/SyncJSONFileManager.ts":
/*!*********************************************************!*\
  !*** ./src/pathtracker/standard/SyncJSONFileManager.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SyncJSONFileManager\": () => (/* binding */ SyncJSONFileManager)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"?7c6a\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\nclass SyncJSONFileManager {\n    read(dir) {\n        try {\n            const data = fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(dir, 'utf-8');\n            const object = JSON.parse(data);\n            return object;\n        }\n        catch (err) {\n            throw new Error(`File cannet be read due to an error. ${err}`);\n        }\n    }\n    write(dir, value) {\n        const stringValue = JSON.stringify(value, null, 2);\n        fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync(dir, stringValue);\n    }\n}\n\n\n//# sourceURL=webpack://pathtracker/./src/pathtracker/standard/SyncJSONFileManager.ts?");

/***/ }),

/***/ "./src/pathtracker/standard/TrackerImpl.ts":
/*!*************************************************!*\
  !*** ./src/pathtracker/standard/TrackerImpl.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("var __dirname = \"/\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TrackerImpl\": () => (/* binding */ TrackerImpl)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"?7b3a\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _framework_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/interfaces */ \"./src/pathtracker/framework/interfaces.ts\");\n\n\nclass TrackerImpl {\n    constructor(fileManager) {\n        this._characters = [];\n        this._characterInTurn = null;\n        this._round = 0;\n        this._characterObservers = [];\n        this._fileManager = fileManager;\n    }\n    save(filename) {\n        this._fileManager.write(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, '..', 'saves', filename) + '.json', this);\n    }\n    load(filename) {\n        const tracker = this._fileManager.read(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, '..', 'saves', filename) + '.json');\n        this._characters = tracker._characters;\n        this._characterInTurn = tracker._characterInTurn;\n        this._round = tracker._round;\n    }\n    get characters() {\n        return this._characters;\n    }\n    get round() {\n        return this._round;\n    }\n    get characterInTurn() {\n        return this._characterInTurn;\n    }\n    set characterInTurn(character) {\n        this._characterInTurn = character;\n        this._characterObservers.forEach(e => e.characterInTurnChanged(character));\n    }\n    get size() {\n        return this._characters.length;\n    }\n    nextTurn() {\n        const isTrackerEmpty = this.size === 0;\n        if (isTrackerEmpty)\n            return;\n        const isFirstTurn = this.characterInTurn === null;\n        if (isFirstTurn) {\n            this.characterInTurn = this._characters[0];\n            this._round = 1;\n        }\n        else {\n            const nextIndex = this.nextIndex();\n            this.characterInTurn = this.characters[nextIndex];\n            const isNewRound = nextIndex === 0;\n            if (isNewRound)\n                this._round++;\n        }\n        this._trackerObserver.endOfTurn(this.characterInTurn);\n    }\n    nextIndex() {\n        if (this.characterInTurn === null)\n            return 0;\n        return (this.characters.indexOf(this.characterInTurn) + 1) % this.size;\n    }\n    addCharacter(name, initiative, type) {\n        const isEmptyName = name === '';\n        if (isEmptyName)\n            throw new Error(\"Can't add a character with no name\");\n        const isDuplicate = this.getCharacter(name) !== undefined;\n        if (isDuplicate)\n            throw new Error(\"Can't add a character that already exists\");\n        const character = { name: name, initiative: initiative, type: type };\n        this._characters.push(character);\n        this.sort();\n        this._trackerObserver.characterAdded(character);\n    }\n    sort() {\n        this._characters.sort((a, b) => {\n            if (a.name.toLowerCase() == b.name.toLocaleUpperCase())\n                return 0;\n            if (a.name.toLowerCase() < b.name.toLowerCase())\n                return -1;\n            return 1;\n        }).sort((a, b) => {\n            if (a.type === b.type)\n                return 0;\n            if (a.type === _framework_interfaces__WEBPACK_IMPORTED_MODULE_1__.CharacterType.PLAYER)\n                return -1;\n            return 1;\n        }).sort((a, b) => b.initiative - a.initiative);\n    }\n    remove(name) {\n        const removee = this.getCharacter(name);\n        if (removee === undefined)\n            return null;\n        const removeIndex = this.characters.indexOf(removee);\n        if (removee == this.characterInTurn)\n            this.nextTurn();\n        this.characters.splice(removeIndex, 1);\n        this._trackerObserver.characterRemoved(removee);\n        return removee;\n    }\n    getCharacter(name) {\n        return this.characters.find(e => e.name == name);\n        ;\n    }\n    clear() {\n        this._characters = [];\n        this._round = 0;\n        this._trackerObserver.clear();\n    }\n    addTrackerObserver(trackerObserver) {\n        this._trackerObserver = trackerObserver;\n    }\n    addCharacterObserver(characterObserver) {\n        this._characterObservers.push(characterObserver);\n    }\n}\n\n\n//# sourceURL=webpack://pathtracker/./src/pathtracker/standard/TrackerImpl.ts?");

/***/ }),

/***/ "?7c6a":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pathtracker/fs_(ignored)?");

/***/ }),

/***/ "?7b3a":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://pathtracker/path_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;