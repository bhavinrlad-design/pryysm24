// --- Schema Definitions ---
import { z } from 'zod';

export const ProjectStatusSchema = z.enum([
  'In Queue',
  'In Progress',
  'Completed',
  'Delayed',
  'QC',
  'Packing',
  'Dispatched',
]);
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const PrinterSchema = z.object({
  id: z.string().describe("Unique identifier for the printer."),
  name: z.string().describe("Name of the printer."),
  technology: z.string().describe("Type of printer technology, e.g., 'FDM', 'SLA', 'SLS'."),
  location: z.string().describe("Physical location of the printer."),
  status: z.string().describe("Current status of the printer, e.g., 'idle', 'printing', 'maintenance'."),
  currentJob: z.string().optional().describe("The name of the job currently being printed."),
  progress: z.number().optional().describe("The progress of the current job as a percentage."),
  completionEstimate: z.string().optional().describe("The estimated completion time for the current job."),
});
export type Printer = z.infer<typeof PrinterSchema>;

export const CustomerSchema = z.object({
  id: z.string().describe("Unique identifier for the customer."),
  name: z.string().describe("Name of the customer."),
  company: z.string().optional().describe("Company name of the customer."),
});
export type Customer = z.infer<typeof CustomerSchema>;

export const InventoryItemSchema = z.object({
  name: z.string().describe("Name of the inventory item."),
  type: z.string().describe("Type of item (e.g., 'Filament Spool', 'Resin', 'Powder', 'Inventory Item')."),
  quantity: z.union([z.number(), z.string()]).describe("Current quantity in stock."),
  status: z.string().describe("Current stock status."),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export const OrderSchema = z.object({
  orderNumber: z.string().describe("Unique order number."),
  customer: z.string().describe("Customer name."),
  orderDate: z.string().describe("Order date in ISO format."),
  status: z.string().describe("Current order status."),
  items: z.number().describe("Number of items in the order."),
});
export type Order = z.infer<typeof OrderSchema>;

export const DocumentSchema = z.object({
  orderNumber: z.string().describe("Related order number."),
  customerName: z.string().describe("Customer name."),
  type: z.string().describe("Document type (Quotation, Purchase Order, or Tax Invoice)."),
  date: z.string().describe("Document date in ISO format."),
  amount: z.number().describe("Total amount in the document."),
});
export type Document = z.infer<typeof DocumentSchema>;

export const CostingTemplateSchema = z.object({
  id: z.string().describe("Unique identifier for the template."),
  name: z.string().describe("Template name."),
  jobName: z.string().describe("The job name associated with the template."),
  printTime: z.string().describe("The print time, e.g., '5h 30m'."),
  filamentWeight: z.number().describe("Filament weight in grams."),
});
export type CostingTemplate = z.infer<typeof CostingTemplateSchema>;