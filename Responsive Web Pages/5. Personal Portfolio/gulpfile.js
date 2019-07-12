const {src, dest, watch, series, parallel} = require('gulp'),
  {readdir} = require('fs'),
  {appendText} = require('gulp-append-prepend'),
  server = require('browser-sync'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefix = require('autoprefixer'),
  cssnano = require('cssnano'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  del = require('del'),
  uglify = require('gulp-uglify/composer')(require('uglify-es'), console);

function clean() {
  return del('dist/')
}

function buildCSS() {
  return new Promise((resolve) => {
    readdir('src/scss/blocks', (err, files) => resolve(files))
  }).then(files => {
    return src('src/scss/style.scss')
      .pipe(plumber())
      .pipe(appendText(files.reduce((imports, file) => {
        return `${imports}\n@import 'blocks/${file}';`
      }, '')))
      .pipe(sass())
      .pipe(postcss([
        autoprefix({ browsers: ['last 3 versions']}),
        cssnano()]))
      .pipe(dest('dist/css'));
  })
}

function buildIMG() {
  return src("src/img/*")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 7}),
      imagemin.jpegtran({progressive: true})
    ], {verbose: true}))
    .pipe(dest('dist/img'))
    .pipe(dest('dist/img'));
}

function buildJS() {
  return src("src/js/*.js")
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

function moveHTML() {
  return src('src/*.html')
    .pipe(dest('dist/'));
}

function runServer(done) {
  const s = server.create('devServer');
  s.init({
    files: ["dist/**/*"],
    server: "dist",
    index: "index.html",   //файл, который нужно запускать на сервере
    online: false,        //позволяет использовать оффлайн
    notify: false         //отключает уведомления
  }, () => {
    watch('src/scss/**/*.scss', buildCSS);
    watch('src/img/*.jpg', buildIMG);
    watch('src/*.html', moveHTML);
    watch('src/js/*.js', buildJS);
  });
  done();
}

const build = series(clean, parallel(buildCSS, buildIMG, moveHTML, buildJS));

exports.buildCSS = buildCSS;
exports.buildIMG = buildIMG;
exports.buildJS = buildJS;
exports.moveHTML = moveHTML;
exports.build = build;
exports.rundev = series(build, runServer);
