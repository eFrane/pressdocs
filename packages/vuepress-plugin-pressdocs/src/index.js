'use strict'

const isInstalled = require('is-installed')
const { getLanguages } = require('@pressdocs/lang/lib/Settings')
const availableLanguages = require('./languages.json')

const plugin = (options, context) => {
    let languageProviders = []

    // initialize language providers
    const configuredLanguages = Object.keys(getLanguages(options))

    for (const [languageIdentifier, providerPackage] of Object.entries(availableLanguages)) {
        // don't initialize non-configured providers
        if (!configuredLanguages.includes(languageIdentifier)) {
            continue
        }

        // they should also be installed
        if (!isInstalled(providerPackage)) {
            console.warn(`Language provider ${providerPackage} is configured but not installed`)
            continue
        }

        const Provider = require(providerPackage)
        const providerInstance = new Provider(options, context)

        if (!providerInstance.canRun()) {
            console.warn(`Language provider ${providerPackage} is missing external dependencies, check \`vuepress pressdocs-lint\` for details`)
            continue
        }

        languageProviders.push()
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
        },

        extendCli (cli) {
            cli.command('pressdocs-lint [targetDir]', 'Information about the pressdocs configuration')
                .action(() => {
                    // TODO: implement lint command
                })
        }
    }
}

module.exports = plugin
