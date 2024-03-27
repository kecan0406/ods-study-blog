'use client'

import { KeyboardEvent, useCallback, useState } from 'react'
import { Descendant, createEditor } from 'slate'
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react'
import Element from './components/Element'
import Leaf from './components/Leaf'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
]

export default function MDEditor() {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
  const [editor] = useState(() => withReact(createEditor()))
  const [descendants, setDescendants] = useState<Descendant[]>(initialValue)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      if (e.key === 'b') {
        e.preventDefault()
        const selection = editor.selection!
        console.log(editor.before(selection, { unit: 'word' })?.offset ?? 0)
        console.log(editor.string(selection))
      }
    }
  }

  return (
    <Slate editor={editor} initialValue={descendants} onChange={(value) => setDescendants(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className='focus:outline-none'
        placeholder='Enter some plain text...'
        onKeyDown={handleKeyDown}
      />
    </Slate>
  )
}
