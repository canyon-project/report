import type { FC } from 'react';
import { add } from './helpers/add';
import type { CanyonReportProps } from './types';
import CoverageDetail from './widgets/CoverageDetail';

export const CanyonReport: FC<CanyonReportProps> = ({
  value,
  name,
  dataSource,
}) => {
  console.log(add(1, 2));
  return (
    <div>
      <h1>{name}</h1>
      <p>Selected file: {value}</p>
      <p>一共{dataSource.length}文件</p>
      <CoverageDetail />
    </div>
  );
};

export default CanyonReport;
export type { CanyonReportProps } from './types';
