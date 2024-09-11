import { ReportProps } from "./types";
import SummaryHeader from "./components/SummaryHeader";
import { useEffect } from "react";
// import { codeToHtml } from "shiki";

function Editor({ className, text }: ReportProps) {
  // const [value, setValue] = useState("");

  useEffect(() => {
    // const code = "const a = 1"; // 输入代码片段
    // codeToHtml(code, {
    //   lang: "javascript",
    //   theme: "vitesse-dark",
    // }).then((r) => {
    //   setValue(r);
    // });
  }, []);
  return (
    <div className={className}>
      <SummaryHeader />
      {text}
      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: value,*/}
      {/*  }}*/}
      {/*></div>*/}
    </div>
  );
}

export default Editor;
