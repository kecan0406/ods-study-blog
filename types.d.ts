import { AriaAttributes, DOMAttributes } from 'react'
import { Options } from 'rehype-pretty-code'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // https://www.w3.org/TR/css-anchor-position-1
    anchor?: string
  }
}

declare module 'rehype-pretty-code' {
  export default function rehypePrettyCode(options?: Options): () => undefined
}
