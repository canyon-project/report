import CanyonReport from '@canyonjs/report-component'

// console.log(window.reportData,'window.reportData')

function App() {

  const {files:dataSource} = window.reportData

  console.log(dataSource,'dataSource')

  return (
    <div>
      <CanyonReport name={'deflue'} value={'nihao'} dataSource={dataSource}/>
    </div>
  )
}

export default App
