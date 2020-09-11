'use strict'

/**
 * Base class for language provider settings
 */
class Settings {
    /**
     * Extract language settings from the namespaced plugins options object
     *
     * @param {Object} options
     * @param {String} namespace
     * @param {Object} defaults
     */
    extractSettings (options, namespace, defaults) {
        if (!options.includes('languages') || !options['languages'].includes(namespace)) {
            // there's no settings for the current namespace,
            // just return the defaults
            return Object.assign({}, defaults)
        }

        return Object.assign({}, defaults, options[namespace])
    }
}

module.exports = { Settings }
