export interface Invoice {
  id: number;
  amount: number;
  date: Date;
}

export interface InvoiceWithPrice extends Invoice {
  sellPrice: number;
}

export interface InvoiceError {
  rowIndex: number;
  message: string;
}
