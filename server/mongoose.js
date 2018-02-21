import console from './utils/tracer';
const mongooseMulti = require('mongoose-multi');
const sander = require('sander');
const path = require('path');
const basePath = path.join(process.cwd(), 'server/api'); //without ending / 
const mongooseMultiConfig = require('./config').default.mongooseMultiConfig;
const DEBUG = true;
var state = module.exports = {
    initialized: false,
    db: null,
    initialize: initialize
};

async function initialize() {
    state.initialized = true;
    let schemasConfig = await generateMongooseMultiSchemaConfig(basePath);
    let connections = Object.assign({}, mongooseMultiConfig);
    //TODO: Multi db schema config (for now only configurates app db)
    if (DEBUG) {
        console.log(`app schemas are ${Object.keys(schemasConfig)}`);
    }
    state.db = mongooseMulti.start(connections, {
        app: schemasConfig
    });
}

function requireFileWhoContains(str, filesNames, basePath) {
    let f = filesNames.filter(fn => fn.indexOf(str) !== -1);
    if (f.length > 0) {
        return require(path.join(basePath, f[0]));
    }
    else {
        return null;
    }
}

async function generateMongooseMultiSchemaConfig(basePath) {
    var isDirectory = require('is-directory');
    let collectionsNames = await sander.readdir(basePath);
    collectionsNames = collectionsNames.filter(f => isDirectory.sync(basePath + '/' + f));
    let collectionFiles = [];
    let collections;
    let schemaConfig = {
        //collectionName: schema
    };
    collectionsNames.forEach((collectionName, index) => {
        collectionFiles.push(sander.readdir(basePath + '/' + collectionName));
    });
    collectionFiles = await Promise.all(collectionFiles);
    collections = collectionFiles.map((cfn, index) => {
        return {
            name: collectionsNames[index],
            files: cfn
        };
    });

    iterateCollections(collections, basePath, (c, findFile) => {
        let def = findFile('definition');
        if (!def) throw new Error('Collection definition not found: ' + c.name);

        let instanceMethods = findFile('instance-methods');

        iterateProperties(instanceMethods, (method, val) => {
            def.methods[method] = val;
            if (DEBUG) console.log(`${c.name}: Instance method ${method} added`);
        });

        let staticMethods = findFile('static-methods');
        iterateProperties(staticMethods, (method, val) => {
            def.statics[method] = val;
            if (DEBUG) console.log(`${c.name}: Static method ${method} added`);
        });

        schemaConfig[c.name] = def;
    });

    return schemaConfig;
}

function iterateCollections(arr, basePath, handler){
    arr.forEach(c=>{
       let fileBasePath = basePath + '/' + c.name;
       var requireFile = str => {
            return requireFileWhoContains(str, c.files,fileBasePath);
       };
       handler(c, requireFile);
    });
}

function iterateProperties(object, handler) {
    if (object) {
        Object.keys(object).forEach((key) => handler(key, object[key]));
    }
}
