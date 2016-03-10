import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-rimraf';
import gutil from "gulp-util";
import runSeq from "run-sequence";

// TS & JS
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import browserify from 'browserify';
import babelify from "babelify";
import ts from 'gulp-typescript';
import merge from 'merge2';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglifyjs from 'gulp-uglify';

// TESTS
import jasmine from 'gulp-jasmine-phantom';
import notify from 'gulp-notify';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';



gulp.task('clean', [], () => {
	console.log("Clean all files in build folder");
	return gulp.src(['es6/*', "www/js/*", "www/lib/global.js"], { read: false }).pipe(clean());
});

/*
// Não compila a função import/export do ES6 corretamente
gulp.task('es6', ['clean'], () => {
	gulp.src('es6/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			"presets": ['es2015'],
			"plugins": ["transform-es2015-modules-umd"]
		}))
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('js'))
		.on('error', console.log.bind(console));
});
*/

gulp.task('libs', () => {
	const libs = [
		{
			name: 'cryptojs',
			src: './node_modules/cryptojs/lib/Crypto.js'
		}, {
			name: 'cryptojs-sha256',
			src: './node_modules/cryptojs/lib/SHA256.js'
		}, {
			name: 'lz-string',
			src: './node_modules/lz-string/libs/lz-string.js'
		}
	];
	
	gulp.src( libs.map( obj => obj.src) )
		.pipe(concat('globals.js'))
		// .pipe(uglifyjs())
		.pipe(gulp.dest('./www/lib'));
});

gulp.task('es5', () => {
	return browserify({
		entries: './es6/app.js',
		debug: true
	})
		.transform("babelify", {
			presets: ["es2015"]
		})
		.bundle()
		.on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
        })
		.pipe(source('all.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
		// .pipe(uglifyjs())
		.pipe(sourcemaps.write('./')) // writes .map file
		.pipe(gulp.dest('www/js'));
});


gulp.task('ts', () => {
	let tsResult = gulp.src('ts/**/*.ts')
        .pipe(ts({
			"charset": "utf-8",
			"diagnostics": true,
			"declaration": true,
			"inlineSourceMap": false,
			// "isolatedModules": true,
			"locale": "pt-br",
			// "module": "umd",
			"noImplicitAny": false,
            "symbolForPrivates": true,
			"target": "ES6"
        }, {}, ts.reporter.fullReporter(true)));

	return merge([
		tsResult.dts.pipe(gulp.dest('_dts')),
        tsResult.js.pipe(gulp.dest('es6'))
	]);
});

gulp.task('build', (done) => {
	runSeq('clean', 'libs', 'ts', 'es5', done);
});


gulp.task('default', () => {
	gulp.watch('ts/**/*', ['build']);
});

gulp.task('unit', [], () => {
	return gulp.src('./specs/unit/**/*.spec.js')
		.pipe(jasmine({
            // reporter: 'spec',
            // captureExceptions: true,
            verbose: true
		}))
        /*
		.pipe(istanbul.writeReports({
            dir: './coverage',
            reportOpts: { dir: './coverage' },
            reporters: ['text', 'text-summary', 'json', 'html']
		}))
        */;
});

gulp.task('e2e', function () {
	return gulp.src('./specs/e2e/**/*.spec.js')
		.pipe(jasmine({
			integration: true
		}));
});

gulp.task('istanbul', cb => {
	return gulp.src(['./es6/**/*.js', '!./es6/lib/**/*.js'])
		.pipe(istanbul({
			instrumenter: Instrumenter,
			includeUntested: true
		}))
		.pipe(istanbul.hookRequire());
		// .pipe(gulp.dest('test-tmp/'))
		// .on('finish', cb);
});