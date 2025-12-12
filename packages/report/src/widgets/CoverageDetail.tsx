
import {initCanyonReportCore} from '@canyonjs/report-core'
import {useEffect, useRef} from "react";
function CanyonReport() {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current){
      initCanyonReportCore(ref.current,{
        value: 'const a = 1',
        language: 'javascript',
        theme: 'vs-dark',
      })
    }

  }, []);
  return (
    <div>
      乌鸦坐飞机
      <div ref={ref} style={{height:'300px',border:'1px solid #000'}}>

      </div>
    </div>
  )
}

export default CanyonReport
