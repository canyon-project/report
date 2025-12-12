import { Totals } from 'istanbul-lib-coverage';
import { type FC, Suspense, useMemo, useState } from 'react';
// import { add } from './helpers/add';
import type { CanyonReportProps } from './types';
import SummaryHeader from './widgets/SummaryHeader';
import SummaryList from './widgets/SummaryList';
// import CoverageDetail from './widgets/CoverageDetail';
// import SummaryHeader from './widgets/SummaryHeader';
import TopControl from './widgets/TopControl';
import {ConfigProvider} from "antd";

export const CanyonReport: FC<CanyonReportProps> = ({
  value,
  name,
  dataSource,
}) => {
  const [onlyChange, setOnlyChange] = useState(Boolean(false));
  const rootClassName = useMemo(
    () => `report-scope-${Math.random().toString(36).slice(2, 9)}`,
    [
      /* once */
    ],
  );
  const [filenameKeywords, setFilenameKeywords] = useState('');
  const [showMode, setShowMode] = useState('list');
  function onChangeOnlyChange(v: boolean) {
    setOnlyChange(v);
  }
  const isFile = useMemo(() => {
    // Check if it's a file by common frontend file extensions
    const isFile = /\.(js|jsx|ts|tsx|vue)$/.test(value);
    return isFile;
  }, [value]);
  const mode = useMemo(() => {
    if (isFile) {
      return 'file';
    }
    return showMode;
  }, [showMode, value]);
  const listDataSource = dataSource;

  const Totals = {
    total: 0,
    covered: 0,
    skipped: 0,
    pct: 0,
  };

  const rootDataSource = {
    path: '/nihao/shijie',
    lines: Totals,
    statements: Totals,
    branches: Totals,
    functions: Totals,
  };

  function newOnSelect() {}

  return (
    <ConfigProvider       theme={{
      token: {
        colorPrimary: '#0071c2',
      },
    }}>
      <TopControl
        onlyChange={onlyChange}
        filenameKeywords={filenameKeywords}
        showMode={showMode}
        onChangeShowMode={(val) => {
          setShowMode(val as 'tree' | 'list');
        }}
        onChangeOnlyChange={onChangeOnlyChange}
        total={listDataSource.length}
        onChangeKeywords={(val) => {
          setFilenameKeywords(val);
        }}
      />
      <SummaryHeader
        reportName={name}
        data={rootDataSource}
        value={value}
        onSelect={newOnSelect}
        onlyChange={onlyChange}
      />

      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        {mode === 'list' && (
          <SummaryList
            dataSource={listDataSource}
            onSelect={newOnSelect}
            filenameKeywords={filenameKeywords}
            onlyChange={onlyChange}
          />
        )}
      </Suspense>
    </ConfigProvider>
  );
};

export default CanyonReport;
export type { CanyonReportProps } from './types';
