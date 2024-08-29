const gulp = require('gulp'),
	path = require('path');
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	jsonminify = require('gulp-jsonminify'),
	sass = require('gulp-sass')(require('sass')),
	cleanCss = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	responsive = require('gulp-responsive'),
	axios = require('axios'),
	watch = require('gulp-watch');

gulp.task('js', () => {
	return gulp.src('./src/js/script.js')
		.pipe(babel({
			presets: ['@babel/preset-env'],
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./dest/js'));
});

gulp.task('js-vendors', () => {
	return gulp.src([
		'./src/js/polyfill.min.js',
		'./src/js/jquery-3.4.1.min.js',
		'./src/js/fireworks.js',
		'./src/js/axios.min.js'
	])
	.pipe(concat('vendors.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dest/js'));
});

gulp.task('css', () => {
	return gulp.src('./src/scss/style.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false,
			grid: 'autoplace'
		}))
		// .pipe(cleanCss({
		// 	level: {
		// 		1: {specialComments: 0},
		// 		2: {mergeIntoShorthands: false}
		// 	}
		// }))
		.pipe(gulp.dest('./dest/css'));
});

gulp.task('films', () => {
	return gulp
		.src('./src/img/screens/**/*.jpg', {base: './src/img/screens/'})
		.pipe(
			responsive({
				'**/*.jpg': {
					width: 800,
					height: 433,
					quality: 85,
					format: 'webp',
					withoutEnlargement: false,
					skipOnEnlargement: false,
				},
			})
		)
		.pipe(gulp.dest(path.join(__dirname, 'dest/img/screens/')));
})


// })

gulp.task('json', () => {
	return gulp.src('./src/json/*.json')
		.pipe(jsonminify())
		.pipe(gulp.dest('./dest/json'));
})


gulp.task('watch', gulp.series('css', 'js', 'films', 'json', 'js-vendors', () => {
	watch('./src/scss/style.scss', gulp.series('css'));
	watch('./src/js/script.js', gulp.series('js'));
	// watch('./src/img/screens/*.jpg', gulp.series('films'));
	watch('./src/json/films.json', gulp.series('json'));
}));


gulp.task('default', gulp.series('watch'));
