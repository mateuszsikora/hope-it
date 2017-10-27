import {
  StyleSheet
} from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default commonStyles;