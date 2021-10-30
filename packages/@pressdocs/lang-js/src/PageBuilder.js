'use strict'

const dmd = require('dmd')
const fs = require('fs')
const handlebars = require('handlebars')

/**
 * Load a Handlebars template from the templates folder
 *
 * @param {String} name Template name without file extension
 */
function templateLoader (name) {
    const templatePath = __dirname + '/../templates/'
    return fs.readFileSync(templatePath + name + '.hbs', 'utf-8').toString()
}

function templateParser (name, data) {
    const templateString = templateLoader(name)
    const template = handlebars.compile(templateString)

    return template(data)
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

            case 'kind':
                pages = this._buildByKind(data)
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
                content: dmd(data, { template }),
                frontmatter: {
                    title: this.settings.title
                }
            }
        ]
    }

    _buildByKind (data) {
        const classes = data.filter(el => el.kind === 'class')
        const functions = data.filter(el => el.kind === 'function' && el.scope !== 'instance')

        const indexData = { classes, functions, _settings: this.settings }

        let pages = [
            // Add the index page
            {
                path: this.settings.path,
                content: templateParser('kind_index', indexData),
                frontmatter: {
                    title: this.settings.title
                }
            }
        ]

        for (const classData of classes) {
            let renderData = [classData]

            renderData = renderData.concat(
                data.filter(el => el.memberof === classData.name)
            )

            const pageTemplate = `{{#class name="${classData.name}"}}{{>docs}}{{/class}}`

            pages.push({
                path: `${this.settings.path}class/${classData.name}.html`,
                content: dmd(renderData , pageTemplate),
                frontmatter: {
                    prev: this.settings.path
                }
            })
        }

        for (const functionData of functions) {
            let renderData = [functionData]

            const pageTemplate = `{{#function name="${functionData.name}"}}{{>docs}}{{/class}}`

            pages.push({
                path: `${this.settings.path}function/${functionData.name}.html`,
                content: dmd(renderData , pageTemplate),
                frontmatter: {
                    prev: this.settings.path
                }
            })
        }

        return pages
    }
}

module.exports = { PageBuilder }
