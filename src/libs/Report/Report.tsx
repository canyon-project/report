import { ReportProps } from "./types.ts";
import SummaryHeader from "./components/SummaryHeader.tsx";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

function Editor({ className }: ReportProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const code = "const a = 1"; // 输入代码片段
    codeToHtml(code, {
      lang: "javascript",
      theme: "vitesse-dark",
    }).then((r) => {
      setValue(r);
    });
  }, []);
  return (
    <div className={className}>
      <SummaryHeader />
      <div
        dangerouslySetInnerHTML={{
          __html: value,
        }}
      ></div>
    </div>
  );
}

export default Editor;
