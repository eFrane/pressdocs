'use strict'

class LanguageProvider {
    constructor(options, context) {
        this.options = options
        this.context = context
    }

    getData () {
        return {}
    }

    hasAdditionalPages () {
        return false
    }

    getAdditionalPages () {
        return []
    }
}

module.exports = { LanguageProvider }
