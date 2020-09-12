'use strict'

const { Settings } = require('@pressdocs/lang/lib/Settings')

class JsSettings extends Settings {
    /**
     *
     * @param {Object} context
     * @param {Object} options
     */
    constructor(options, context) {
        super()

        const defaults = {
            sourceDir: context.sourceDir,
            matchPattern: '/**/*.js',
            jsdocOptions: {},

            /**
             * Allowed values: fullpage, category
             */
            buildMode: 'fullpage',
            path: null,
            title: 'Reference (JS)'
        }

        let settings = this.extractLanguageSettings(options, 'js', defaults)

        // validate build mode
        const availableBuildModes = ['category', 'fullpage']
        if (!availableBuildModes.includes(settings.buildMode)) {
            const buildModesStr = availableBuildModes.join(', ')
            throw new Error(`Incorrect build mode, choose one of: ${buildModesStr}`)
        }

        // validate path
        if (null === settings.path) {
            throw new Error('Missing navigation path')
        }

        Object.assign(this, settings)
    }
}

module.exports = { JsSettings }
