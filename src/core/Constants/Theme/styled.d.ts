import 'styled-components'

import { ColorMap, RemMap, FontMap } from './Types'

// https://styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorMap
    dark: boolean
    fonst: FontMap
    rems: RemMap
  }
}
