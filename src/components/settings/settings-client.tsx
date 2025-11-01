"use client"

import { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useToast } from '../../hooks/use-toast'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { parseCsv } from '../../lib/csv-parser'
import { useWorkspace, type CodeSettings, type Document } from '../../hooks/workspace'
import { Switch } from '../ui/switch'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Textarea } from '../ui/textarea'


export function SettingsClient() {
    const { toast } = useToast();
    const { user, updateUserProfile, logout } = useAuth();
    const { workspaceData, codeSettings: initialCodeSettings, updateCodeSettings, addSupportTicket } = useWorkspace() as {
        workspaceData: any;
        documents: Document[];
        customers: any[];
        codeSettings: CodeSettings | null;
        updateCodeSettings: (newSettings: CodeSettings) => void;
        supportTickets: any[];
        addSupportTicket: (ticket: any) => void;
    };

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const workspaceImportRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        avatar: ''
    });
    const [codeSettings, setCodeSettings] = useState<CodeSettings | null>(null);
    const [supportTicket, setSupportTicket] = useState({ subject: '', description: '' });
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (user) {
            setProfile(prev => ({ ...prev, name: user.name || '', email: user.email || '', avatar: user.avatar || '' }));
        }
        if (initialCodeSettings) {
            setCodeSettings(initialCodeSettings);
        }
    }, [user, initialCodeSettings]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSave = async () => {
        try {
            await updateUserProfile({
                name: profile.name,
                email: profile.email,
                ...(profile.newPassword && { password: profile.newPassword }),
                avatar: profile.avatar
            });
            toast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated.'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update profile.',
                variant: 'destructive'
            });
        }
        setProfile(prev => ({ ...prev, currentPassword: '', newPassword: ''}));
    }
    
    const handleCodeSettingChange = (key: keyof CodeSettings, value: string | number) => {
        setCodeSettings(prev => (prev ? { ...prev, [key]: value } : null));
    };

    const handleSaveCodeSettings = () => {
        if (codeSettings) {
            updateCodeSettings(codeSettings);
            toast({
                title: 'Code Settings Updated',
                description: 'Your custom code prefixes have been saved.'
            });
        }
    }

    const handleSignOut = () => {
        logout();
        router.push('/login');
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        const { headers, rows } = parseCsv(text);

        // Here you would typically do something with the parsed data,
        // like sending it to a server or updating state.
        console.log('CSV Headers:', headers);
        console.log('CSV Rows:', rows);

        toast({
            title: "File Uploaded",
            description: `${file.name} has been processed.`,
        });
    };
    
    const handleSupportTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSupportTicket(prev => ({ ...prev, [name]: value }));
    };

    const handleSupportTicketSubmit = () => {
        if (supportTicket.subject && supportTicket.description) {
            addSupportTicket(supportTicket);
            toast({
                title: 'Support Ticket Submitted',
                description: 'Our team will get back to you shortly.'
            });
            setSupportTicket({ subject: '', description: '' });
        } else {
            toast({
                title: 'Missing Information',
                description: 'Please provide both a subject and a description.',
                variant: 'destructive'
            });
        }
    };

    const handleWorkspaceImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Placeholder for workspace import logic
        const file = event.target.files?.[0];
        if (!file) return;
        toast({
            title: "Workspace Import",
            description: `Importing from ${file.name}... (feature in development)`,
        });
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Settings</h2>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full text-left px-4 py-2 ${activeTab === 'profile' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('workspace')}
                                className={`w-full text-left px-4 py-2 ${activeTab === 'workspace' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                Workspace
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`w-full text-left px-4 py-2 ${activeTab === 'code' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                Code
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('import')}
                                className={`w-full text-left px-4 py-2 ${activeTab === 'import' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                Import
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('export')}
                                className={`w-full text-left px-4 py-2 ${activeTab === 'export' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                Export
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('support')}
                                className={`w-full text-left px-4 py-2 ${activeTab === 'support' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                Support
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('signout')}
                                className={`w-full text-left px-4 py-2 ${activeTab === 'signout' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'profile' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Settings</CardTitle>
                            <CardDescription>Manage your public profile and account settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={profile.avatar} alt={profile.name} />
                                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Label htmlFor="avatar-upload">Update Avatar</Label>
                                    <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" name="currentPassword" type="password" value={profile.currentPassword} onChange={handleProfileChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" name="newPassword" type="password" value={profile.newPassword} onChange={handleProfileChange} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleProfileSave}>Save Changes</Button>
                        </CardFooter>
                    </Card>
                )}

                {activeTab === 'workspace' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Workspace Settings</CardTitle>
                            <CardDescription>Customize your workspace environment.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Workspace Name</Label>
                                <Input value={workspaceData?.name || 'My Workspace'} readOnly />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label>Enable Dark Mode</Label>
                                <Switch />
                            </div>
                            <div className="space-y-2">
                                <Label>Default Language</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="English" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'code' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Code Settings</CardTitle>
                            <CardDescription>Manage custom prefixes for your generated code.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {initialCodeSettings && Object.keys(initialCodeSettings).map((key) => (
                                    <div className="space-y-2" key={key}>
                                        <Label htmlFor={`code-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                                        <Input
                                            id={`code-${key}`}
                                            value={codeSettings?.[key as keyof CodeSettings] || ''}
                                            onChange={(e) => handleCodeSettingChange(key as keyof CodeSettings, e.target.value)}
                                            placeholder={String(initialCodeSettings[key as keyof CodeSettings] || '')}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveCodeSettings}>Save Code Settings</Button>
                        </CardFooter>
                    </Card>
                )}

                {activeTab === 'import' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Import Data</CardTitle>
                            <CardDescription>Import data from various sources.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Import Customers from CSV</Label>
                                <Input type="file" accept=".csv" onChange={handleFileUpload} ref={fileInputRef} />
                            </div>
                            <div className="space-y-2">
                                <Label>Import Workspace</Label>
                                <Input type="file" onChange={handleWorkspaceImport} ref={workspaceImportRef} />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'export' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Export Data</CardTitle>
                            <CardDescription>Export your workspace data.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button>Export as JSON</Button>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'support' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Support</CardTitle>
                            <CardDescription>Submit a support ticket for assistance.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="support-subject">Subject</Label>
                                <Input id="support-subject" name="subject" value={supportTicket.subject} onChange={handleSupportTicketChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="support-description">Description</Label>
                                <Textarea id="support-description" name="description" value={supportTicket.description} onChange={handleSupportTicketChange} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSupportTicketSubmit}>Submit Ticket</Button>
                        </CardFooter>
                    </Card>
                )}

                {activeTab === 'signout' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Out</CardTitle>
                            <CardDescription>Are you sure you want to sign out?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}