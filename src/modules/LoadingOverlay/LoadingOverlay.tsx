import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Common from '../../core/Services/Common/Common';

const LoadingOverlay = () => {
    const common = new Common()

    return (
        <Spinner
            visible={common.loadingOverlay}
            textContent={'Loading...'}
        // textStyle = { styles.spinnerTextStyle }
        />
    )
}
export default observer(LoadingOverlay)