/* eslint-disable no-undef */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./*.html').on('change', browserSync.reload)
  gulp.watch('./*.js').on('change', browserSync.reload)
})
