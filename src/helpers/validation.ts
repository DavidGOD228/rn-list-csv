import {Invoice} from '../../types/invoice';

export function validateInvoiceRow(row: Invoice): string | null {
  if (!row.id || typeof row.id !== 'number') {
    return 'Invalid or missing invoice ID';
  }

  if (!row.amount || typeof row.amount !== 'number') {
    return 'Invalid or missing invoice amount';
  }

  if (!row.date || isNaN(row.date.getTime())) {
    return 'Invalid or missing invoice date';
  }

  return null;
}
