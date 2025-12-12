export function initCanyonReportCore(dom, options) {
  console.log(dom,options,window.monaco,window.monaco.editor)
  // 加载Monaco Editor资源
  // @ts-ignore
  if (window.monaco && window.monaco.editor && dom) {
    // 如果已经加载，直接创建编辑器
    // @ts-ignore
    const editor = window.monaco.editor.create(dom, options);
  }
}
