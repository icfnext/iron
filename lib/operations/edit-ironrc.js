
var chalk    = require( 'chalk' );

var manageRC = require( '../utils/manageRC.js' );

module.exports = {

    changeStyleLanguage : function( newStyleLanguage ){

        var config = require('rc')('iron');

        config.style_language = newStyleLanguage;

        manageRC.update( config );

        console.log( chalk.bold.green( "Project style_language is now set to : " ) + newStyleLanguage.toUpperCase() + "\n" );
    },

    addCustomTemplates : function( customTemplatesConfig ) {
        var config = require('rc')('iron');

        config.templateConfigs = customTemplatesConfig;

        manageRC.update( config, true );

        console.log( chalk.bold.green( "Iron RC has been updated to have custom templates in the config" ) + "\n" );
    }

}
