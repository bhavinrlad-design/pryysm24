export type Currency = "USD" | "EUR" | "GBP" | "AED" | "INR";

export type PrinterTechnology = "FDM" | "SLA" | "SLS" | "MJF" | "DLP" | "EBM" | "DMLS";
export type PrinterStatus = "printing" | "idle" | "maintenance" | "offline" | "running";

export interface Job {
  id: string;
  name: string;
  status: string;
  deadline: Date;
  progress: number;
}

export interface Printer {
  id: string;
  name: string;
  model: string;
  codeName: string;
  location: string;
  technology: PrinterTechnology;
  initializationDate: Date;
  capacity: string;
  material: string;
  status: string;
  completionEstimate?: Date;
  idleSince?: Date;
  utilization?: number;
  currentJob?: Job;
  currentJobImage?: string;
}

export interface Document {
  id: string;
  type: string;
  date: string;
  amount: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: string;
  historicalUsage?: string;
}

export type MaterialStatus = "Active" | "Low" | "Critical" | "Empty" | "New";
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type InventoryCategory = "Filament" | "Resin" | "Powder" | "Parts";