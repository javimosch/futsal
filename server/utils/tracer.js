require('clarify');
var colors = require('colors');
var logger = require('tracer').colorConsole({
    format: [
        "{{timestamp}} {{title}} {{file}}:{{line}} {{message}}", //default format
        {
            error: "{{timestamp}} {{title}} {{file}}:{{line}} {{message}}"
        }
        //\nCall Stack:\n{{stack}}" // error format
    ],
    dateformat: "HH:MM:ss.L",
    inspectOpt: {
        showHidden: true, //the object's non-enumerable properties will be shown too
        depth: null //tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely pass null.
    },
    filters: [
        colors.grey,
        //colors.underline, colors.blue, //default filter
        //the last item can be custom filter. here is "warn" and "error" filter
        {
            log:[colors.white],
            debug: [colors.white, colors.underline],
            info: colors.blue,
            warn: colors.yellow,
            error: [colors.red, colors.bold]
        }
    ]
});

export default logger;
