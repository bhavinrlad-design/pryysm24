import Image from 'next/image';
import Link from 'next/link';

export function PrysmLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/images/logo.svg" alt="Prysm Logo" width={32} height={32} />
      <span className="font-bold text-xl text-primary">Prysm</span>
    </Link>
  );
}