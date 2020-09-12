
const isInstalled = require('is-installed')

const availableLanguages = {
    'js': '@pressdocs/lang-js'
}

const plugin = (options, context) => {
    return {
        name: 'pressdocs',

        additionalPages () {
            let pages = []

            for (const lang of Object.values(availableLanguages)) {
                if (isInstalled(lang)) {
                    const build = require(lang)
                    const languagePages = build(options, context)

                    pages = pages.concat(languagePages)
                }
            }

            return pages
        }
    }
}

module.exports = plugin
