import {Invoice} from '../../types/invoice';

export function calculateSellPrice(invoice: Invoice): number {
  const dueDate = new Date(invoice.date);
  dueDate.setDate(dueDate.getDate() + 30); // Add 30 days to invoice date

  const daysUntilDue = Math.floor(
    (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  ); // Calculate days until due date

  const coefficient = daysUntilDue > 30 ? 0.5 : 0.3; // Determine coefficient based on days until due date

  return invoice.amount * coefficient; // Calculate sell price
}
