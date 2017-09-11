'use strict';

module.exports = {
    customTemplates: true,
    customTemplatesPath: "iron-templates",
    bundles: {
        componentReferance: {
            js: 'ironDefaultComponentReferance',
            scss: 'ironDefaultComponentReferance'
        },
        config: 'ironDefaultConfig',
        entry: {
            js: 'ironDefaultMainEntry',
            scss: 'ironDefaultMainEntry'
        }
    },
    clientlibs: {
        content: 'ironDefaultContent',
        text: {
            js: 'ironDefaultJs',
            css: 'ironDefaultCss'
        }
    },
    components: {
        js: 'ironDefault',
        scss: 'ironDefault'
    }
};