import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    touchable: {
        height: 26,
        width: 26,
        borderRadius: 4,
        backgroundColor: '#18181B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.MD,
        color: '#FFFFFF',
        marginLeft: 12,
    },
    error: {
        color: '#DC1637',
        marginBottom: 16,
      }
});