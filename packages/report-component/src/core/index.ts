export function initCanyonReportCore(dom, options) {
  // @ts-expect-error
  console.log(dom, options, window.monaco, window.monaco.editor);
  // 加载Monaco Editor资源
  // @ts-expect-error
  if (window.monaco?.editor && dom) {
    // 如果已经加载，直接创建编辑器
    // @ts-expect-error
    const _editor = window.monaco.editor.create(dom, options);
  }
}
