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
    -b, --bundle [name]     Create an AEM bundle with a specified name
    -l, --clientlib [name]  Create a Client Library with a specified name
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

##### bundles.buildComponentTree();
This can be used in a build pre build step to generate an object of all the components listed in the bundles config json.

```javascript
/**
*
* This file was generated. To edit the contents edit the
* .ironrc file for your project.
*
*/

export default {
    'nav' : require( './../../components/nav/nav.js' ),
    'footer' : require( './../../components/footer/footer.js' ),
    'video' : require( './../../components/video/video.js' )
}
```

### Custom Iron Templates
Iron will add a `iron-templates` folder to you iron-fe folder. In the `iron-templates` folder you will find 3 sub-folders. You can add your own custom template files here for each generator. For instance if your project has a base include that ever javascript component should have you can add a project specific template there.

#### Creating your custom template
1. Choose the folder in which you want to add you custom template in the `iron-templates` folder
2. Add a new file to that folder and name it what ever you want with an extension of `extension.template`.
    - For example if I wanted a custom javascript template for the component generator the template file name might look like this `ironDemo.js.template`
3. Once you have your template open up the .ironrc file and change the key in the templateConfigs object to match the name of your new template.
    - using the same example above. I would change the templateConfigs.components.js from ironDefault to ironDemo.
