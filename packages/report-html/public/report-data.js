window.reportData = {
  instrumentCwd:"/Users/travzhang/github.com/canyon-project/report/packages/report-html",
  type: "v8",
  reportPath: "coverage/index.html",
  version: "2.12.9",
  watermarks: {bytes: [50, 80], statements: [50, 80], branches: [50, 80], functions: [50, 80], lines: [50, 80]},
  summary: {
    bytes: {total: 0x11362c2, covered: 0x10846f3, uncovered: 728015, pct: 95.97, status: "high"},
    statements: {total: 137483, covered: 130098, uncovered: 7385, pct: 94.63, status: "high"},
    branches: {total: 98752, covered: 88373, uncovered: 10379, pct: 89.49, status: "high"},
    functions: {total: 25065, covered: 23759, uncovered: 1306, pct: 94.79, status: "high"},
    lines: {total: 309579, covered: 291595, blank: 33414, comment: 36643, uncovered: 17984, pct: 94.19, status: "high"}
  },
  files: [{
    source: "export function sum(a, b) {\n  return a + b\n}\n",
    path: "/Users/travzhang/github.com/canyon-project/report/packages/report-html/fixtures/sum.js",
    statementMap: {0: {start: {line: 2, column: 2}, end: {line: 2, column: null}}},
    fnMap: {
      0: {
        name: "sum",
        decl: {start: {line: 1, column: 16}, end: {line: 1, column: 19}},
        loc: {start: {line: 1, column: 26}, end: {line: 3, column: null}}
      }
    },
    branchMap: {},
    s: {0: 1},
    f: {0: 1},
    b: {}
  }]
};
