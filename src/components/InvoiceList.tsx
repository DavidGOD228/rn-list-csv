import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {InvoiceWithPrice} from '../../types/invoice';
import {styles} from './styles';

interface Props {
  data: InvoiceWithPrice[];
}

export const InvoiceList: React.FC<Props> = ({data}) => {
  const renderItem = ({item}: {item: InvoiceWithPrice}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.id}</Text>
      <Text style={styles.amount}>{`Amount: $${item.amount}`}</Text>
      <Text
        style={
          styles.date
        }>{`Due date: ${item.date.toLocaleDateString()}`}</Text>
      <Text style={styles.price}>{`Sell price: $${item.sellPrice}`}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      ListEmptyComponent={<Text style={styles.empty}>No invoices found.</Text>}
      style={styles.listWrapper}
    />
  );
};
