import { Component, ReactNode } from "react";
import FallbackScreen from "./FallbackScreen";
import React from "react";
// import crashlytics from "@react-native-firebase/crashlytics";

export interface ErrorBoundaryProps {
    // fallback: () => ReactNode;
    children: any
}
export class ErrorBoundary extends Component<ErrorBoundaryProps> {

    state: { error: Error | undefined } = {
        error: undefined
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ error });
        // crashlytics().recordError(error);
    }

    render() {
        if (!this.state.error) {
            return this.props.children
        }

        return <FallbackScreen />;
    }
}