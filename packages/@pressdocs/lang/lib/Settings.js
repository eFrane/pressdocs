'use strict'

function getLanguages (options) {
    if (!Object.keys(options).includes('languages')) {
        return undefined
    }

    return options['languages']
}

function hasLanguage (options, language) {
    const languages = getLanguages(options)

    if (typeof languages === 'undefined' || !Object.prototype.hasOwnProperty.call(languages, language)) {
        return false
    }

    return true
}

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
        if (!hasLanguage(options, language)) {
            // there's no settings for the current namespace,
            // just return the defaults
            return Object.assign({}, defaults)
        }

        return Object.assign({}, defaults, options['languages'][language])
    }
}

module.exports = { getLanguages, hasLanguage, Settings }
