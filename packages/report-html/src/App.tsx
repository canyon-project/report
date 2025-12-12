import CanyonReport from '@canyonjs/report-component'

// console.log(window.reportData,'window.reportData')

function App() {

  const {files:dataSource} = window.reportData
  return (
    <div>
      <CanyonReport name={'未命名'} value={'path/to'} dataSource={dataSource}/>
    </div>
  )
}

export default App
