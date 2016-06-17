module.exports = {
    componentLinker     : require( './component-linker' ),
    get                 : {
                            clinetlibs  : require( './getClientLibs' ),
                            templates   : require( './getTemplates' )
                        },
    manageRC            : require( './manageRC' ),
    pathToProjectRoot   : require( './pathToProjectRoot' ),
    pomBuilder          : require( './pom-builder' ),
    templateRenderer    : require( './template-renderer' )
}
