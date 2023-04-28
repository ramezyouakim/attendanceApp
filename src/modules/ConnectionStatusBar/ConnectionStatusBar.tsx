import React from 'react';
import { ConnectionStatusBar as ConnectionStatus } from 'react-native-ui-lib';
import i18n from '../../core/Localisation/i18n';

const CONNECTION_STATUS_BAR_LABEL = i18n.t("internet_connectivity_label")

const ConnectionStatusBar = () => {
    return (
        <ConnectionStatus
            useAbsolutePosition
            onConnectionChange={() => console.log('connection changed')}
            label={CONNECTION_STATUS_BAR_LABEL}
        />
    )
}

export default ConnectionStatusBar