'use strict'

const jsdoc2md = require('jsdoc-to-markdown')

const JsSettings = require('./JsSettings').JsSettings
const PageBuilder = require('./PageBuilder').PageBuilder

function build (options, context) {
    const settings = new JsSettings(options, context)

    let data = jsdoc2md.getTemplateDataSync({
        files: settings.sourceDir + settings.matchPattern
    })

    const pageBuilder = new PageBuilder(settings)

    return pageBuilder.build(data)
}

module.exports = build
