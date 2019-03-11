// gulpプラグインの読み込み
const gulp = require('gulp');
// Sassをコンパイルするプラグインの読み込みß
const sass = require('gulp-sass');
// gulp-ejsの読み込み
const ejs = require('gulp-ejs');


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
    .pipe(gulp.dest('css'));
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

gulp.task('default', function () {
  gulp.watch('css/style.scss',['sass']);
  gulp.watch('./ejs/**/*.ejs',['ejs']);
});