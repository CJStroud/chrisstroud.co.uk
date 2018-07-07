var gulp = require('gulp')
var sass = require('gulp-sass')

// style paths
var sassFiles = 'src/sass/*.scss'
var cssDest = 'css'

gulp.task('styles', function () {
  gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest))
})

gulp.task('watch', function () {
  gulp.watch(sassFiles, ['styles'])
})
