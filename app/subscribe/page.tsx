
"use client";

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PryysmLogo } from '@/components/PryysmLogo';

function SubscribePageClient() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <PryysmLogo className="h-10 w-10" />
                        <h1 className="text-2xl font-bold">
                            Pryysm <span className="text-sm font-medium text-muted-foreground">by 3D Prodigy</span>
                        </h1>
                    </div>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>Subscription plans are not available for this application.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <p className="mb-6">This feature is not currently available. You are using the Free plan with all features enabled.</p>
                    <Button onClick={() => router.push('/dashboard')} className="w-full">
                        Return to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default function SubscribePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubscribePageClient />
        </Suspense>
    );
}
