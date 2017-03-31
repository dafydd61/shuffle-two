const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();

gulp.task('scripts', () => {
	return gulp.src('./js/onload.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(rename('onload-min.js'))
		.pipe(gulp.dest('./js'));
});

gulp.task('js-watch', ['scripts'], () => {
	browserSync.reload();
});

gulp.task('sass', () => {
	return gulp.src('./css/**/*.scss')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['browserSync', 'sass', 'scripts'], () => {
	gulp.watch('./css/**/*.scss', ['sass']);
	gulp.watch('./js/**/*.js', ['js-watch']);
	gulp.watch('./**/*.html', browserSync.reload);
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: './'
		},
	})
});

gulp.task('default', () => {

});