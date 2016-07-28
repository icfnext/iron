
var iron        = require( 'iron-fe' );
var CopyPlugin  = require('./build-helpers/copy-plugin');


function buildCopyPluginReqs(){
    
    var entries = [];
    
    iron.bundles.get.all().bundles.forEach( ( bundle ) => {
        entries.push( {
        context : './' + bundle.path + '/build/js',
        from: '**/*',
        to: bundle.config.clientLibPath + '/js'
    } );
    
} );
    
    return entries;
}

module.exports = {
    context: __dirname,
    entry : function(){
        var entries = {};
        
        iron.bundles.buildComponentTree();
        
        iron.bundles.get.all().bundles.forEach( ( bundle ) => {
            entries[ bundle.name ] = './' + bundle.path + '/' + bundle.main ;
        } );
        
        return entries;
    }(),
    output : {
        path : __dirname + "/aem-bundles/",
        filename : "[name]/build/js/bundled.[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
        new CopyPlugin(buildCopyPluginReqs())
    ]
    
}
