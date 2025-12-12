const { ReportBase } = require("istanbul-lib-report");
const CR = require("./lib");
module.exports = class CustomReporter extends ReportBase {
  constructor() {
    super();
    this.coverage = {};
  }

  onStart(root, context) {}

  onDetail(node) {
    const fileCoverage = node.getFileCoverage().toJSON();
    this.coverage[fileCoverage.path] = fileCoverage;
  }

  async onEnd(rootNode, context) {
    const cr = CR();
    await cr.generate({
      coverage: this.coverage,
      targetDir: context.dir
    });
  }
};
