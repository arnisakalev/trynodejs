/// <reference path="../typings/tsd.d.ts" />
import { SteamParseResult, SteamItem, SteamItems } from '../model/steamitem';
var request = require('request');
var jsdom = require('jsdom');

export class WishListParser {
    protected _userName: string;
    protected _token: number;
    protected _result: SteamParseResult;

    get UserName(): string {
        return this._userName;
    }

    get Token(): number{
        return this._token;
    }

    get Result() : SteamParseResult{
        return this._result;
    }

    protected getWishListUrl() {
        return 'http://steamcommunity.com/id/' + this._userName + '/wishlist/';
    }

    constructor(UserName: string, Token: number) {
        this._userName = UserName;
        this._token = Token;
        this._result = new SteamParseResult();
    }

    public ParseWishList() {
        let prom = new Promise<SteamParseResult>((resolve, reject) => {
            this.loadPage().then((body) => {
                this.parseBody(body).then((result) => {
                    resolve(result);
                });
            });
        });
        prom.then((data) => {
            this._result = data;
        });
    }

    /**
     * Загрузить данные wishlist
     */
    protected loadPage(): Promise<string> {
        return new Promise<string>((a, b) => {
            request(
                { uri: this.getWishListUrl() },
                (error, response, body) => {
                    if (error && response.statusCode !== 200) {
                        b('Error when contacting wishlist');
                    } else {
                        a(body);
                    };
                });
        });
    }

    /**
     * Вернуть все элементы списка
     */
    protected parseBody(body: string): Promise<SteamParseResult> {
        return new Promise<SteamParseResult>((a, b) => {
            let result = new SteamParseResult();
            let items = new SteamItems();
            jsdom.env(body, ['http://code.jquery.com/jquery.js'], (err, window) => {
                if (err) {
                    result.setSteamItems(items);
                    result.setIsSuccess(false);
                    result.setResultMessage(err);
                    b(result);
                } else {
                    var $ = window.jQuery;
                    $.map($('.wishlistRow'), (element, index) => {
                        var item = new SteamItem();
                        item.communityAppUrl = $('.gameListRowLogo a', element).attr('href');
                        item.logoUrl = $('.gameListRowLogo img', element).attr('src');
                        item.appName = $('h4.ellipsis', element).text();
                        item.appAddedDate = $('.wishlist_added_on', element).text().replace(/\n/g, '').replace(/\t/g, '');
                        if ($('.gameListPriceData .discount_block', element).length > 0) {
                            item.discount = this.parsePrice($('.gameListPriceData .discount_pct', element).text().replace(/\n/g, '').replace(/\t/g, ''));
                            item.originalPrice = this.parsePrice($('.gameListPriceData .discount_original_price', element).text().replace(/\n/g, '').replace(/\t/g, ''));
                            item.finalPrice = this.parsePrice($('.gameListPriceData .discount_final_price', element).text().replace(/\n/g, '').replace(/\t/g, ''));
                        } else {
                            item.originalPrice = this.parsePrice($('.gameListPriceData .price', element).text().replace(/\n/g, '').replace(/\t/g, ''));
                        }
                        items.Add(item);
                    });
                    result.setSteamItems(items);
                    let count = items.steamItems.length;
                    result.setIsSuccess(true);
                    result.setResultMessage('Найдено ' + count + ' записей');
                    a(result);
                }
            });
        });
    }

    /**
     * Преобразовать цену в число
     */
    protected parsePrice(price: string): number {
        return parseInt(price.replace('руб.', ''));
    }
}