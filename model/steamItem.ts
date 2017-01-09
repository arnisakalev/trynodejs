export class SteamItem {
    public logoUrl: string;
    public communityAppUrl: string;
    public originalPrice: number;
    public finalPrice: number;
    public discount: number;
    public storeAppUrl: string;
    public appName: string;
    public appAddedDate: Date;
}

export class SteamItems {
    public steamItems: Array<SteamItem>;

    public Add(SteamItem: SteamItem) { this.steamItems.push(SteamItem); }

    constructor() {
        this.steamItems = new Array<SteamItem>();
    }
}

export class SteamParseResult {
    protected _IsSuccess: boolean = false;
    protected _steamItems: SteamItems = new SteamItems();
    protected _resultMessage: string = "Тока запустили - погоди";

    public getIsSuccess(): boolean { return this._IsSuccess; }
    public setIsSuccess(IsSuccess: boolean) { this._IsSuccess = IsSuccess; }

    public getSteamItems(): SteamItems { return this._steamItems; }
    public setSteamItems(Items: SteamItems) { this._steamItems = Items; }

    public getResultMessage(): string { return this._resultMessage; }
    public setResultMessage(Message: string) { this._resultMessage = Message; }
}