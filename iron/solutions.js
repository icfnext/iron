var gulp        = require('gulp'),
    fs          = require('fs'),
    shell       = require('shelljs'),
    handlebars  = require('handlebars');

module.exports = function( data ){

    var htmlFile, cssFile, jsFile,
        pwd = shell.pwd() + '/components/';

    function createFiles( answers, cb ){

        var htmlBase = fs.readFileSync( __dirname + '/templates/markup.html.template' ).toString( ); 
        var htmlHB   = handlebars.compile( htmlBase );
            htmlFile = htmlHB( answers );

        var cssBase = fs.readFileSync( __dirname + '/templates/style.scss.template' ).toString( );
        var cssHB   = handlebars.compile( cssBase );
            cssFile = cssHB( answers );

        var jsBase = fs.readFileSync( __dirname + '/templates/script.js.template' ).toString( );
        var jsHB   = handlebars.compile( jsBase );
            jsFile = jsHB( answers );

        if ( cb ) { cb( answers ); }

    }

    function writeCSS( name, file ){
        shell.cd( pwd + 'css' );
        fs.writeFileSync( shell.pwd() + '/_' + name + '.scss' , cssFile );
            console.log('~~> SCSS File Created         ~~> ' + shell.pwd() + '/_' + name + '.scss');

        fs.appendFile('main.scss', '@import "' + name + '";\n', function (err) {
            if (err) throw err;
            console.log('~~> SCSS File import added to main.scss');
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        });
    }

    function writeJS( name, file ){
        shell.cd( pwd + 'js' );
        fs.writeFileSync( shell.pwd() + '/' + name + '.js' , jsFile );
            console.log('~~> JS File Created           ~~> ' + shell.pwd() + '/' + name + '.js');
    }

    function writeHTML( name, file ){
        shell.cd( pwd + 'html/content' );
        shell.mkdir( name );
        shell.cd( name );
        fs.writeFileSync( shell.pwd() + '/' + name + '.html' , htmlFile );
            console.log('~~> Sightly HTML File Created ~~> ' + shell.pwd() + '/' + name + '.html');
    }

    // Execute file creation
    createFiles( data, function( answers ){
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        if ( answers.do_css ) { writeCSS( answers.component_name ); }
        if ( answers.do_js ) { writeJS( answers.component_name ); }
        writeHTML( answers.component_name );
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log('~~> Files Created for "' + answers.component_name + '" Component');
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    });

}
