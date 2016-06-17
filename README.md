# iron
Iron (Fe) is an opinionated yet flexible FrontEnd development framework

## Why another front end tool?
We want Iron to be a foundation for projects. Like all foundations it is a place to start but a foundation is just a begining. There can be many directions you can go after you have a firm foundation. We want to give front end developers who work with AEM access to the same tools that we have when working outside AEM. Iron makes a few decisions for you.
#### Where is Iron opinionated?
- Iron encourages you to write your components in small sets of independent functionality
- All components just blueprinted common js modules
  - with a main.js, and a main.css files these small bits of code will help you stay orginized as your project grows.
- Components are bundled via Browserify webpack or what ever else you fancy
- Bundles are formed in client libraries.
  - once the code is bundled it can be moved to a client library in AEM and then built via maven.

### To install Iron's Generator
```js
npm install -g iron-fe
```

### Use Iron with a new project
```iron myProjectName```

### Once you have initialized iron in your project you can use any of these commands

```bash
Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -c, --component [name]  Create a component with specified name
    -6, --es6               Add -es6 after the component command to do the es6 components
    -b, --bundle [name]     Create a AEM bundle with specified name
    -l, --clinetlib [name]  Create a Clinet Library with specified name
```

#### API -- Documentation Coming soon 
