
"use client"

import React, { useState, useMemo, useEffect } from 'react';
import type { Printer, ScheduledJob, Job } from '../../hooks/workspace';
import { useWorkspace } from '../../hooks/workspace';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, CheckSquare, Clock, FileUp, List, Server, Zap, HardDrive, Wrench, XCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import { JobDetailsModal } from './job-details-modal';

const statusStyles = {
    // Standard PrinterStatus values
    Online: { text: "text-success", border: "border-success", icon: Zap, iconClass: "text-success" },
    Offline: { text: "text-neutral-500", border: "border-neutral-400", icon: XCircle, iconClass: "text-neutral-500" },
    Maintenance: { text: "text-warning", border: "border-warning", icon: Wrench, iconClass: "text-warning" },
    Printing: { text: "text-success", border: "border-success", icon: Zap, iconClass: "text-success" },
    // Legacy values that might still be in use
    printing: { text: "text-success", border: "border-success", icon: Zap, iconClass: "text-success" },
    running: { text: "text-success", border: "border-success", icon: Zap, iconClass: "text-success" },
    idle: { text: "text-primary", border: "border-primary", icon: Server, iconClass: "text-primary" },
    maintenance: { text: "text-warning", border: "border-warning", icon: Wrench, iconClass: "text-warning" },
    offline: { text: "text-neutral-500", border: "border-neutral-400", icon: XCircle, iconClass: "text-neutral-500" },
};


interface ScheduleItem {
    printerId: string;
    jobs: Array<ScheduledJob & { isConfirmed?: boolean }>;
}

export function PrinterJobManager() {
    const { printers, schedule, confirmJobUpload } = useWorkspace() as unknown as { 
        printers: Printer[],
        schedule: ScheduleItem[],
        confirmJobUpload: (jobId: string | number, printerId: string) => void
    };
    const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const activePrinters = useMemo(() => {
        return printers.filter(p => 
            p.status === 'Printing' || p.status === 'Online' || p.status === 'Maintenance'
        );
    }, [printers]);

    const printerJobInfo = useMemo(() => {
        const info = new Map<string, { pendingCount: number }>();
        activePrinters.forEach(p => {
            const jobs = schedule.find(s => s.printerId === p.id)?.jobs || [];
            const pendingCount = jobs.filter(j => !j.isConfirmed).length;
            info.set(p.id, { pendingCount });
        });
        return info;
    }, [activePrinters, schedule]);
    
    useEffect(() => {
        if (!selectedPrinter || !activePrinters.find(p => p.id === selectedPrinter.id)) {
            setSelectedPrinter(activePrinters[0] || null);
        }
    }, [activePrinters, selectedPrinter]);

    const selectedPrinterJobs = useMemo(() => {
        if (!selectedPrinter) return { confirmed: [], pending: [] };
        const jobs = schedule.find(s => s.printerId === selectedPrinter.id)?.jobs || [];
        const sortedJobs = jobs.sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        return {
            confirmed: sortedJobs.filter(j => j.isConfirmed),
            pending: sortedJobs.filter(j => !j.isConfirmed)
        };
    }, [selectedPrinter, schedule]);

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>Job Confirmation</CardTitle>
                <CardDescription>Select a printer to view its queue and confirm file uploads for new jobs.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column: Printer List */}
                    <div className="md:col-span-1 border-r pr-6 h-[60vh] overflow-y-auto">
                        <h3 className="font-semibold mb-3">Active Printers ({activePrinters.length})</h3>
                        <div className="space-y-2">
                            {activePrinters.map(printer => {
                                const info = printerJobInfo.get(printer.id);
                                const isSelected = selectedPrinter?.id === printer.id;
                                const styles = statusStyles[printer.status];
                                return (
                                    <button 
                                        key={printer.id}
                                        onClick={() => setSelectedPrinter(printer)}
                                        className={cn(
                                            "w-full text-left p-3 border-l-4 rounded-r-lg transition-colors",
                                            styles.border,
                                            isSelected ? "bg-muted shadow" : "bg-background hover:bg-muted/50"
                                        )}
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{printer.name}</p>
                                            {info && info.pendingCount > 0 && (
                                                 <div className="relative flex h-3 w-3" title={`${info.pendingCount} jobs pending confirmation`}>
                                                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></div>
                                                    <div className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></div>
                                                </div>
                                            )}
                                        </div>
                                        <p className={cn("text-sm capitalize", styles.text)}>{printer.status}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    
                    {/* Right Column: Job Queues */}
                    <div className="md:col-span-2 h-[60vh] overflow-y-auto">
                        {!selectedPrinter ? (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                Select a printer to view its job queue.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Pending Confirmation */}
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                                        <FileUp className="h-5 w-5 text-destructive" />
                                        Pending Confirmation ({selectedPrinterJobs.pending.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedPrinterJobs.pending.length > 0 ? selectedPrinterJobs.pending.map(job => (
                                            <JobCard key={job.id} job={job} onCardClick={() => setSelectedJob(job)}>
                                                <Button size="sm" onClick={(e) => { e.stopPropagation(); confirmJobUpload(job.id, selectedPrinter.id); }}>
                                                    <CheckSquare className="mr-2 h-4 w-4" />
                                                    Confirm Upload
                                                </Button>
                                            </JobCard>
                                        )) : (
                                            <p className="text-sm text-muted-foreground p-4 text-center border-2 border-dashed rounded-lg">No jobs are pending confirmation for this printer.</p>
                                        )}
                                    </div>
                                </div>
                                {/* Confirmed Queue */}
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                                        <HardDrive className="h-5 w-5 text-primary" />
                                        Confirmed Queue ({selectedPrinterJobs.confirmed.length})
                                    </h3>
                                     <div className="space-y-3">
                                        {selectedPrinterJobs.confirmed.length > 0 ? selectedPrinterJobs.confirmed.map(job => (
                                            <JobCard key={job.id} job={job} isConfirmed onCardClick={() => setSelectedJob(job)} />
                                        )) : (
                                            <p className="text-sm text-muted-foreground p-4 text-center border-2 border-dashed rounded-lg">The confirmed job queue is empty.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <JobDetailsModal
            isOpen={!!selectedJob}
            onClose={() => setSelectedJob(null)}
            job={selectedJob}
        />
        </>
    )
}

const JobCard = ({ job, isConfirmed = false, onCardClick, children }: { job: Job | ScheduledJob, isConfirmed?: boolean, onCardClick: () => void, children?: React.ReactNode }) => {
    return (
        <div 
            className={cn(
                "p-3 rounded-lg flex items-center gap-4 cursor-pointer", 
                isConfirmed ? "bg-green-500/10" : "bg-background border shadow-sm",
                job.isEmergency && !isConfirmed && "animate-flash-background"
            )}
            onClick={onCardClick}
        >
            <Image 
                src={job.imageUrl || 'https://placehold.co/100x100.png'} 
                alt={job.name} 
                width={48} 
                height={48} 
                className="rounded-md object-cover"
                data-ai-hint="product photo"
            />
            <div className="flex-grow">
                 <p className="font-medium">{job.name}</p>
                <p className="text-xs text-muted-foreground">{job.projectCode}</p>
                {('start' in job) && (
                  <p className="text-xs flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3"/> 
                    Starts: {format(new Date((job as ScheduledJob).start), 'dd-MMM, h:mm a')}
                  </p>
                )}
            </div>
            {children && <div className="flex-shrink-0">{children}</div>}
        </div>
    );
}


