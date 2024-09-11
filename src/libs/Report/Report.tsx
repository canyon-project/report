import { ReportProps } from "./types.ts";
import SummaryHeader from "./components/SummaryHeader.tsx";

function Editor({ className }: ReportProps) {
  return (
    <div className={className}>
      <SummaryHeader />
    </div>
  );
}

export default Editor;
