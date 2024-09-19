import globalCoverageVar from '../coverage-final.json' assert { type: "json" };
import libCoverage from 'istanbul-lib-coverage';
import fs from 'fs';

var map = libCoverage.createCoverageMap(globalCoverageVar);
var summary =libCoverage.createCoverageSummary();


// merge another coverage map into the one we created
// map.merge(otherCoverageMap);

// inspect and summarize all file coverage objects in the map
const obj = {}
map.files().forEach(function(f) {
  var fc = map.fileCoverageFor(f),
    s = fc.toSummary();

  console.log(s)
  // summary.merge(s);
  obj[f] = s.toJSON();
});

// console.log(obj);
//
// console.log(Object.keys(obj).reduce((acc, cur) => {
//   acc.push({
//     ...obj[cur],
//     path: cur,
//   })
//   return acc;
// }, []))

const su = Object.keys(obj).reduce((acc, cur) => {
  acc.push({
    ...obj[cur],
    path: cur,
  })
  return acc;
}, [])

fs.writeFileSync('./coverage-summary.json', JSON.stringify(su, null, 2));
