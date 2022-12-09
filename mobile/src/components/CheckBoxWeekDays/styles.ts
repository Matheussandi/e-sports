import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        
    },
    days: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        flexBasis: '14%',
    },
    touchable: {
        height: 40,
        width: 50,
        borderRadius: 4,
        backgroundColor: '#18181B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        height: 40,
        width: 50,
        borderRadius: 4,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.MD,
        color: '#FFFFFF',
    }
});