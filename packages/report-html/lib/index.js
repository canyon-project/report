const fs = require("fs");
const path = require("path");

class CoverageReport {
  constructor(options = {}) {
    this.options = {
      ...options,
    };
    this.initOptions();
  }

  initOptions() {
    console.log("initOptions");
  }
  async generate({coverage,targetDir}) {
    this.initOptions();
    // 1. 获取当前工作目录，获取npm包中的dist目录
    // const sourceDir = path.resolve(__dirname, "../dist");

    // 2. 获取coverage-final.json文件

    const cov = JSON.stringify(coverage);

    console.log(cov)
    return {};
  }
}

const CR = function (options) {
  return new CoverageReport(options);
};
module.exports = CR;
