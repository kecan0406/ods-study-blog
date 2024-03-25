'use client'

import { useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
]

export default function Editor() {
  const [editor] = useState(() => withReact(createEditor()))
  const [descendants, setDescendants] = useState<Descendant[]>(initialValue)
  return (
    <Slate editor={editor} initialValue={descendants} onChange={(value) => setDescendants(value)}>
      <Editable className='focus:outline-none' placeholder='Enter some plain text...' />
    </Slate>
  )
}
