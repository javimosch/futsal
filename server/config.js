export default {
    isProduction: process.env.NODE_ENV === 'production',
    AUTH0_AUDIENCE: 'futsal-api.misitioba.com',
    mongooseMultiConfig:{
        app:{
            name:'app',
            url: 'mongodb://admin:gtf@ds239127.mlab.com:39127/foots',
            options:{}
        }
    }
};