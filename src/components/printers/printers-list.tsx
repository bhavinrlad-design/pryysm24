
"use client"

import React from 'react'
import type { Printer } from '../../hooks/workspace'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Badge } from '../ui/badge'
import { Printer as PrinterIcon, Clock } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'

interface PrintersListProps {
    printers: Printer[];
    onViewLog: (printer: Printer) => void;
}

const statusText = {
    Online: "bg-primary/10 text-primary",
    Offline: 'bg-error/10 text-error',
    Maintenance: "bg-warning/10 text-warning",
    Printing: "bg-success/10 text-success",
    // Legacy values for backward compatibility
    printing: "bg-success/10 text-success",
    running: "bg-success/10 text-success",
    idle: "bg-primary/10 text-primary",
    maintenance: "bg-warning/10 text-warning",
    offline: 'bg-error/10 text-error',
};

const statusBorderColors = {
    Online: 'border-l-4 border-primary',
    Offline: 'border-l-4 border-error',
    Maintenance: 'border-l-4 border-warning',
    Printing: 'border-l-4 border-success',
    // Legacy values for backward compatibility
    printing: 'border-l-4 border-success',
    running: 'border-l-4 border-success',
    idle: 'border-l-4 border-primary',
    maintenance: 'border-l-4 border-warning',
    offline: 'border-l-4 border-error',
};


export function PrintersList({ printers, onViewLog }: PrintersListProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Printers</CardTitle>
            <CardDescription>Status of all printers.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {printers.length > 0 ? printers.map(printer => (
                <div key={printer.id} onClick={() => onViewLog(printer)} className={`p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${statusBorderColors[printer.status]}`}>
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{printer.name}</h3>
                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusText[printer.status]}`}>
                            {printer.status.charAt(0).toUpperCase() + printer.status.slice(1)}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        <div className="w-24 h-24 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                            {printer.currentJob ? (
                                <PrinterIcon className="w-10 h-10 text-green-500" />
                            ) : (
                                <PrinterIcon className="w-10 h-10 text-muted-foreground" />
                            )}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1 w-full">
                            <div><span className="font-medium">Technology:</span> {printer.technology}</div>
                            <div><span className="font-medium">Model:</span> {printer.model}</div>
                            <div><span className="font-medium">Location:</span> {printer.location}</div>
                            <div className="pt-2">
                                <div className="flex items-center gap-1.5 text-xs font-medium">
                                    <Clock className="h-3 w-3" />
                                    {printer.currentJob 
                                        ? `Progress: ${printer.currentJob.progress}%` 
                                        : `${printer.status.charAt(0).toUpperCase() + printer.status.slice(1)}`
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )) : (
                 <div className="text-center text-muted-foreground py-8 col-span-full">
                    No printers match the selected technology.
                </div>
            )}
        </CardContent>
    </Card>
  )
}


