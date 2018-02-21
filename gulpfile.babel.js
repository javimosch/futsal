require("regenerator-runtime/runtime");
const gulp = require('gulp');
const faker = require('./server/utils/faker');
Object.keys(faker).forEach(method => {
	gulp.task('faker:' + method, function(next) {
		faker[method]().then(next);
	});
});