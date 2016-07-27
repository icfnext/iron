# Iron(Fe)
Iron (Fe) is an opinionated yet flexible FrontEnd development framework.

## Why another front end tool?
We want Iron to be a foundation for projects. Like all foundations Iron(Fe) is a place to start, but a foundation is just a beginning. There can be many directions you can go after you have a firm foundation. We want to give front end developers who work with AEM access to the same tools that we have when working outside AEM. Iron makes a few decisions for you.
#### Where is Iron opinionated?
- Iron encourages you to write your components in small sets of independent functionality.
- All components are blueprinted common js modules.
  - with a main.js and a main.css files these small bits of code will help you stay organized as your project grows.
- Components are bundled via Browserify webpack or whatever else you fancy.
- Bundles are formed in client libraries.
  - once the code is bundled it can be moved to a client library in AEM and then built via maven.

### To install Iron's Generator
```js
npm install -g iron-fe
```

### Use Iron with a new project
```iron myProjectName```

### Once you have initialized Iron in your project you can use any of these commands.

```bash
Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -c, --component [name]  Create a component with specified name
    -6, --es6               Add -es6 after the component command to use es6 syntax in your components 
    -b, --bundle [name]     Create an AEM bundle with a specified name
    -l, --clinetlib [name]  Create a Client Library with a specified name
```

### API

#### iron.bundles
The functions nested under bundles are to help you construct the bundles that can get moved into client libraries.

##### bundles.match( filePath )
Bundles.match takes a file path of a component and will return a list of bundles. Each of those bundles are an explicit dependency of an individual component. 

```javascript
import iron from 'iron-fe'; // var iron = require( 'iron-fe' );
let myComponentPath = "the/path/to/my/component.js"
iron.bundles.match( myComponentPath )
```
##### bundles.get
Here you have the option of getting all or just one of the bundles you have generated in the aem-bundles folder. 

##### bundles.get.one( bundleName )
This function will give you one bundle back with its relevant information.
```javascript
 import iron from 'iron-fe'; // var iron = require( 'iron-fe' );
 let myBundle = iron.bundles.get.one( 'myBundle' );
 
 ---------
 { 
    components: [ 
        { name: 'appEntry', isGlobal: false },
        { name: 'maps', isGlobal: false } 
    ],
    name: 'mainApp',
    path: 'aem-bundles/app',
    main: 'main.directories.js',
    config:  { 
        clientLibPath: '/Absolute/Path/to/bundle',
        autoGenerate: { js: true, styles: true },
        useGlobalComponents: true,
        components: [ 'appEntry', 'maps' ] 
    }
 }
```
##### bundles.get.all()
This function will give you all bundles you have in your project with each bundle's relevant information.
```javascript
 import iron from 'iron-fe'; // var iron = require( 'iron-fe' );
 let bundles = iron.bundles.get.all( );
 
 ---------
 [
    { 
        components: [ 
            { name: 'appEntry', isGlobal: false },
            { name: 'maps', isGlobal: false } 
        ],
        name: 'mainApp',
        path: 'aem-bundles/app',
        main: 'main.mainApp.js',
        config:  { 
            clientLibPath: '/Absolute/Path/to/clientlib',
            autoGenerate: { js: true, styles: true },
            useGlobalComponents: true,
            components: [ 'appEntry', 'maps' ] 
        }
    },
    {
        components: [ 
            { name: 'appEntry', isGlobal: false },
            { name: 'maps', isGlobal: false } 
            { name: 'fonts', isGlobal: false } 
        ],
        name: 'homePape',
        path: 'aem-bundles/homePape',
        main: 'main.homePape.js',
        config:  { 
            clientLibPath: '/Absolute/Path/to/clientlib',
            autoGenerate: { js: true, styles: true },
            useGlobalComponents: true,
            components: [ 'appEntry', 'maps', 'fonts' ] 
        }
    }
 ]
```
