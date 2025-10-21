"use client";

import React, { useState, useMemo, useCallback, createRef, useRef, useEffect } from 'react';
import { KanbanBoard } from './kanban-board';
import { ProjectDetailsModal } from './project-details-modal';
import { useWorkspace } from '../../hooks/workspace';
import { Workflow, User, QrCode } from 'lucide-react';
import { Button } from '@/components/ui';
import { useToast } from '@/hooks/use-toast';
import { QRScannerModal } from './qr-scanner-modal';
import { ChangeStatusModal } from './change-status-modal';

import { type Order } from '../../hooks/workspace';
import { type Customer } from '../../hooks/workspace';
import { 
    type KanbanCardData,
    type KanbanColumnId,
    type KanbanColumn,
    type DragItem,
    type DropResult,
    type TrackingItem,
    type ProjectData 
} from './types';

const columnStatusMap: Record<KanbanColumnId, Order['status'][]> = {
    'order-received': ['pending'],
    'printing': ['in-progress', 'overdue'],
    'qc': ['qc'],
    'packing': ['packing'],
    'dispatched': ['dispatched', 'completed'],
};

const statusToColumnMap: { [key in Order['status']]: KanbanColumnId } = {
    pending: 'order-received',
    'in-progress': 'printing',
    overdue: 'printing',
    qc: 'qc',
    packing: 'packing',
    dispatched: 'dispatched',
    completed: 'dispatched',
};

export function TrackingClient({ hideHeader = false }: { hideHeader?: boolean }) {
    const { 
        orders, 
        customers, 
        updateOrderStatus,
    } = useWorkspace() as unknown as {
        orders: Order[],
        customers: Customer[],
        updateOrderStatus: (id: string, status: Order['status']) => void
    };
    const [selectedCard, setSelectedCard] = useState<KanbanCardData | null>(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
    const [scannedOrder, setScannedOrder] = useState<Order | null>(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const { toast } = useToast();

    const cardRefs = useRef<{[key: string]: React.RefObject<HTMLDivElement>}>({});

    const columns: KanbanColumn[] = useMemo(() => {
        const getCompany = (customer: string | Customer): string | undefined => {
            if (typeof customer === 'string') {
                return customers.find((c: Customer) => c.name === customer)?.company;
            }
            return customer.company;
        };

        const ordersWithCompany: KanbanCardData[] = orders.map((o: Order) => ({ ...o, company: getCompany(o.customer), type: 'order' }));
        
        // Ensure refs exist for all draggable items
        ordersWithCompany.forEach(item => {
            const cardId = item.orderNumber;
            if (!cardRefs.current[cardId]) {
                cardRefs.current[cardId] = createRef<HTMLDivElement>();
            }
        });

        return [
            { id: 'order-received', title: 'Order Received', items: ordersWithCompany.filter(o => columnStatusMap['order-received'].includes(o.status)) },
            { id: 'printing', title: 'Printing', items: ordersWithCompany.filter(o => columnStatusMap['printing'].includes(o.status)) },
            { id: 'qc', title: 'Quality Control', items: ordersWithCompany.filter(o => columnStatusMap['qc'].includes(o.status)) },
            { id: 'packing', title: 'Packing', items: ordersWithCompany.filter(o => columnStatusMap['packing'].includes(o.status)) },
            { id: 'dispatched', title: 'Dispatched', items: ordersWithCompany.filter(o => columnStatusMap['dispatched'].includes(o.status)) },
        ];
    }, [orders, customers]);

    useEffect(() => {
        // Check for a highlighted order ID from another page (e.g., Orders page)
        const orderToHighlight = localStorage.getItem('highlightOrderId');
        if (orderToHighlight) {
            setHighlightedCardId(orderToHighlight);
            localStorage.removeItem('highlightOrderId');
        }
    }, []);

    useEffect(() => {
        if (highlightedCardId) {
            const ref = cardRefs.current[highlightedCardId];
            if (ref && ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const timer = setTimeout(() => setHighlightedCardId(null), 2000); // Highlight for 2 seconds
                return () => clearTimeout(timer);
            }
        }
    }, [highlightedCardId]);

    const handleCardClick = (card: KanbanCardData) => {
        setSelectedCard(card);
    };

    const handleDrop = useCallback((item: { id: string | number; type: 'order'; sourceColumnId: KanbanColumnId }, targetColumnId: KanbanColumnId) => {
        const { id, type, sourceColumnId } = item;
        
        if (sourceColumnId === targetColumnId) return;

        if (type === 'order') {
            const orderId = String(id);
            const newStatus = columnStatusMap[targetColumnId][0]; // Take the primary status for the column
            if (newStatus) {
                updateOrderStatus(orderId, newStatus);
                toast({ title: 'Order Status Updated', description: `Order moved to ${targetColumnId.replace('-', ' ')}.`});
            }
        }
        
    }, [updateOrderStatus, toast]);
    
    const handleScanSuccess = (orderNumber: string) => {
        setIsScannerOpen(false);
        const order = orders.find((o: Order) => o.orderNumber === orderNumber);
        
        if (order) {
            setHighlightedCardId(order.orderNumber);
            setScannedOrder(order);
            setIsStatusModalOpen(true);
        } else {
             toast({
                variant: "destructive",
                title: "Order Not Found",
                description: `Could not find order ${orderNumber} on the board.`
            });
        }
    };
    
    const handleChangeStatus = (orderId: string, newStatus: Order['status']) => {
        updateOrderStatus(orderId, newStatus);
        setIsStatusModalOpen(false);
        setScannedOrder(null);
        toast({ title: 'Status Updated', description: `Order moved to ${newStatus.replace('-', ' ')}.` });
    };

    return (
                <div className="space-y-6">
                        {!hideHeader && (
                            <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                                        <Workflow className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Project Tracking</h1>
                                        <p className="mt-1 text-sm text-slate-500">Visualize and manage your entire workflow.</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button variant="outline" onClick={() => setIsScannerOpen(true)}>
                                        <QrCode className="mr-2 h-4 w-4" />
                                        Scan QR Code
                                    </Button>
                                    <Button variant="ghost" className="gap-2 text-sm text-slate-500">
                                        <User className="h-4 w-4" />
                                        Assign owner
                                    </Button>
                                </div>
                            </header>
                        )}

                        <div className="overflow-x-auto">
                <KanbanBoard 
                    columns={columns} 
                    onCardClick={handleCardClick} 
                    onDrop={handleDrop} 
                    cardRefs={cardRefs.current}
                    highlightedCardId={highlightedCardId}
                />
            </div>

            {selectedCard && (
                <ProjectDetailsModal
                    card={selectedCard}
                    isOpen={!!selectedCard}
                    onClose={() => setSelectedCard(null)}
                />
            )}
            
            <QRScannerModal 
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScanSuccess={handleScanSuccess}
            />

            {scannedOrder && (
                <ChangeStatusModal
                    order={scannedOrder}
                    isOpen={isStatusModalOpen}
                    onClose={() => { setIsStatusModalOpen(false); setScannedOrder(null); }}
                    onStatusChange={handleChangeStatus}
                />
            )}
        </div>
    );
}


