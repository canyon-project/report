import { CanyonReportProps } from './types';
import {FC} from "react";
import CoverageDetail from "./widgets/CoverageDetail";
import {add} from "./helpers/add";

export const CanyonReport: FC<CanyonReportProps> = ({ value, name }) => {
  console.log(add(1,2))
  return <div>
    <h1>{name}</h1>
    <p>Selected file: {value}</p>
    <CoverageDetail />
  </div>
};

export default CanyonReport;
export type { CanyonReportProps } from './types';
