import { createContext, useContext } from 'react'
import * as React from 'react'
import { ThemeProvider } from 'styled-components/native'

import { defaultTheme } from './DefaultTheme'

// const defaultMode = Appearance.getColorScheme()

const ThemeContext = createContext(defaultTheme)

export const useTheme = () => useContext(ThemeContext)

const ManageThemeProvider = ({
    children,
}: {
    children: React.ReactNode | React.ReactNode[] | null
}) => {
    //   const [fontScale, setFontScale] = React.useState<number>(
    //     PixelRatio.getFontScale()
    //   )

    //   const [themeMode, setThemeMode] = useState(defaultMode)
    //   const isThemeDark = themeMode === 'dark'
    //   const { window, screen, isPortrait, isSplitView } = useOrientation()
    //   const { tabListHorizontalPadding, horizontalPadding } = useTabletConstants()

    //   const setCurrentFontScale = () => setFontScale(PixelRatio.getFontScale())
    //   useAppState({ onForeground: setCurrentFontScale })

    //   const screenSizeType = getScreenSizeType(window.width)

    //   useEffect(() => {
    //     // Sets background color of the app's rootView
    //     // to prevent color mismatch bug when reorienting the app on tablets
    //     SystemUI.setBackgroundColorAsync(
    //       isThemeDark ? telekom.black : telekom.white
    //     )
    //   }, [themeMode])

    //   useEffect(() => {
    //     // Blink theme Appearance bug
    //     // https://github.com/facebook/react-native/issues/28525
    //     const handler = async (preferences: Appearance.AppearancePreferences) => {
    //       setThemeMode(preferences.colorScheme)
    //     }

    //     // delay 1 second to handle change without blinking
    //     const changeListener = Appearance.addChangeListener(
    //       throttle(handler, 1000, {
    //         leading: false,
    //         trailing: true,
    //       })
    //     )

    //     return () => changeListener.remove()
    //   }, [])


    return (
        <ThemeContext.Provider value={defaultTheme}>
            <ThemeProvider theme={defaultTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ManageThemeProvider
