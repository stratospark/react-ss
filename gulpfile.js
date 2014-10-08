var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    nodemon = require("gulp-nodemon");


gulp.task("default", ["browser-sync"]);

var BROWSER_SYNC_RELOAD_DELAY = 400;

gulp.task("nodemon", function (cb) {
    var called = false;
    return nodemon({
        script: "bin/www",
        watch: ["react/app.jsx", "routes/*"]
    }).on("start", function onStart() {
        if (!called) cb();
        called = true;
    }).on("restart", function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task("browser-sync", ["nodemon"], function () {
    browserSync.init({
        files: ['public/**/*.*'],
        proxy: 'http://localhost:3000',
        port: 4000,
        browser: ['google chrome']
    });
});