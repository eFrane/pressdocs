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

    /**
     * This method will be called to check whether the system
     * supports running this language provider. For anything
     * other than JavaScript, additional software may need
     * to be present on the system.
     */
    canRun () {
        return false
    }
}

module.exports = { LanguageProvider }
