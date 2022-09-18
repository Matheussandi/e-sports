import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.OVERLAY,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: 311,
        backgroundColor: THEME.COLORS.SHAPE,
    },
    closeIcon: {
        alignSelf: 'flex-end',
        margin: 16,
    },
    label: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginTop: 24,
        marginBottom: 8,
    },
    discordButton: {
      width: 231,
      height: 48,
      backgroundColor: THEME.COLORS.BACKGROUND_900,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      marginBottom: 32,
    },
    discord: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.MD,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
    }
});