import { shouldUpdateApp } from '../core/Config/AppVersion'
import { CoreRoutes, Routes } from './Routes'
import {
    CommonActions,
    NavigationAction,
    NavigationContainerRef,
    NavigationState,
    ParamListBase,
    PartialState,
    Route,
    StackActions,
} from '@react-navigation/native'

class Navigator {
    private static instance: any

    constructor() {
        if (Navigator.instance) return Navigator.instance

        Navigator.instance = this
    }

    set setNavigtor(ref) {
        Navigator.instance = ref
    }

    getNavgtionDestination = () => {
        try {
            const shouldUpdate = shouldUpdateApp()

            if (shouldUpdate) return CoreRoutes.updateApp

            if (true) return Routes.mainStack //if auth

            return Routes.authStack
        } catch (error) {
            return CoreRoutes.fallback
        }
    }


    showMain = () => {
        try {
            const navgtionDestination = this.getNavgtionDestination()

            const destination = typeof navgtionDestination === 'object' ?
                Object.values(navgtionDestination)[0]
                : navgtionDestination

            this.reset({routeName: destination})
        } catch (error) {
            console.log(error)
        }
    }

    navigateTo = (routeName, routeParams?) => {
        try {
            Navigator.instance.navigate(routeName, routeParams)
        } catch (error) {

        }
    }

    reset = ({ routeName, routeParams = {}, position = 0 }) => {
        try {
            Navigator.instance.dispatch(CommonActions.reset(
                {
                    index: position,
                    routes: [
                        { name: routeName }
                    ],
                }

            ))
        } catch (error) {

        }
    }

    goBack = () => {
        Navigator.instance.goBack()
    }
}

export default new Navigator()