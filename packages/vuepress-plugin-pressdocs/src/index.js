'use strict'

const isInstalled = require('is-installed')

const availableLanguages = {
    'js': '@pressdocs/lang-js'
}

const plugin = (options, context) => {
    let languageProviders = []

    for (const providerPackage of Object.values(availableLanguages)) {
        if (isInstalled(providerPackage)) {
            const Provider = require(providerPackage)
            languageProviders.push(new Provider(options, context))
        }
    }

    return {
        name: 'pressdocs',

        additionalPages () {
            let pages = []

            languageProviders
                .filter(provider => provider.hasAdditionalPages())
                .map(provider => {
                    pages = pages.concat(provider.getAdditionalPages())
                })

            return pages
        }
    }
}

module.exports = plugin
