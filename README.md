# iron
Iron (Fe) is an opinionated yet flexible FrontEnd development framework

## Why another front end tool?
We want Iron to be a foundation for projects. Like all foundations it is a place to start but a foundation is just a begining. There can be many directions you can go after you have a firm foundation. We want to give front end developers who work with AEM access to the same tools that we have when working outside AEM. Iron makes a few decisions for you. 
#### Where is Iron opinionated?
- Iron encourages you to write your components in small sets of independent functionality
- All components just blueprinted common js modules 
  - with a package.json, main.js, and a main.css files
- Components are bundled via Browserify 
- Bundles are formed in client libraries.
  - once the code is bundled it will be moved to a client library in AEM.

### To install Iron's Generator 
```js
npm install -g iron-fe
```

### Iron's API
Iron can be used in your build tools. The API is a set of functions to access the data that is held and created by Iron's generator. 

#### Install for use in build tools
```js
npm install iron-fe --save-dev
```

The API is split into sections by the type of asset you want to work with. Currently there are two such assets, Client Libraries and Components

#### iron initialization
```js
var iron = require('iron-fe');
```

#### iron.clientlibraries
Iron.clientlibraries is a set of functions that helps you minipulate and build the client libraries.

##### iron.clientlibraries.match( filePath )
Match takes a file path of a component and will return an array of all client libraries that have that component as a dependency. This function might be used to match the changed file, from a build watcher such has gulp or grunt watch, with the correct client library to compile.

```js
var iron = require('iron-fe');

var matchedLibrariesArray = iron.clientlibraries.match( '/path/to/my/component' );

/* matchedLibrariesArray => 
  [
    {
      "name": "about",
      "aemPath": "path/to/jcr_root/etc/clientlibs/project/about",
      "entry": "client-libraries/about/about.js",
      "components": [
          {
              "name": "global",
              "isADefault": false,
              "clientlibraries": [
                  "about",
                  "aboutYou"
              ]
          }
      ],
      "defaultComponents": true,
      "styleType": "scss"
    }
  ]
*/
```


