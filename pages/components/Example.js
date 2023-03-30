import { Inter } from 'next/font/google'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you


export default function Example({input,title}) {
  return (
<div>
    <h2 className='text-xl mb-2'>{title}</h2>
    <div className='font-semibold mb-2'>Input</div>
    <div className='p-2 border border-white rounded-md'>{input}</div>
    <div className='my-4'>
    <div className='font-semibold mb-2'>Output</div>
    <ReactMarkdown remarkPlugins={[remarkMath]}
    rehypePlugins={[rehypeKatex]} components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={dark}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}>{input}</ReactMarkdown>
    </div>
</div>
  )
}