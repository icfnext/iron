
var ironRc = require('rc')('iron');


module.exports = [

    {
        type 	: "input",
        name 	: "component_name",
        message : "What is the name of this component?"
    },
    {
        type    : "confirm",
        name    : "component_new_default",
        message : "Do you want to add this component to the default components?",
        default : false
    },
    {
        type    : "checkbox",
        name    : "components_clientlibrary",
        message : "Which client library or client libraries do you want this component to be a part of?",
        choices : function( ){
            return ironRc.clientlibraries.map(function( item ){
                return {
                    name : item.name,
                    value : item
                }
            })
        }
    }


]
