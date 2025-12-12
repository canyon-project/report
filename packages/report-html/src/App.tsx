import CanyonReport from '@canyonjs/report-component'
import {coverageData} from "./assets/coverage-data.ts";
function App() {

console.log(coverageData)

  return (
    <div>
      <CanyonReport name={'deflue'} value={'nihao'}/>
    </div>
  )
}

export default App
