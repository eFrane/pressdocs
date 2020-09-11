'use strict'

const dmd = require('dmd')
const fs = require('fs')

/**
 * Load a Handlebars template from the templates folder
 *
 * @param {String} name Template name without file extension
 */
function templateLoader (name) {
    const templatePath = __dirname + '/../templates/'
    return fs.readFileSync(templatePath + name + '.hbs', 'utf-8').toString()
}

class PageBuilder {
    /**
     *
     * @param {Settings} settings
     */
    constructor(settings) {
        this.settings = settings
    }

    /**
     *
     * @param {Object} data
     */
    build (data) {
        let pages = []

        switch (this.settings.buildMode) {
            case 'fullpage':
                pages = this._buildFullPage(data)
                break;

            case 'category':
                pages = this._buildCategories(data)
                break

            default:
                // valid build modes are checked earlier thus this can just break
                break
        }

        return pages
    }

    _buildFullPage (data) {
        const template = templateLoader('single_page')

        return [
            {
              path: this.settings.path,
              content: dmd(data, { template })
            }
        ]
    }

    _buildCategories (data) {
        throw new Error('Not yet implemented')
    }
}

module.exports = { PageBuilder }
