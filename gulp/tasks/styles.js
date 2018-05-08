module.exports = function () {
  $.gulp.task('styles', function () {
    return $.gulp.src('source/style/app.sass')
      .pipe($.gp.sassGlob())
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass({
        includePaths: $.PATH.SASS
      }))
      .on('error', $.gp.notify.onError({
        title: 'Style'
      }))
      .pipe($.gp.postcss($.PATH.postPlugins))
      // .pipe($.gp.autoprefixer({
      //   browsers: [
      //     'last 3 version',
      //     '> 1%',
      //     'ie 8',
      //     'ie 9',
      //     'Opera 12.1'
      //   ]
      // }))
      .pipe($.gp.if(CONST.PRODUCTION, $.gp.csso({
        restructure: false,
        sourceMap: false,
        forceMediaMerge: true,
        clone: false,
        comments: false, 
        debug: false
    })))
      .pipe($.gp.if(!CONST.PRODUCTION, $.gp.sourcemaps.write()))
      .pipe($.gulp.dest($.PATH.ROOT + '/assets/css'))
      .pipe($.browserSync.stream());
  });
};