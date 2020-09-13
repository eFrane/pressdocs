'use strict'

const which = require('which')

const { LanguageProvider } = require('@pressdocs/lang/lib/LanguageProvider')

class PHPProvider extends LanguageProvider {
    constructor(options, context) {
        super(options, context)
    }

    canRun () {
        const phpBin = which.sync('php', { nothrow: true })

        if (null !== phpBin) {
            this.phpBin = phpBin

            return true
        }

        return false
    }
}

module.exports = PHPProvider
