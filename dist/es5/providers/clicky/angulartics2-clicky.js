"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var angulartics2_1 = require("../../core/angulartics2");
var Angulartics2Clicky = /** @class */ (function () {
    function Angulartics2Clicky(angulartics2, titleService) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.titleService = titleService;
        if (typeof (clicky) === 'undefined') {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    }
    Angulartics2Clicky.prototype.pageTrack = function (path) {
        var title = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    };
    Angulartics2Clicky.prototype.eventTrack = function (action, properties) {
        if (typeof (properties.goal) === 'undefined') {
            var title = properties.title || null;
            var type = (properties.eventType != null) ? this.validateType(properties.eventType) : null;
            clicky.log(action, title, type);
        }
        else {
            var goalId = properties.goal;
            var revenue = this.validateNumber(properties.revenue) ? properties.revenue : null;
            var noQueue = !!properties.noQueue;
            clicky.goal(goalId, revenue, noQueue);
        }
    };
    Angulartics2Clicky.prototype.validateType = function (type) {
        var TYPE_ENUM = ['click', 'download', 'outbound', 'pageview'];
        return (TYPE_ENUM.indexOf(type) >= 0) ? type : 'pageview';
    };
    Angulartics2Clicky.prototype.validateNumber = function (number) {
        return typeof number === 'number' && isFinite(number);
    };
    Angulartics2Clicky.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Angulartics2Clicky.ctorParameters = function () { return [
        { type: angulartics2_1.Angulartics2, },
        { type: platform_browser_1.Title, },
    ]; };
    return Angulartics2Clicky;
}());
exports.Angulartics2Clicky = Angulartics2Clicky;