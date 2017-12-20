var TODOS_MAIN_SELECTOR = '.js-container';
var EMPTY_INTERFACE_MODIFICATOR = '__empty';

function TodoMainConstructor() {
    this._todosMain = document.querySelector(TODOS_MAIN_SELECTOR);
}

var todoMainComponentConstructorPrototype = TodoMainConstructor.prototype;

todoMainComponentConstructorPrototype.showFullInterface = function () {
    this._todosMain.classList.remove(EMPTY_INTERFACE_MODIFICATOR);
    return this;
};

todoMainComponentConstructorPrototype.hideFullInterface = function () {
    this._todosMain.classList.add(EMPTY_INTERFACE_MODIFICATOR);
    return this;
};

module.exports = TodoMainConstructor;