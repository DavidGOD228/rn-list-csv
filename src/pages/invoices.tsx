import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {styles} from './styles';
import {readString} from 'react-native-csv';
import RNFS from 'react-native-fs';
import {calculateSellPrice} from '../helpers/calculateSellPrice';
import {InvoiceError, InvoiceWithPrice} from '../../types/invoice';
import {InvoiceList} from '../components/InvoiceList';
import {validateInvoiceRow} from '../helpers/validation';
import {ErrorList} from '../components/ErrorList';
import {isCsvFile} from '../helpers/common';

export const Invoices = () => {
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentPickerResponse | null>(null);
  const [invoices, setInvoices] = useState<InvoiceWithPrice[]>([]);
  const [errors, setErrors] = useState<InvoiceError[]>([]);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const setInitialState = () => {
    if (selectedDocument) {
      setInvoices([]);
      setErrors([]);
      setShowErrors(false);
      setSelectedDocument(null);
    }
  };
  const handleDocumentSelection = async () => {
    try {
      setIsLoading(true);
      setInitialState();

      const document = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles, DocumentPicker.types.csv],
        copyTo: 'cachesDirectory',
      });

      setSelectedDocument(document);
      const uri = document.uri;
      const fileName = document.name as string;
      const isCsv = isCsvFile(fileName);

      if (isCsv) {
        await processCsv(uri, fileName);
      } else {
        setErrors([
          {
            rowIndex: 0,
            message: 'Error selecting document: wrong file types',
          },
        ]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document selection');
      } else {
        setErrors([
          {
            rowIndex: 0,
            message: 'Error selecting document:' + err,
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const processCsv = async (uri: string, fileName: string) => {
    const localFile = `${RNFS.CachesDirectoryPath}/${fileName}`;

    await RNFS.copyFile(uri, localFile);

    const csvString = await RNFS.readFile(localFile);
    const results = readString(csvString).data as string[];

    const rows: InvoiceWithPrice[] = [];
    const rowErrors: InvoiceError[] = [];

    results.forEach((row, index) => {
      const invoice = {
        id: Number(row[0]),
        amount: Number(row[1]),
        date: new Date(row[2]),
        sellPrice: 0,
      };

      const rowError = validateInvoiceRow(invoice);

      if (!rowError) {
        invoice.sellPrice = calculateSellPrice(invoice);
        rows.push(invoice);
        setInvoices(rows);
      } else {
        rowErrors.push({
          rowIndex: index + 1,
          message: rowError,
        });
        setErrors(rowErrors);
      }
    });
  };
  const handleToggleErrors = () => {
    setShowErrors(!showErrors);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.btnWrapper}>
        {isLoading && <ActivityIndicator size="large" />}
        <TouchableOpacity onPress={handleDocumentSelection} style={styles.btn}>
          <Text>Select Document</Text>
        </TouchableOpacity>

        {errors.length > 0 && (
          <TouchableOpacity
            onPress={handleToggleErrors}
            style={[styles.btn, styles.btnError]}>
            <Text>{showErrors ? 'Hide Errors' : 'Show Errors'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {selectedDocument && !showErrors && <InvoiceList data={invoices} />}
      {showErrors && <ErrorList errors={errors} />}
    </View>
  );
};
