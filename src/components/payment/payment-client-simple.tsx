"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { CreditCard, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const cardBrands = {
    visa: 'https://placehold.co/40x25/eee/ccc?text=VISA',
    mastercard: 'https://placehold.co/40x25/eee/ccc?text=MC',
    amex: 'https://placehold.co/40x25/eee/ccc?text=AMEX',
    discover: 'https://placehold.co/40x25/eee/ccc?text=DISC',
    unknown: '',
};

export function PaymentClient() {
    const params = useParams();
    const invoiceId = (params?.invoiceId as string) || '';
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'>('unknown');

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        
        let formattedValue = '';
        for(let i=0; i<value.length; i+=4) {
            formattedValue += value.slice(i, i+4) + ' ';
        }
        setCardNumber(formattedValue.trim());

        if (value.startsWith('4')) setCardBrand('visa');
        else if (value.startsWith('5')) setCardBrand('mastercard');
        else if (value.startsWith('34') || value.startsWith('37')) setCardBrand('amex');
        else if (value.startsWith('6')) setCardBrand('discover');
        else setCardBrand('unknown');
    };
    
    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);

        if (value.length > 2) {
            setExpiryDate(`${value.slice(0,2)} / ${value.slice(2)}`);
        } else {
            setExpiryDate(value);
        }
    }

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!cardholderName.trim()) {
            toast({ variant: 'destructive', title: 'Invalid Name', description: 'Please enter the cardholder name.' });
            return;
        }

        const rawCardNumber = cardNumber.replace(/\s/g, '');
        if (rawCardNumber.length !== 16) {
            toast({ variant: 'destructive', title: 'Invalid Card Number', description: 'Please enter a 16-digit card number.' });
            return;
        }

        const expiryParts = expiryDate.split(' / ');
        if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) {
            toast({ variant: 'destructive', title: 'Invalid Expiry Date', description: 'Please use MM / YY format.' });
            return;
        }
        
        if (cvc.length < 3 || cvc.length > 4) {
            toast({ variant: 'destructive', title: 'Invalid CVC', description: 'Please enter a valid 3 or 4-digit CVC.' });
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setPaymentSuccess(true);
        toast({
            title: "Payment Successful!",
            description: `Thank you for your payment for invoice ${invoiceId}.`,
        });
        
        setIsLoading(false);
    };

    if (!invoiceId) {
        return (
             <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (paymentSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                        <CardTitle className="text-3xl mt-4">Payment Successful</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-4">Thank you for your payment!</p>
                        <p className="text-sm text-muted-foreground">Invoice: <span className="font-mono font-bold">{invoiceId}</span></p>
                        <p className="text-sm text-muted-foreground mt-2">A confirmation has been sent to your email.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Secure Payment
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handlePaymentSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="invoice">Invoice ID</Label>
                            <Input id="invoice" value={invoiceId} disabled className="bg-muted" />
                        </div>

                        <div>
                            <Label htmlFor="name">Cardholder Name</Label>
                            <Input 
                                id="name"
                                placeholder="John Doe"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="card">Card Number</Label>
                            <div className="flex items-center gap-2 p-2 border rounded-md bg-background">
                                {cardBrand !== 'unknown' && cardBrand && (
                                    <img src={cardBrands[cardBrand]} alt={cardBrand} className="h-6" />
                                )}
                                <Input 
                                    id="card"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    className="border-0 focus-visible:ring-0 p-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input 
                                    id="expiry"
                                    placeholder="MM / YY"
                                    value={expiryDate}
                                    onChange={handleExpiryChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <div className="flex items-center gap-2">
                                    <Input 
                                        id="cvc"
                                        placeholder="123"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                        type="password"
                                        required
                                    />
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Pay Now
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
