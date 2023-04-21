import { Appearance, Dimensions, PixelRatio } from 'react-native' // eslint-disable-line

import { light } from './ColorsPalette'
import { fonts } from './Fonts'
import rems from './Rems'

import { Theme } from './Types'

const isDarkMode = Appearance.getColorScheme() === 'dark'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

const fontScale = PixelRatio.getFontScale()

export const defaultTheme: Theme = {
    // react-navigation properties
    // https://reactnavigation.org/docs/themes/
    dark: isDarkMode,
    //   colors: isDarkMode ? navigationColors.dark : navigationColors.light,
    // Custom theme properties
    //   color: isDarkMode ? dark : light,
    colors: light,
    fonts: fonts,
    rems: rems,
    dimension: {
        window: {
            width: windowWidth,
            height: windowHeight,
        },
        screen: {
            width: screenWidth,
            height: screenHeight,
        },

    },
}
