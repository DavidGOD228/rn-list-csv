import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {InvoiceError} from '../../types/invoice';
import {styles} from './styles';

interface Props {
  errors: InvoiceError[];
}

export const ErrorList: React.FC<Props> = ({errors}) => {
  const renderItem = ({item}: {item: InvoiceError}) => (
    <View style={styles.errorWrapper}>
      <Text style={styles.date}>{`Row ${item.rowIndex}: ${item.message}`}</Text>
    </View>
  );

  return (
    <FlatList
      data={errors}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<Text>No errors</Text>}
    />
  );
};
