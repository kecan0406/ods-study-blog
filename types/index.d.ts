import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

export type CustomEditor = BaseEditor & ReactEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

type CustomElement = ParagraphElement | CodeElement

export type FormattedText = { text: string; bold?: true }
type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
