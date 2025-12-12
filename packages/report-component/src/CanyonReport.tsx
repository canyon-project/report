import type {CanyonReportProps} from './types';
import type {FC} from "react";
import CoverageDetail from "./widgets/CoverageDetail";
import {add} from "./helpers/add";

export const CanyonReport: FC<CanyonReportProps> = ({ value, name,dataSource }) => {
  console.log(add(1,2))
  return <div>
    <h1>{name}</h1>
    <p>Selected file: {value}</p>
    <p>一共{dataSource.length}文件</p>
    <CoverageDetail />
  </div>
};

export default CanyonReport;
export type { CanyonReportProps } from './types';
