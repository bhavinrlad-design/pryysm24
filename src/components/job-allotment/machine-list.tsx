
"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Printer as PrinterIcon, Clock, Layers, Droplets, Sparkles, Diamond } from 'lucide-react';
import type { Machine, ScheduledJob, Job } from './types';
import type { Printer } from '../../hooks/workspace';
import { Progress } from '../ui/progress';
import { format, formatDistanceToNowStrict } from 'date-fns';
import Image from 'next/image';

interface MachineListProps {
  machines: Machine[];
  schedule: ScheduledJob[];
  technologyIcons: { [key: string]: React.ElementType };
  onViewLog: (printer: Printer) => void;
}

const statusText = {
    Printing: "bg-green-100 text-green-800",
    Online: "bg-green-100 text-green-800",
    Offline: "bg-gray-200 text-gray-800",
    Maintenance: "bg-yellow-100 text-yellow-800",
    printing: "bg-green-100 text-green-800",
    running: "bg-green-100 text-green-800",
    idle: "bg-blue-100 text-blue-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    offline: "bg-gray-200 text-gray-800"
};

const statusBorderColors = {
    Printing: 'border-l-4 border-green-500',
    Online: 'border-l-4 border-green-500',
    Offline: 'border-l-4 border-gray-400',
    Maintenance: 'border-l-4 border-yellow-500',
    printing: 'border-l-4 border-green-500',
    running: 'border-l-4 border-green-500',
    idle: 'border-l-4 border-blue-500',
    maintenance: 'border-l-4 border-yellow-500',
    offline: 'border-l-4 border-gray-400'
};


export function MachineList({ machines, schedule, technologyIcons, onViewLog }: MachineListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {machines.map(machine => {
            const machineJobs = schedule.find(s => s.printerId === machine.id)?.jobs || [];
            const upcomingJobs = machineJobs.filter(j => new Date(j.start) > new Date());
            
            const TechIcon = technologyIcons[machine.technology] || PrinterIcon;
            
            return (
                 <Card 
                    key={machine.id} 
                    className={`flex flex-col ${statusBorderColors[machine.status]} hover:shadow-md transition-shadow cursor-pointer`}
                    onClick={() => onViewLog(machine)}
                  >
                    <CardHeader className="p-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                    <TechIcon className="h-3.5 w-3.5"/>
                                    {machine.name}
                                </h3>
                                <p className="text-[10px] text-muted-foreground">{machine.technology}</p>
                            </div>
                             <Badge variant='secondary' className={`capitalize text-[10px] px-1.5 py-0.5 ${statusText[machine.status.toLowerCase()]}`}>
                                {machine.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-2 space-y-1.5">
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                                {machine.currentJob?.jobId ? (
                                    <TechIcon className="w-6 h-6 text-green-500" />
                                ) : (
                                    <TechIcon className="w-6 h-6 text-muted-foreground" />
                                )}
                            </div>
                            <div className="text-[10px] text-muted-foreground space-y-0.5 w-full">
                                {machine.currentJob ? (
                                    <>
                                        <p className="font-semibold text-foreground truncate text-[11px]">{machine.currentJob.name}</p>
                                        <Progress value={machine.currentJob.progress} className="h-1" />
                                        <p className="text-[10px]">{machine.currentJob.progress.toFixed(0)}% complete</p>
                                    </>
                                ) : (
                                    <p className="text-center italic text-[10px]">No active job</p>
                                )}
                            </div>
                        </div>

                         <div className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {machine.currentJob 
                                ? `Progress: ${machine.currentJob.progress}%`
                                : `Status: ${machine.status}`
                            }
                        </div>
                        
                        <div className="mt-1 space-y-1">
                            <h4 className="text-[10px] font-semibold text-muted-foreground">Queue ({upcomingJobs.length})</h4>
                            {upcomingJobs.length > 0 ? (
                            upcomingJobs.slice(0, 1).map(job => (
                                <div key={job.id} className="text-[10px] p-1 bg-background rounded-md shadow-sm border truncate">
                                {job.name}
                                </div>
                            ))
                            ) : (
                            <div className="text-[10px] text-muted-foreground text-center py-1 border-2 border-dashed rounded-lg">
                                Queue is empty
                            </div>
                            )}
                            {upcomingJobs.length > 1 && <p className="text-[10px] text-center text-muted-foreground">+ {upcomingJobs.length - 1} more</p>}
                        </div>
                    </CardContent>
                </Card>
            );
        })}
    </div>
  );
}


