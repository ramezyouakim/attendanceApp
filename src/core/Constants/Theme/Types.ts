export type RemMap = {
    x1: number
    x2: number
    x3: number
    x4: number
    x5: number
    x6: number
    x7: number
    x8: number
    x9: number
    x10: number
    x11: number
    x12: number
    x13: number
    x14: number
    x15: number
}

export type ColorMap = {
    mainColor: string
}

export type FontMap = {
    header1: number
    header2: number
    header3: number
    header4: number

}

export type DimensionMap = {
    window: DeviceDimensions
    screen: DeviceDimensions
    // maxWidth: number
    // horizontalPadding: number
    // tabListHorizontalPadding: number
}

export type DeviceDimensions = {
    width: number
    height: number
}

export type Theme = {
    // react-navigation properties
    // https://reactnavigation.org/docs/themes/
    dark: boolean,
    //   colors: isDarkMode ? navigationColors.dark : navigationColors.light,
    //   color: isDarkMode ? dark : light,
    colors: ColorMap,
    fonts: FontMap,
    rems: RemMap,
    dimension: DimensionMap
}
