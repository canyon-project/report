// node读取文件内容
import fs from "fs";
import coverage from "./coverage-final.json" assert { type: "json" };

function getDirectoryFromPath(filePath) {
  return filePath.substring(0, filePath.lastIndexOf("/"));
}

for (const key in coverage) {
  console.log(key);
  // 示例
  const directory = getDirectoryFromPath(key);
  fs.mkdirSync(`./public/dynamic-data/${directory}`, { recursive: true });

  const data = fs.readFileSync(
    `/Users/zhangtao/github.com/canyon-project/canyon/${key}`,
    "utf-8",
  );

  const jsonData = {
    content: data,
    coverage: {
      name: "zt",
    },
  };

  fs.writeFileSync(
    `./public/dynamic-data/${key}.js`,
    `window["${key}"] = ${JSON.stringify(jsonData)}`,
  );
}
