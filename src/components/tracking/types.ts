import { type Order } from '../../hooks/workspace';

export type KanbanCardData = Order & { company?: string, type: 'order' };

export type KanbanColumnId = 'order-received' | 'printing' | 'qc' | 'packing' | 'dispatched';

export interface KanbanColumn {
    id: KanbanColumnId;
    title: string;
    items: KanbanCardData[];
}

export interface DragItem {
    type: string;
    id: string;
    columnId: KanbanColumnId;
    index: number;
}

export interface DropResult {
    dropEffect: string;
    columnId: KanbanColumnId;
    index: number;
}

export interface ProjectData {
    id: string;
    title: string;
    description: string;
    assignee?: string;
    dueDate?: string;
    tags: string[];
    status: KanbanColumnId;
    type: 'project';
}

export type TrackingItem = KanbanCardData | ProjectData;