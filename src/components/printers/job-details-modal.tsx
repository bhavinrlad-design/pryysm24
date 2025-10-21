
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog"
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import type { Job } from '../../hooks/workspace';
import { format, isValid } from 'date-fns';
import { Calendar, Clock, Layers, Tag, Hash } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface JobDetailsModalProps {
    job: (Job & { isEmergency?: boolean }) | null;
    isOpen: boolean;
    onClose: () => void;
}

export function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
    if (!job) return null;

    const isDeadlineValid = job.deadline && isValid(new Date(job.deadline));
    // Check if job has start and end properties (it's a ScheduledJob)
    const scheduledJob = job as any;
    const isStartValid = scheduledJob.start && isValid(new Date(scheduledJob.start));
    const isEndValid = scheduledJob.end && isValid(new Date(scheduledJob.end));


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{job.name}</DialogTitle>
                    <DialogDescription>Project Code: {job.projectCode}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                <div className="py-4 space-y-6 pr-4">
                    <div className="flex justify-center">
                         <Image
                            src={job.imageUrl || "https://placehold.co/200x200.png"}
                            alt="Project image"
                            width={200} height={200}
                            className="rounded-lg object-cover"
                            data-ai-hint="product photo"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <DetailItem icon={Clock} label="Start Time" value={isStartValid ? format(new Date(scheduledJob.start), 'PPP, h:mm a') : 'N/A'} />
                        <DetailItem icon={Clock} label="End Time" value={isEndValid ? format(new Date(scheduledJob.end), 'PPP, h:mm a') : 'N/A'} />
                        <DetailItem icon={Calendar} label="Deadline" value={isDeadlineValid ? format(new Date(job.deadline), 'PPP') : 'N/A'} />
                        <DetailItem icon={Tag} label="Priority" value={<Badge variant={job.priority === 'High' ? 'destructive' : 'secondary'} className="capitalize">{job.priority || 'N/A'}</Badge>} />
                        <DetailItem icon={Layers} label="Technology" value={job.requiredTechnology || 'N/A'} />
                        <DetailItem icon={Hash} label="Total Items" value={job.items} />
                    </div>
                </div>
                </ScrollArea>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <Icon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
        <div>
            <p className="text-muted-foreground text-xs">{label}</p>
            <div className="font-semibold">{value}</div>
        </div>
    </div>
)


