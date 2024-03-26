'use client'

import { useCallback, useState } from 'react'
import { Descendant, Editor, Element, Transforms, createEditor } from 'slate'
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
]

const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },
  isCodeBlockActive(editor: Editor) {
    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (n) => Element.isElementType(n, 'code')
      })
    )
    return !!match
  },
  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },
  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'code' },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
  }
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: RenderLeafProps) => {
  return (
    <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
      {props.children}
    </span>
  )
}

const Elements = ({ children, ...props }: RenderElementProps) => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props}>{children}</CodeElement>
    default:
      return <DefaultElement {...props}>{children}</DefaultElement>
  }
}

export default function MDEditor() {
  const [editor] = useState(() => withReact(createEditor()))
  const [descendants, setDescendants] = useState<Descendant[]>(initialValue)
  const renderElement = useCallback(
    ({ children, ...props }: RenderElementProps) => <Elements {...props}>{children}</Elements>,
    []
  )
  const renderLeaf = useCallback(({ children, ...props }: RenderLeafProps) => <Leaf {...props}>{children}</Leaf>, [])

  return (
    <Slate editor={editor} initialValue={descendants} onChange={(value) => setDescendants(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className='focus:outline-none'
        placeholder='Enter some plain text...'
        onKeyDown={(e) => {
          if (!e.ctrlKey) return

          switch (e.key) {
            case '`':
              e.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            case 'b':
              e.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
          }
        }}
      />
    </Slate>
  )
}
