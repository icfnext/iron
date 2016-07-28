

var copy    = require( 'copy' );
var fs      = require( 'fs-extra' );
var chalk   = require( 'chalk' )

function Copy(patterns, options) {
    
    this.patterns = patterns;
    this.options = options;
    
}

Copy.prototype.apply = function(compiler) {
    
    var patterns = this.patterns;
    var options = this.options;
    
    if( options === undefined ){
        options = {};
    }
    
    if( patterns === undefined ){
        patterns = [];
    }
    

        
    var webpackContext      = compiler.options.context;
    var outputPath          = compiler.options.output.path;
    var fileDependencies    = [];
    var contextDependencies = [];
    var webpackIgnore       = options.ignore || [];
    var copyUnmodified      = options.copyUnmodified;
    var writtenAssetHashes  = {};
    
    compiler.plugin('done', function(compilation, cb) {
        
        patterns.forEach( function( pattern ) {
            
            console.log( "\n" );
            
            copy('./' + pattern.context + '/' + pattern.from, pattern.to, function(err, files){
                if (err) throw err;
                
                
                files.forEach( ( file ) => {
                    
                    var subfrom = file.path.split('/').length - 4;
                    
                    console.log(
                        chalk.bold.green("Coppied : ") +
                        file.path.split( "/" )[ file.path.split( "/" ).length - 1 ] +
                        " to " + ".../" + file.path.split( "/" ).splice( subfrom ).join("/")
                    );
                    
                } );

                console.log( "\n" );

            });
            
        } );
        
    });

}

Copy['default'] = Copy;
module.exports = Copy;