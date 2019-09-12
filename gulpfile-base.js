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
   * Copies the files that are required for the project to run but are not automatically
   * included by `tsc`.
   */
  copyFiles: () => {
    return gulp.src(IN_DIR + "/**/*.json").pipe(gulp.dest(OUT_DIR));
  },

  /**
   * Updates the invocation name of the models for the current environment.
   *
   * This allows you to have different invocation names for different environments
   * without having to manually change it every time. You can hook this into the
   * deploy script to do it automatically.
   */
  models: (done) => {
    const fs = require("fs");

    /**
     * Reads the model for the given locale and returns the parsed JSON.
     *
     * @param {string} locale
     */
    function readModel(locale) {
      const model = fs.readFileSync(`${__dirname}/models/${locale}.json`, "utf-8");
      return JSON.parse(model);
    }

    /**
     * Writes the given model to the file.
     *
     * @param {object} model
     * @param {string} locale
     */
    function writeModel(model, locale) {
      const json = JSON.stringify(model, null, 2);
      fs.writeFileSync(`${__dirname}/models/${locale}.json`, json);
    }

    // add more locales if needed
    const Locales = {
      enUS: "en-US",
    };

    const Environments = {
      Dev: "dev",
      Prod: "prod",
      Local: "local",
    };

    const invocations = {
      [Environments.Local]: {
        [Locales.enUS]: "hello world local",
      },
      [Environments.Dev]: {
        [Locales.enUS]: "hello world development",
      },
      [Environments.Prod]: {
        [Locales.enUS]: "hello world",
      },
    };

    // make sure we have the environment set
    if (!process.env.ENV) {
      throw new Error("ENV environment variable not set");
    }

    // get the current environment
    const env = process.env.ENV;

    // make sure the env is valid
    if (env !== Environments.Local
      && env !== Environments.Dev
      && env !== Environments.Prod) {
      throw new Error("Invalid ENV environment variable: " + env);
    }

    /**
     * Updates the invocation name of the model for the given environment and locale.
     *
     * @param {*} env
     * @param {*} locale
     */
    function updateModelInvocationName(env, locale) {
      // read the model
      const model = readModel(locale);

      // set the invocation name
      model.interactionModel.languageModel.invocationName = invocations[env][locale];

      // write the model back to the file
      writeModel(model, locale);
    }

    // update the invocation names
    updateModelInvocationName(env, Locales.enUS);

    done();
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
