/**
 * Created by Алексей on 20.12.2017.
 */
var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');
var templatesEngine = require('../modules/templatesEngine');

var READY_MODIFICATOR = '__ready';
var HIDDEN_MODIFICATOR = '__hide';
var HIDDEN_DIV_CLASS = 'hidden-container';
var MIN_TEXT_HEIGHT  = '40';
/**
 * @param itemData
 * @implements {EventListener}
 * @constructor
 */
function TodoItemConstructor(itemData) {
    this._initEventable();

    var templateResult = templatesEngine.todoItem({
        text: itemData.text
    });

    this._root = templateResult.root;
    this._markReady = templateResult.markReady;
    this._removeAction = templateResult.removeAction;
    this._text = templateResult.text;

    this.model = {
        id: itemData.id,
        isReady: itemData.isReady || false,
        text: itemData.text
    };

    if (itemData.isReady) {
        this._setReadyModificator(true);
    }

    var hiddenDiv = document.getElementsByClassName(HIDDEN_DIV_CLASS)[0];
    if (hiddenDiv == null) {
        hiddenDiv = document.createElement('div');
        hiddenDiv.classList.add(HIDDEN_DIV_CLASS);
        hiddenDiv.style.width = getComputedStyle(this._text).width;
        document.getElementsByTagName('body')[0].appendChild(hiddenDiv);
    }
    this._hiddenBlock = hiddenDiv;
    this._markReady.addEventListener('change', this);
    this._removeAction.addEventListener('click', this);
    this._text.addEventListener('input', this);


}

extendConstructor(TodoItemConstructor, Eventable);

var todoItemConstructorPrototype = TodoItemConstructor.prototype;

/**
 * @param {HTMLElement} parent
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.render = function (parent) {
    parent.appendChild(this._root);
    return this;
};

/**
 * @param {Event} e
 */
todoItemConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'change':
            this.setReady(this._markReady.checked);
            break;
        case 'click':
            if (e.target === this._removeAction) {
                this.remove();
            }
            break;
        case 'input':
            this.resizeText(this._text.value);
            this.setText(this._text.value);
            break;

    }
};


todoItemConstructorPrototype.resizeText = function (text) {

    var content = text;
    var textHeight;
    var textFontSize =  parseInt(window.getComputedStyle(this._hiddenBlock).fontSize, 10)
    content = content.replace(/\n/g, '<br>');
    this._hiddenBlock.innerHTML = content;
    textHeight = parseInt(window.getComputedStyle(this._hiddenBlock).height, 10);

    if (textHeight > MIN_TEXT_HEIGHT)
    {
        this._text.style.height = textHeight + textFontSize + "px";
    }
    else
    {
        this._text.style.height = MIN_TEXT_HEIGHT + "px";
    }
    return this;
}


/**
 * @param {String} text
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.setText = function (text) {
    if (this.model.text !== text) {
        this._text.innerHTML = text;
        this.model.text = text;
        this.trigger('change', this.model);
    }
    return this;
};

/**
 * @param {Boolean} isReady
 * @return {TodoItemConstructor}
 * @private
 */
todoItemConstructorPrototype._setReadyModificator = function (isReady) {
    if (isReady) {
        this._root.classList.add(READY_MODIFICATOR);
    } else {
        this._root.classList.remove(READY_MODIFICATOR);
    }
    return this;
};

/**
 * @param {Boolean} isReady
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.setReady = function (isReady) {
    if (isReady !== this.model.isReady) {
        this._markReady.checked = isReady;
        this.model.isReady = isReady;
        this._setReadyModificator(isReady);
        this.trigger('change', this.model);
    }
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
    this.trigger('remove', this.model.id);
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.show = function () {
    this._root.classList.remove(HIDDEN_MODIFICATOR);
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.hide = function () {
    this._root.classList.add(HIDDEN_MODIFICATOR);
    return this;
};

module.exports = TodoItemConstructor;