module.exports = [
    {
        type    : 'input',
        name    : 'component_name',
        message : 'What\'s the name of your component?'
    },
    {
        type    : 'confirm',
        name    : 'do_css',
        message : 'Generate a SCSS file?',
        default : 'yes'
    },
    {
        type    : 'confirm',
        name    : 'do_js',
        message : 'Generate a JS file?',
        default : 'yes'
    }
];
