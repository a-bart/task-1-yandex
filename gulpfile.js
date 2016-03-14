var gulp = require('gulp'),
    inlinesource = require('gulp-inline-source'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var path = {
    dist: {
        html: 'dist/',
        css: 'dist/css/',
        images: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: '*.html',
        css: 'css/**/*.css',
        images: 'images/*.{jpg,png,svg}',
        fonts: 'fonts/**/*.*'
    }
};

gulp.task('inlinesource', function () {
    gulp.src(path.src.html)
        .pipe(inlinesource())
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('image:build', function () {
    gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.dist.images));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('build', [
          'inlinesource',  
          'image:build',
          'fonts:build'          
]);

gulp.task('default', ['build']);