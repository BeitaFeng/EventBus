"use strict";
var EventBus = /** @class */ (function () {
    function EventBus(events) {
        this.events = events || new Map();
    }
    EventBus.prototype.on = function (type, handler) {
        var handlers = this.events.get(type);
        if (handlers) {
            handlers.push(handler);
        }
        else {
            this.events.set(type, [handler]);
        }
    };
    EventBus.prototype.off = function (type, handler) {
        var handlers = this.events.get(type);
        if (handlers) {
            if (handler) {
                var index = handlers.indexOf(handler);
                if (index > -1) {
                    handlers.splice(index, 1);
                }
            }
            else {
                this.events.set(type, []);
            }
        }
    };
    EventBus.prototype.emit = function (type, value) {
        var handlers = this.events.get(type);
        if (handlers) {
            for (var _i = 0, _a = handlers.slice(); _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(value);
            }
        }
        handlers = this.events.get("*");
        if (handlers) {
            for (var _b = 0, _c = handlers.slice(); _b < _c.length; _b++) {
                var handler = _c[_b];
                handler(type, value);
            }
        }
    };
    return EventBus;
}());
