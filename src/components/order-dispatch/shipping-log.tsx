
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Eye, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
// Define LoggedShippingLabel type here as it doesn't exist in workspace.ts
export interface LoggedShippingLabel {
  id: string;
  date?: string;
  carrier?: string;
  trackingNumber?: string;
  recipient?: string;
  address?: string;
  packageInfo?: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  cost?: number;
  status?: string;
  createdAt: string;
  info: {
    orderId: string;
    to: {
      name: string;
      address: string;
    };
    from: {
      name: string;
      address: string;
    };
    carrier: string;
    trackingNumber: string;
    packageDetails: {
      weight: string;
      dimensions: string;
    };
    barcode: string;
    itemNumber: string;
  };
}
import type { ShippingInfo } from './shipping-label';

interface ShippingLogProps {
    logs: LoggedShippingLabel[];
    onPreview: (info: ShippingInfo) => void;
}

export function ShippingLog({ logs, onPreview }: ShippingLogProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="text-primary"/>
                    Shipping Log
                </CardTitle>
                <CardDescription>
                    A historical record of all generated shipping labels.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg max-h-[30rem] overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Logged On</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.length > 0 ? (
                                logs.map(log => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-medium">{log.info.orderId}</TableCell>
                                        <TableCell>{log.info.to.name}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{format(new Date(log.createdAt), "dd-MM-yy, h:mm a")}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                                                // Convert log.info to proper ShippingInfo format
                                                const shippingInfo: ShippingInfo = {
                                                    orderId: log.info.orderId,
                                                    barcode: log.info.barcode || '12345678',
                                                    itemNumber: log.info.itemNumber || '1',
                                                    from: {
                                                        name: log.info.from.name,
                                                        company: '',
                                                        line1: log.info.from.address,
                                                        hasLine2: false,
                                                        line2: '',
                                                        city: '',
                                                        state: '',
                                                        zip: '',
                                                        country: '',
                                                        phone: { prefix: '', number: '' }
                                                    },
                                                    to: {
                                                        name: log.info.to.name,
                                                        company: '',
                                                        line1: log.info.to.address,
                                                        hasLine2: false,
                                                        line2: '',
                                                        city: '',
                                                        state: '',
                                                        zip: '',
                                                        country: '',
                                                        phone: { prefix: '', number: '' }
                                                    },
                                                    packageDetails: {
                                                        trackingNumber: log.info.trackingNumber,
                                                        weight: log.info.packageDetails?.weight || '0',
                                                        weightUnit: 'kg',
                                                        length: '0',
                                                        width: '0',
                                                        height: '0',
                                                        dimensionUnit: 'cm',
                                                        contents: ''
                                                    }
                                                };
                                                onPreview(shippingInfo);
                                            }}>
                                                <Eye className="h-4 w-4" />
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No labels have been logged yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}


