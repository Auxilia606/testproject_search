import React, { useCallback } from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Modal, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';

import { RootState } from '../../../reducer';
import { setWebViewModalVisible } from '../../../action/search';

interface WebViewModalProps {
    visible?: boolean;
    style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
    header: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    closebutton: {
        marginRight: 10,
    },
});

const WebViewModal: React.FunctionComponent<WebViewModalProps> = ({
    visible,
    style,
}) => {
    const url = useSelector(
        (state: RootState) => state.searchReducer.webViewModalURL,
    );
    const dispatch = useDispatch();
    const onPressHandler = useCallback(() => {
        dispatch(setWebViewModalVisible(false));
    }, [dispatch]);
    return (
        <Modal visible={visible}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onPressHandler}>
                    <View style={styles.closebutton}>
                        <Text>close</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <WebView style={style} source={{ uri: url }} />
        </Modal>
    );
};

export default WebViewModal;
