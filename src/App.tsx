import {codeToHtml, ShikiTransformer} from "shiki";
import {useState} from "react";
import {getDecode} from "./utils.ts";
import {filecontent} from "./mock/filecontent.ts";
import {filecoverage} from "./mock/filecoverage.ts";

const App = () => {
    console.log(filecoverage)
    const [content, setContent] = useState("");
    codeToHtml(getDecode(filecontent), {
        lang: "javascript",
        theme: "tokyo-night",
        decorations: [
            {
                start: 21,
                end: 24,
                properties: { class: 'highlighted-word' }
            }
        ]
    }).then(res=>{
        setContent(res);
    })

    return <div style={{margin:'60px',border:'1px solid skyblue'}}>
        <div style={{
            padding:'20px',
            backgroundColor:'#1a1b26',
        }}>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
    </div>
}

export default App


// 5000行代码，每行100个，那就是50W个，
//把未覆盖率用“线段”的形式表示出来，那么这个线段的计算就很关键，牵扯到坐标的转换。需要处理相交问题。
//这是不是应该把这段代码看作一个线段呢，这样好处理相交的问题。