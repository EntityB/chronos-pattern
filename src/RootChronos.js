import { Chronos } from "./Chronos.js"

/**
 * Root node for frontend javascript. 
 * Is based on requestAnimationFrame, so it updates at least every 16.7ms or more often. 
 * 
 * @constructor
 * @extends Chronos
 * @param {Boolean} [opt_updating] - if false, node will not update node childs by default
 */
var RootChronos = function () {
    Chronos.call(this);
};

RootChronos.prototype = Object.assign({}, Chronos.prototype, {
    _init: function () {
        Chronos.prototype._init.call(this);
        this._startTime = 0;
    },
    /**
     * sets times for updating method
     * 
     * @private
     * @param {Number} timestamp - window.requestAnimationFrame specific
     */
    _updateWrapper: function (timestamp) {
        var deltaTime;

        deltaTime = timestamp - this._lastTime;
        this._lastTime = timestamp;

        this.update(deltaTime); // start standart 
        this._lockId = window.requestAnimationFrame(this._updateWrapper.bind(this));
    },
    /**
     * starts updating tree based on requestAnimationFrame
     */
    start: function () {
        this._lastTime = performance.now();
        this._lockId = window.requestAnimationFrame(this._updateWrapper.bind(this));
    },
    /**
     * stops updating tree
     */
    stop: function () {
        if (!this._lockId)
            return;

        window.cancelAnimationFrame(this._lockId);
        delete this._lockId;
    }
});