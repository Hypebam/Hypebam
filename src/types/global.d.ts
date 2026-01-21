import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string
          background?: string
          speed?: string
          loop?: boolean | string
          autoplay?: boolean | string
          'data-load-stage-logo-lottie'?: string
          'data-load-stage-logo'?: string
        },
        HTMLElement
      >
    }
  }
}

export {}
