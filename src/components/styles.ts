import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    backgroundColor: '#dedede',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  amount: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    color: 'black',
  },
  listWrapper: {
    width: '100%',
  },
  errorWrapper: {
    margin: 5,
  },
});
