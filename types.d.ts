import { AriaAttributes, DOMAttributes } from 'react'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // https://www.w3.org/TR/css-anchor-position-1
    anchor?: string
  }
}
