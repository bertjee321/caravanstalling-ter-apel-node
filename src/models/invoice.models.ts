interface InvoiceBase {
  customer_id?: number;
  vehicle_id?: number;
  amount?: number;
  invoice_date?: string;
  due_date?: string;
  paid?: boolean;
}

export interface AddInvoice extends InvoiceBase {
  customer_id: number; // Customer ID is required for adding an invoice
  vehicle_id: number; // Vehicle ID is required for adding an invoice
  amount: number; // Amount is required for adding an invoice
  invoice_date: string; // Invoice date is required for adding an invoice
  due_date: string; // Due date is required for adding an invoice
}

export interface UpdateInvoice extends InvoiceBase {
  id: number; // ID is required for updating an invoice
}
