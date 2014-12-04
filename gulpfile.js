var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    nodemon = require("gulp-nodemon"),
    browserify = require("gulp-browserify"),
    rename = require("gulp-rename"),
    jest = require("gulp-jest"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    log = require("gulp-util/lib/log"),
    plumber = require("gulp-plumber");

gulp.task("start", ["build-js", "scss", "watch-all"]);
gulp.task("watch-all", ["scss-watch", "browserify-watch", "nodemon", "browser-sync"]);

gulp.task("nodemon", function (cb) {
    var called = false;
    return nodemon({
        script: "bin/www",
        ext: "js jsx",
        watch: ["react/*", "routes/*", "app.js"]
    }).on("start", function onStart() {
        if (!called) cb();
        called = true;
    });
});

gulp.task("scss", function () {
    // TODO: only include sourcemaps in dev env, not prod.
    gulp.src("./scss/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"]
        }))
        .pipe(gulp.dest("./public/stylesheets/"));
});

gulp.task("scss-watch", function () {
    gulp.watch(["./scss/*.scss"], ["scss"]);
});

gulp.task("build-js", function () {
    gulp.src("browser/bootstrap.jsx", {read: false})
        .pipe(plumber())
        .pipe(browserify({
            transform: ["reactify"],
            debug: true
        }))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest("public/javascripts"));
});

gulp.task("browserify-watch", function () {
    gulp.watch(["react/**/*.*", "browser/**/*.*"], ["build-js"]);
});

gulp.task("browser-sync", function () {
    browserSync.init({
        files: ['public/**/*.*'],
        proxy: 'http://localhost:3000',
        port: 4000,
        browser: ['google chrome'],
        minify: false,
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        }
    });
});

gulp.task("jest-watch", ["jest"], function () {
    gulp.watch(["__tests__/*"], ["jest"]);
});

gulp.task("jest", function () {
    return gulp.src("__tests__").pipe(jest({
        scriptPreprocessor: "../preprocessor.js",
        unmockedModulePathPatterns: [
            "../node_modules/react"
        ],
        testPathDirs: ["../__tests__"],
        testPathIgnorePatterns: [
            "../node_modules"
        ]
        //moduleFileExtensions: [
        //    "js",
        //    "jsx",
        //    "json",
        //    "react"
        //]
    }));
});

var argv = require('yargs').argv, // for args parsing
    spawn = require('child_process').spawn;

gulp.task('default', function () {
    var p;
    gulp.watch(['gulpfile.js', 'package.json'], spawnChildren);
    spawnChildren();

    function spawnChildren(e) {
        // kill previous spawned process
        if (p) {
            p.kill();
        }
        var task = argv.task || 'start';
        log('auto-reload task', task);
        // `spawn` a child `gulp` process linked to the parent `stdio`
        p = spawn('gulp', [task], {stdio: 'inherit'});
    }
});
