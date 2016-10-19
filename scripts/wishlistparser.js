"use strict";
/// <reference path="../typings/tsd.d.ts" />
const steamitem_1 = require('../model/steamitem');
var request = require('request');
var jsdom = require('jsdom');
class WishListParser {
    constructor(UserName) {
        this._userName = UserName;
    }
    getWishListUrl() {
        return 'http://steamcommunity.com/id/' + this._userName + '/wishlist/';
    }
    ParseWishList() {
        return new Promise((resolve, reject) => {
            this.loadPage().then((body) => {
                this.parseBody(body).then((result) => {
                    resolve(result);
                });
            });
        });
    }
    /**
     * Загрузить данные wishlist
     */
    loadPage() {
        return new Promise((a, b) => {
            request({ uri: this.getWishListUrl() }, (error, response, body) => {
                if (error && response.statusCode !== 200) {
                    b('Error when contacting wishlist');
                }
                else {
                    a(body);
                }
                ;
            });
        });
    }
    /**
     * Вернуть все элементы списка
     */
    parseBody(body) {
        return new Promise((a, b) => {
            let result = new steamitem_1.SteamParseResult();
            let items = new steamitem_1.SteamItems();
            jsdom.env(body, ['http://code.jquery.com/jquery.js'], (err, window) => {
                if (err) {
                    result.setSteamItems(items);
                    result.setIsSuccess(false);
                    result.setResultMessage(err);
                    b(result);
                }
                else {
                    var $ = window.jQuery;
                    $.map($('.wishlistRow'), (element, index) => {
                        var item = new steamitem_1.SteamItem();
                        item.communityAppUrl = $('.gameListRowLogo a', element).attr('href');
                        item.logoUrl = $('.gameListRowLogo img', element).attr('src');
                        item.appName = $('h4.ellipsis', element).text();
                        item.appAddedDate = $('.wishlist_added_on', element).text().replace(/\n/g, '').replace(/\t/g, '');
                        if ($('.gameListPriceData .discount_block', element).length > 0) {
                            item.discount = this.parsePrice($('.gameListPriceData .discount_pct', element).text().replace(/\n/g, '').replace(/\t/g, ''));
                            item.originalPrice = this.parsePrice($('.gameListPriceData .discount_original_price', element).text().replace(/\n/g, '').replace(/\t/g, ''));
                            item.finalPrice = this.parsePrice($('.gameListPriceData .discount_final_price', element).text().replace(/\n/g, '').replace(/\t/g, ''));
                        }
                        else {
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
    parsePrice(price) {
        return parseInt(price.replace('руб.', ''));
    }
}
exports.WishListParser = WishListParser;
//# sourceMappingURL=wishlistparser.js.map