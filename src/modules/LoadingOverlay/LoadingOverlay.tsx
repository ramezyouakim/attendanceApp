import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import UISharedStore from '../../core/Services/UISharedStore/UISharedStore';

const LoadingOverlay = () => {
    const uiSharedStore = new UISharedStore()

    return (
        <Spinner
            visible={uiSharedStore.loadingOverlay}
            textContent={'Loading...'}
        // textStyle = { styles.spinnerTextStyle }
        />
    )
}
export default observer(LoadingOverlay)