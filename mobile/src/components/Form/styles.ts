import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2634', 
    padding: 16, 
    width: '100%',
    maxHeight: '100%',

    borderRadius: 4,
  },
  title: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  time: {
    flexDirection: 'row',
  },
  button:{
    width: '100%',
    height: 36,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel:{
    width: '100%',
    height: 36,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.CAPTION_500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 16,
  },
  buttonText: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,
  },
  dropdown: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,

    backgroundColor: '#18181B',
    color: '#7A7A80',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  }
});