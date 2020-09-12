'use strict'

/**
 * Base class for language provider settings
 */
class Settings {
    /**
     * Extract language settings from the plugins' options object
     *
     * @param {Object} options
     * @param {String} language
     * @param {Object} defaults
     */
    extractLanguageSettings (options, language, defaults) {
        const hasLanguage = (options, language) => {
            if (!Object.keys(options).includes('languages')) {
                return false
            }

            const languages = options['languages']

            if (!Object.prototype.hasOwnProperty.call(languages, language)) {
                return false
            }

            return true
        }

        if (!hasLanguage(options, language)) {
            // there's no settings for the current namespace,
            // just return the defaults
            return Object.assign({}, defaults)
        }

        return Object.assign({}, defaults, options['languages'][language])
    }
}

module.exports = { Settings }
