"use strict";
class SteamItem {
}
exports.SteamItem = SteamItem;
class SteamItems {
    constructor() {
        this.steamItems = new Array();
    }
    Add(SteamItem) { this.steamItems.push(SteamItem); }
}
exports.SteamItems = SteamItems;
class SteamParseResult {
    getIsSuccess() { return this._IsSuccess; }
    setIsSuccess(IsSuccess) { this._IsSuccess = IsSuccess; }
    getSteamItems() { return this._steamItems; }
    setSteamItems(Items) { this._steamItems = Items; }
    getResultMessage() { return this._resultMessage; }
    setResultMessage(Message) { this._resultMessage = Message; }
}
exports.SteamParseResult = SteamParseResult;
//# sourceMappingURL=steamItem.js.map