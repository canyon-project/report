// import { useEffect, useRef } from 'react'
import './TextHighlight.css'
import { useEffect, useRef, useId } from 'react'

interface TextHighlightProps {
  /** 要显示的文本内容（支持 HTML） */
  text: string
  /** 要高亮的关键字，可以是字符串或字符串数组 */
  keywords: string | string[]
  /** 自定义 CSS 类名 */
  className?: string
  /** 自定义内联样式 */
  style?: React.CSSProperties
  /** 是否区分大小写，默认 false */
  caseSensitive?: boolean
  /** 是否只匹配完整单词，默认 false */
  wholeWords?: boolean
  /** 高亮样式名称，用于 CSS ::highlight() 选择器 */
  highlightName?: string
}

/**
 * 基于 CSS Custom Highlight API 的文本高亮组件
 *
 * @example
 * // 基础用法
 * <TextHighlight text="Hello World" keywords="Hello" />
 *
 * // 多关键字高亮
 * <TextHighlight text="React 和 Vue 都是前端框架" keywords={["React", "Vue"]} />
 *
 * // 自定义选项
 * <TextHighlight
 *   text="JavaScript 是一门编程语言"
 *   keywords="JavaScript"
 *   caseSensitive={true}
 *   wholeWords={true}
 * />
 */
export function TextHighlight({
                                text,
                                keywords,
                                className = '',
                                style,
                                caseSensitive = false,
                                wholeWords = false,
                                highlightName
                              }: TextHighlightProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId()

  // 为每个组件实例生成唯一的高亮名称
  const actualHighlightName = highlightName || `text-highlight-${uniqueId.replace(/:/g, '-')}`

  // 将关键字转换为数组
  const keywordArray = Array.isArray(keywords) ? keywords : [keywords]

  // 转义正则表达式特殊字符的函数
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  useEffect(() => {
    if (!textRef.current) {
      return
    }

    const textNode = textRef.current

    // 清除之前的高亮
    CSS.highlights.delete(actualHighlightName)

    // 动态创建 CSS 规则（如果还没有的话）
    if (!highlightName) {
      const styleId = `highlight-style-${actualHighlightName}`
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = `
          ::highlight(${actualHighlightName}) {
            background-color: #ffeb3b;
            color: #000;
            border-radius: 2px;
          }
        `
        document.head.appendChild(style)
      }
    }

    // 过滤空关键字
    const validKeywords = keywordArray.filter(keyword => keyword.trim() !== '')
    if (validKeywords.length === 0) {
      return
    }

    // 创建 TreeWalker 来遍历文本节点
    const walker = document.createTreeWalker(
      textNode,
      NodeFilter.SHOW_TEXT,
      null
    )

    const textNodes: Text[] = []
    let node: Node | null

    // 收集所有文本节点
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text)
    }

    const ranges: Range[] = []

    // 为每个关键字创建高亮范围
    validKeywords.forEach((keyword) => {
      textNodes.forEach((textNode) => {
        const text = textNode.textContent || ''

        // 构建正则表达式
        let pattern = escapeRegExp(keyword)
        if (wholeWords) {
          pattern = `\\b${pattern}\\b`
        }

        const flags = caseSensitive ? 'g' : 'gi'
        const searchRegex = new RegExp(pattern, flags)
        let match

        while ((match = searchRegex.exec(text)) !== null) {
          const range = new Range()
          range.setStart(textNode, match.index)
          range.setEnd(textNode, match.index + match[0].length)
          ranges.push(range)

          // 防止无限循环：如果匹配长度为0，手动推进位置
          if (match[0].length === 0) {
            searchRegex.lastIndex++
          }
        }
      })
    })

    // 创建高亮并应用到 CSS.highlights
    if (ranges.length > 0) {
      const highlight = new Highlight(...ranges)
      CSS.highlights.set(actualHighlightName, highlight)
    }

    // 清理函数
    return () => {
      CSS.highlights.delete(actualHighlightName)
      // 清理动态创建的样式（可选，通常保留以避免重复创建）
      // const styleId = `highlight-style-${actualHighlightName}`
      // const styleElement = document.getElementById(styleId)
      // if (styleElement) {
      //   styleElement.remove()
      // }
    }
  }, [keywordArray, caseSensitive, wholeWords, actualHighlightName])

  return (
    <div
      ref={textRef}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

// 默认导出，方便使用
export default TextHighlight
