/**
 * Created by Алексей on 20.12.2017.
 */
var extendConstructor = require('../utils/extendConstructor');
var getTextNode = require('../utils/getTextNode');
var Eventable = require('../modules/Eventable');
var l10n = require('../modules/l10n');
var Filter = require('../components/Filter');

/**
 * @constructor
 * @implements {EventListener}
 */
function TodoActionsBarConstructor() {
    this._initEventable();

    this._counterNode = document.querySelector('.js-todos-action-bar_items-count');
    this._counterNodeText = getTextNode(this._counterNode);
    this._clearCompletedNode = document.querySelector('.js-todos-action-bar_clear-button');

    this._clearCompletedNode.addEventListener('click', this);

    this._filters = new Filter(document.querySelector('.js-todos-action-bar_filter'));

    this._filters.on('filterSelected', this._onFilterSelected, this);
}

extendConstructor(TodoActionsBarConstructor, Eventable);

var todoActionsBarConstructorPrototype = TodoActionsBarConstructor.prototype;

todoActionsBarConstructorPrototype._onFilterSelected = function (filterId) {
    this.trigger('filterSelected', filterId);
};

/**
 * @return {TodoActionsBarConstructor}
 * @private
 */
todoActionsBarConstructorPrototype._clearCompleted = function () {
    this.trigger('clearCompleted');
    return this;
};

/**
 * @param {Number} count
 * @return {TodoActionsBarConstructor}
 */
todoActionsBarConstructorPrototype.setItemsCount = function (count) {
    this._counterNodeText.nodeValue = count + ' ' + l10n.plural('todosCountLabel', count);
    return this;
};

/**
 * @param {Event} e
 */
todoActionsBarConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            this._clearCompleted();
            break;
    }
};

module.exports = TodoActionsBarConstructor;