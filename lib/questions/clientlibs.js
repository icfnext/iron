


module.exports = function( clientLibsList, componentList ){
    var ironRc      = require( 'rc' )( 'iron' );
    // var updateRc    = require('../api/update');

    // updateRc();
/*
    {
        clientlib_aem_generate          : "Boolean",
        clientlib_name                  : "String",
        clientlib_category              : "String",
        clientlib_extra_categories      : "List",
        clientlib_default_components    : "Boolean",
        clientlib_components            : "List"
    }
*/
    return [
        {
            type 	: "input",
            name 	: "clientlib_name",
            message : "What is the name of this client library?"
        },
        {
            type    : "confirm",
            name    : "clientlib_aem_generate",
            message : "Do you want to generate a aem client library with the same name?",
            default : true
        },
        {
            type 	: "input",
            name 	: "clientlib_category",
            message : "What category do you want this client library to answer to?",
            when    : function( answers ){
                return answers.clientlib_aem_generate === true;
            },
            default : function( answers ){
                return ironRc.name + "." + answers.clientlib_name;
            }
        },
        {
            type    : "list",
            name    : "clientlib_root_path",
            message : "Where do you want to place the clientlib?",
            choices : [
                {
                    name    : "apps",
                    value   : ironRc.jcr_root + "/apps/"
                },
                {
                    name    : "etc",
                    value   : ironRc.jcr_root + "/etc/"
                }
            ]
        },
        {
            type    : "input",
            name    : "clientlib_path",
            message : function( answers ){
                var message = "What is the rest of the path to your client libs after apps? \n" + answers.clientlib_root_path;
                return message;
            },
            when    : function( answers ){
                return answers.clientlib_root_path === ironRc.jcr_root + "/apps/";
            }
        },
        {
            type    : "input",
            name    : "clientlib_path",
            message : function( answers ){
                var message = "What is the rest of the path to your client libs after etc? \n" + answers.clientlib_root_path;
                return message;
            },
            when    : function( answers ){
                return answers.clientlib_root_path === ironRc.jcr_root + "/etc/";
            }
        },
        // {
        //     type 	: "list",
        //     name 	: "clientlib_extra_categories",
        //     message : "Do you want the client library to also answer to any of these categories?",
        //     choices : clientLibsList,
        //     when    : function( answers ){
        //         return answers.clientlib_aem_generate === true;
        //     }
        // },
        {
            type 	: "input",
            name 	: "clientlib_path",
            message : "What is the client libaray path relitive to jcr_root? (EX 'etc/clientlibs/example/commons')",
            when    : function( answers ){
                return answers.clientlib_aem_generate != true;
            }
        },
        {
            type 	: "confirm",
            name 	: "clientlib_default_components",
            message : "Do you want to include the default components for this project?"
        },
        {
            type    : "checkbox",
            name    : "clientlib_components",
            message : "Do you want to include any of these components in this client library?",
            choices : componentList,
            when    : function( ){
                return componentList.length > 1;
            }
        }

    ]

}
