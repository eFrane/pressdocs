'use strict'

const jsdoc2md = require('jsdoc-to-markdown')

const { JsSettings } = require('./JsSettings')
const { PageBuilder } = require('./PageBuilder')
const { LanguageProvider } = require('@pressdocs/lang/lib/LanguageProvider')

class JsProvider extends LanguageProvider {
    constructor(options, context) {
        super(options, context)

        this.settings = new JsSettings(options, context)
    }

    getData () {
        return jsdoc2md.getTemplateDataSync({
            files: this.settings.sourceDir + this.settings.matchPattern,
            ...this.settings.jsDocOptions
        })
    }

    hasAdditionalPages () {
        return true
    }

    getAdditionalPages () {
        const pageBuilder = new PageBuilder(this.settings)

        return pageBuilder.build(this.getData())
    }

    /**
     * jsdoc2md needs the same node this plugin needs
     * thus it can always run and no further checks are required
     */
    canRun () {
        return true
    }
}

module.exports = JsProvider
