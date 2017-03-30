const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

gulp.task('scripts', () => {
	return gulp.src('./js/onload.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(rename('onload-min.js'))
		.pipe(gulp.dest('./js'));
});

gulp.task('default', () => {

});