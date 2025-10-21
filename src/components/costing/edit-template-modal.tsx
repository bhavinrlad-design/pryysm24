
"use client"

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SavedCalculation } from '../../hooks/workspace';

interface EditTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: SavedCalculation;
    onSave: (id: string, newName: string) => void;
}

export function EditTemplateModal({ isOpen, onClose, template, onSave }: EditTemplateModalProps) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (template) {
            setName(template.name);
        }
    }, [template]);

    const handleSave = () => {
        if (name.trim()) {
            onSave(template.id, name);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Template Name</DialogTitle>
                    <DialogDescription>
                        Change the name for this saved calculation template.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                        id="template-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


