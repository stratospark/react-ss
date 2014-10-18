var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    nodemon = require("gulp-nodemon"),
    browserify = require("gulp-browserify"),
    rename = require("gulp-rename"),
    jest = require("gulp-jest");

gulp.task("default", ["build", "browser-sync"]);


var browserSyncReloadDelayMs = process.env.BROWSER_SYNC_RELOAD_DELAY_MS ?
    process.env.BROWSER_SYNC_RELOAD_DELAY_MS : 400;

console.log("browserSyncReloadDelayMs", browserSyncReloadDelayMs);

gulp.task("nodemon", function (cb) {
    var called = false;
    return nodemon({
        script: "bin/www",
        watch: ["react/app.jsx", "routes/*", "app.js"]
    }).on("start", function onStart() {
        if (!called) cb();
        called = true;
    }).on("restart", function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, browserSyncReloadDelayMs);
    });
});

gulp.task("build", function () {
    gulp.src("browser/bootstrap.jsx", {read: false})
        .pipe(browserify({
            transform: ["reactify"],
            debug: true
        }))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest("public/javascripts"));
});

gulp.task("browserify", function () {
    gulp.watch(["react/**/*.*", "browser/**/*.*"], ["build"]);
});

gulp.task("browser-sync", ["browserify", "nodemon"], function () {
    browserSync.init({
        files: ['public/**/*.*'],
        proxy: 'http://localhost:3000',
        port: 4000,
        browser: ['google chrome']
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