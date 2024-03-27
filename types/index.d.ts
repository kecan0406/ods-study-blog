import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

export type CustomEditor = BaseEditor & ReactEditor

export type BoldElement = {
  type: 'bold'
  children: CustomText[]
}

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type BlockQuoteElement = {
  type: 'block-quote'
  children: CustomText[]
}

type Heading = 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six'
export type HeadingElement = {
  type: Heading
  level: number
  children: CustomText[]
}

type CustomElement = ParagraphElement | BlockQuoteElement | HeadingElement | BoldElement

export type FormattedText = {
  text: string
  bold?: boolean
  italic?: boolean
  underlined?: boolean
  title?: boolean
  list?: boolean
  hr?: boolean
  blockquote?: boolean
  code?: boolean
}

type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
