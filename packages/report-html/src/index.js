// import * as monaco from 'monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {initCanyonReportCore} from "@canyonjs/report-core";

window.monaco = monaco;





initCanyonReportCore(document.getElementById('root'),{
  value: 'const a = 1',
  language: 'javascript',
  theme: 'vs-dark',
})
