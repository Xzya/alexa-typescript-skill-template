"use strict";

const gulp = require("gulp");
const path = require("path");
const child_process = require("child_process");

const OUT_DIR = "dist";
const IN_DIR = "lambda";

module.exports = {

  /**
   * Compiles the project.
   */
  tsc: (done) => {
    const tscPath = path.normalize("./node_modules/.bin/tsc");
    const command = `${tscPath} -p tsconfig.json`;

    exec(command, done);
  },

  /**
   * Cleans the project.
   */
  clean: () => {
    const del = require("del");

    return del(["dist"]);
  },

  /**
   * Copies the files that are required for the project to run but are not automatically included by `tsc`.
   */
  copyFiles: () => {
    return gulp.src(IN_DIR + "/**/*.json").pipe(gulp.dest(OUT_DIR));
  },

};

function exec(command, callback) {
  child_process.exec(command, function (err, stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }

    if (stderr) {
      console.log(stderr);
    }

    callback(err);
  });
}
