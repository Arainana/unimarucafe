// gulpプラグインの読み込み
const gulp = require('gulp');
// Sassをコンパイルするプラグインの読み込みß
const sass = require('gulp-sass');
// gulp-ejsの読み込み
const ejs = require('gulp-ejs');
// browser-syncの読み込み
const browserSync = require('browser-sync');

const autoprefixer = require('gulp-autoprefixer');

// style.scssをタスクを作成する
gulp.task('sass', function () {
  // style.scssファイルを取得
  return gulp.src('css/style.scss')
    // Sassのコンパイルを実行
    .pipe(sass({
      outputStyle: 'expanded'
    })
    // Sassのコンパイルエラーを表示
    // cssフォルダー以下に保存
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false
    }))
    .pipe(gulp.dest('public/css'));
});

// ejsタスクを作成
gulp.task('ejs', function() {
  //ejsフォルダ以下の.ejsファイルを対象
  //「_(アンダースコア)」がついたファイルは対象外に
  gulp.src(
    ['./ejs/**/*.ejs','!' + './ejs/**/_*.ejs']
  )
  //ejsのコンパイルを実行　拡張子をhtmlに
  //publidフォルダに保存
  .pipe(ejs({},{},{ext:'.html'}))
  .pipe(gulp.dest('./public'))
});

gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: './public'
      }
  });
});

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('default',['browser-sync'], function () {
  gulp.watch('css/*.scss',['sass']);
  gulp.watch('./ejs/**/*.ejs',['ejs']);
  gulp.watch('./public/css/*.css',['reload']);
  gulp.watch('./public/*.html',['reload']);
});