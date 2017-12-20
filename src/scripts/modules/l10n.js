function EAST_SLAVIC_ALGORITHM(number) {
    var value = Math.abs(number);

    if ((value % 10 === 1) && (value % 100 !== 11)) {
        return 0;
    }
    if ((2 <= (value % 10))
        && ((value % 10) <= 4)
        && (Math.floor((value % 100) / 10) !== 1)
    ) {
        return 1;
    }

    return 2;
}

function ROMANO_GERMANIC_ALGORITHM(number) {
    return (Math.abs(number) === 1) ? 0 : 1;
}

var pluralAlgorithms = {
    'ru': EAST_SLAVIC_ALGORITHM,
    'en': ROMANO_GERMANIC_ALGORITHM
};

var l10n = {
    language: 'ru',
    _dictionaries: {},

    /**
     * @param {String} key
     * @return {String}
     * @private
     */
    _getDictValue: function (key) {
        var language = this.language;

        if (!(language in this._dictionaries)
            || !(key in this._dictionaries[language])
        ) {
            return null;
        }

        return this._dictionaries[language][key];
    },

    /**
     * @param {String} languageCode
     * @param {Object} dict
     * @return {l10n}
     */
    provideDict: function (languageCode, dict) {
        this._dictionaries[languageCode] = dict;
        return this;
    },

    /**
     * @param {String} key
     * @return {String}
     */
    simple: function (key) {
        var dictValue = this._getDictValue(key);
        if (dictValue !== null) {
            return dictValue;
        }
        return key;
    },

    /**
     * @param {String} key
     * @param {Number} number
     * @return {String}
     */
    plural: function (key, number) {
        var dictValue = this._getDictValue(key);
        if (dictValue === null) {
            return key;
        }

        var currentPluralAlgorithm = pluralAlgorithms[this.language] || pluralAlgorithms.ru;
        var result = dictValue[currentPluralAlgorithm(number)];

        if (result != null) {
            return result;
        }
        return key;

    }
};

module.exports = l10n;