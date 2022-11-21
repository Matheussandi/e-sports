import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  inputText: {
    flex: 1,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,

    backgroundColor: '#18181B',
    color: '#7A7A80',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  }
});