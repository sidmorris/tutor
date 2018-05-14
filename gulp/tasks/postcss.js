module.exports = function () {
  $.gulp.task('styles', function () {
    return $.gulp.src('source/style/app.pcss')
      .pipe($.gp.sassGlob())
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.postcss($.PATH.postPlugins))
			.on('error', $.gp.notify.onError({
				title: 'Style'
			}))
			.pipe($.gp.rename(
				'app.css'
			))
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
