

"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle, UserPlus } from 'lucide-react'
import Link from 'next/link'

const countryList = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AS', name: 'American Samoa' },
    { code: 'AD', name: 'Andorra' },
    { code: 'AO', name: 'Angola' },
    { code: 'AI', name: 'Anguilla' },
    { code: 'AQ', name: 'Antarctica' },
    { code: 'AG', name: 'Antigua and Barbuda' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AM', name: 'Armenia' },
    { code: 'AW', name: 'Aruba' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BB', name: 'Barbados' },
    { code: 'BY', name: 'Belarus' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BZ', name: 'Belize' },
    { code: 'BJ', name: 'Benin' },
    { code: 'BM', name: 'Bermuda' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'BA', name: 'Bosnia and Herzegovina' },
    { code: 'BW', name: 'Botswana' },
    { code: 'BR', name: 'Brazil' },
    { code: 'IO', name: 'British Indian Ocean Territory' },
    { code: 'VG', name: 'British Virgin Islands' },
    { code: 'BN', name: 'Brunei' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'BI', name: 'Burundi' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CA', name: 'Canada' },
    { code: 'CV', name: 'Cape Verde' },
    { code: 'KY', name: 'Cayman Islands' },
    { code: 'CF', name: 'Central African Republic' },
    { code: 'TD', name: 'Chad' },
    { code: 'CL', name: 'Chile' },
    { code: 'CN', name: 'China' },
    { code: 'CX', name: 'Christmas Island' },
    { code: 'CC', name: 'Cocos (Keeling) Islands' },
    { code: 'CO', name: 'Colombia' },
    { code: 'KM', name: 'Comoros' },
    { code: 'CG', name: 'Congo - Brazzaville' },
    { code: 'CD', name: 'Congo - Kinshasa' },
    { code: 'CK', name: 'Cook Islands' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'CI', name: 'Côte d’Ivoire' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CW', name: 'Curaçao' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czechia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'DM', name: 'Dominica' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egypt' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'GQ', name: 'Equatorial Guinea' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'EE', name: 'Estonia' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'FK', name: 'Falkland Islands' },
    { code: 'FO', name: 'Faroe Islands' },
    { code: 'FJ', name: 'Fiji' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GF', name: 'French Guiana' },
    { code: 'PF', name: 'French Polynesia' },
    { code: 'TF', name: 'French Southern Territories' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GM', name: 'Gambia' },
    { code: 'GE', name: 'Georgia' },
    { code: 'DE', name: 'Germany' },
    { code: 'GH', name: 'Ghana' },
    { code: 'GI', name: 'Gibraltar' },
    { code: 'GR', name: 'Greece' },
    { code: 'GL', name: 'Greenland' },
    { code: 'GD', name: 'Grenada' },
    { code: 'GP', name: 'Guadeloupe' },
    { code: 'GU', name: 'Guam' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'GG', name: 'Guernsey' },
    { code: 'GN', name: 'Guinea' },
    { code: 'GW', name: 'Guinea-Bissau' },
    { code: 'GY', name: 'Guyana' },
    { code: 'HT', name: 'Haiti' },
    { code: 'HN', name: 'Honduras' },
    { code: 'HK', name: 'Hong Kong SAR China' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IM', name: 'Isle of Man' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'JP', name: 'Japan' },
    { code: 'JE', name: 'Jersey' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KI', name: 'Kiribati' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'LA', name: 'Laos' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'LR', name: 'Liberia' },
    { code: 'LY', name: 'Libya' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MO', name: 'Macao SAR China' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MV', name: 'Maldives' },
    { code: 'ML', name: 'Mali' },
    { code: 'MT', name: 'Malta' },
    { code: 'MH', name: 'Marshall Islands' },
    { code: 'MQ', name: 'Martinique' },
    { code: 'MR', name: 'Mauritania' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'YT', name: 'Mayotte' },
    { code: 'MX', name: 'Mexico' },
    { code: 'FM', name: 'Micronesia' },
    { code: 'MD', name: 'Moldova' },
    { code: 'MC', name: 'Monaco' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'MS', name: 'Montserrat' },
    { code: 'MA', name: 'Morocco' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MM', name: 'Myanmar (Burma)' },
    { code: 'NA', name: 'Namibia' },
    { code: 'NR', name: 'Nauru' },
    { code: 'NP', name: 'Nepal' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NC', name: 'New Caledonia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NU', name: 'Niue' },
    { code: 'NF', name: 'Norfolk Island' },
    { code: 'KP', name: 'North Korea' },
    { code: 'MK', name: 'North Macedonia' },
    { code: 'MP', name: 'Northern Mariana Islands' },
    { code: 'NO', name: 'Norway' },
    { code: 'OM', name: 'Oman' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PW', name: 'Palau' },
    { code: 'PS', name: 'Palestinian Territories' },
    { code: 'PA', name: 'Panama' },
    { code: 'PG', name: 'Papua New Guinea' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PN', name: 'Pitcairn Islands' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RE', name: 'Réunion' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russia' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'WS', name: 'Samoa' },
    { code: 'SM', name: 'San Marino' },
    { code: 'ST', name: 'São Tomé & Príncipe' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SN', name: 'Senegal' },
    { code: 'RS', name: 'Serbia' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'SG', name: 'Singapore' },
    { code: 'SX', name: 'Sint Maarten' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SB', name: 'Solomon Islands' },
    { code: 'SO', name: 'Somalia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'GS', name: 'South Georgia & South Sandwich Islands' },
    { code: 'KR', name: 'South Korea' },
    { code: 'SS', name: 'South Sudan' },
    { code: 'ES', name: 'Spain' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'BL', name: 'St. Barthélemy' },
    { code: 'SH', name: 'St. Helena' },
    { code: 'KN', name: 'St. Kitts & Nevis' },
    { code: 'LC', name: 'St. Lucia' },
    { code: 'MF', name: 'St. Martin' },
    { code: 'PM', name: 'St. Pierre & Miquelon' },
    { code: 'VC', name: 'St. Vincent & Grenadines' },
    { code: 'SD', name: 'Sudan' },
    { code: 'SR', name: 'Suriname' },
    { code: 'SJ', name: 'Svalbard & Jan Mayen' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SY', name: 'Syria' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TJ', name: 'Tajikistan' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TL', name: 'Timor-Leste' },
    { code: 'TG', name: 'Togo' },
    { code: 'TK', name: 'Tokelau' },
    { code: 'TO', name: 'Tonga' },
    { code: 'TT', name: 'Trinidad & Tobago' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'TM', name: 'Turkmenistan' },
    { code: 'TC', name: 'Turks & Caicos Islands' },
    { code: 'TV', name: 'Tuvalu' },
    { code: 'UM', name: 'U.S. Outlying Islands' },
    { code: 'VI', name: 'U.S. Virgin Islands' },
    { code: 'UG', name: 'Uganda' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'VU', name: 'Vanuatu' },
    { code: 'VA', name: 'Vatican City' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'WF', name: 'Wallis & Futuna' },
    { code: 'EH', name: 'Western Sahara' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'ZW', name: 'Zimbabwe' },
];

const industries = [
    "Aerospace", "Automotive", "Consumer Goods", "Dental", "Education", 
    "Healthcare", "Hobbyist", "Industrial Manufacturing", "Jewelry", "Other"
];

export default function SignupPage() {
    const router = useRouter();
    const { signupWithEmail } = useAuth();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [numPrinters, setNumPrinters] = useState('');
    const [country, setCountry] = useState('');
    const [industry, setIndustry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            toast({
                variant: 'destructive',
                title: 'Passwords do not match',
                description: 'Please re-enter your passwords.',
            });
            setIsLoading(false);
            return;
        }

        const success = await signupWithEmail({
            name, email, password, companyName, numPrinters, country, industry
        });

        if (success) {
            setSignupSuccess(true);
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
        } else {
             toast({
                variant: 'destructive',
                title: 'Signup Failed',
                description: 'This email may already be in use or there was a server error.',
            });
        }
        
        setIsLoading(false);
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', padding: '1rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
       <div style={{width: '100%', maxWidth: '32rem'}}>
            {/* Header with Logo */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem'}}>
                <Link href="/" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', textDecoration: 'none'}} prefetch={false}>
                    <div style={{height: '3.5rem', width: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: '#004B8D', padding: '0.5rem'}}>
                        {/* Pryysm Logo - Replace with your actual logo */}
                        <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%'}} xmlns="http://www.w3.org/2000/svg">
                            {/* Main 'P' Shape with 3D effect */}
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor: '#E6A635', stopOpacity: 1}} />
                                    <stop offset="100%" style={{stopColor: '#FFD966', stopOpacity: 1}} />
                                </linearGradient>
                            </defs>
                            {/* 'P' Letter with 3D effect */}
                            <path d="M 30 20 L 30 80 L 50 80 Q 65 80 65 65 Q 65 50 50 50 L 30 50" stroke="url(#logoGradient)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Accent dot representing 3D printing */}
                            <circle cx="55" cy="70" r="4" fill="url(#logoGradient)" />
                        </svg>
                    </div>
                </Link>
                <h1 style={{fontSize: '1.875rem', fontWeight: 700, color: '#004B8D', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', textAlign: 'center'}}>
                    Create Your Pryysm Account
                </h1>
                <p style={{fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>by 3D Prodigy</p>
            </div>
            
            {signupSuccess ? (
                <div style={{backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem', textAlign: 'center'}}>
                    <CheckCircle style={{height: '4rem', width: '4rem', color: '#10b981', margin: '0 auto', marginBottom: '1rem'}} />
                    <h1 style={{fontSize: '1.875rem', fontWeight: 700, color: '#004B8D', marginTop: '1rem', marginBottom: '0.5rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Welcome, {name}!</h1>
                    <p style={{marginTop: '0.5rem', color: '#6B7280', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
                        Your account has been created successfully.
                    </p>
                    <p style={{fontSize: '0.875rem', color: '#6B7280', marginTop: '1rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Redirecting you to your dashboard...</p>
                </div>
            ) : (
                <div style={{backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem'}}>
                    {/* Card Header */}
                    <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                        <h2 style={{fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Get Started</h2>
                        <p style={{fontSize: '0.875rem', color: '#6B7280', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Join Pryysm and take control of your 3D print farm.</p>
                    </div>

                    {/* Form Container - Scrollable */}
                    <form onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.5rem'}}>
                        {/* Full Name */}
                        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Full Name</label>
                            <input type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827'}} />
                        </div>

                        {/* Email */}
                        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                            <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Email Address</label>
                            <input type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827'}} />
                        </div>

                        {/* Company Name & Printers - 2 Column */}
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Company Name</label>
                                <input type="text" placeholder="Your Company Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827'}} />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>No. of Printers</label>
                                <input type="number" placeholder="e.g., 5" value={numPrinters} onChange={(e) => setNumPrinters(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827'}} />
                            </div>
                        </div>

                        {/* Country & Industry - 2 Column */}
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Country</label>
                                <select value={country} onChange={(e) => setCountry(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827', cursor: 'pointer'}}>
                                    <option value="">Select country...</option>
                                    {countryList.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Industry</label>
                                <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827', cursor: 'pointer'}}>
                                    <option value="">Select industry...</option>
                                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Password & Confirm - 2 Column */}
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Password</label>
                                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827'}} />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <label style={{fontSize: '0.875rem', fontWeight: 600, color: '#111827', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>Confirm Password</label>
                                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{padding: '0.625rem 0.75rem', fontSize: '0.875rem', border: '1px solid #D1D5DB', borderRadius: '0.375rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', backgroundColor: 'white', color: '#111827'}} />
                            </div>
                        </div>
                        
                        {/* Create Account Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            style={{width: '100%', padding: '0.625rem 1rem', marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'white', backgroundColor: isLoading ? '#9CA3AF' : '#004B8D', border: 'none', borderRadius: '0.375rem', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s ease', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}
                        >
                            {isLoading ? <Loader2 style={{height: '1rem', width: '1rem', animation: 'spin 1s linear infinite'}} /> : <UserPlus style={{height: '1rem', width: '1rem'}} />}
                            Create Account
                        </button>
                    </form>
                </div>
            )}
        </div>

        {/* Footer */}
        <p style={{textAlign: 'center', fontSize: '0.875rem', color: '#6B7280', marginTop: '2rem', fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'}}>
            &copy; {new Date().getFullYear()} Pryysm by 3D Prodigy.
        </p>

        <style>{`
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
  )
}
