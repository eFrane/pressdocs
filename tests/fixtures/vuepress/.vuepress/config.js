module.exports = {
    title: "pressdocs test",
    plugins: [
        [require('../../../../packages/vuepress-plugin-pressdocs'), {
            'languages': {
                'js': {
                    path: '/js/',
                    sourceDir: __dirname + '/../../../../packages/@pressdocs/lang-js/src',
                },
                'php': {
                    path: '/php/',
                    sourceDir: __dirname + '/../../php'
                }
            }
        }]
    ]
}
