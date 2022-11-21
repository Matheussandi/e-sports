import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2634', 
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginVertical: 28,
    justifyContent: 'space-between',
  },
  logo: {
    width: 72,
    height: 40,
  },
  right: {
    width: 20,
    height: 20,
  },
  form: {
    backgroundColor: '#2A2634',
    alignItems: 'flex-start',
    padding: 16,

    borderRadius: 4,
  },
  title: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.TEXT,
  },
  titleInput: {
    textAlign: 'center',
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,

    backgroundColor: '#18181B',
    color: '#71717A',

    marginTop: 8,
    marginBottom: 16,
    width: 300,

    paddingVertical: 16,
    borderRadius: 4,
  },
});