
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
                    pages.concat(build(options, context))
                }
            }

            return pages
        }
    }
}

module.exports = plugin
