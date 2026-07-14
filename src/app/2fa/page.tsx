import { Metadata } from 'next';
import TwoFaGenerator from './TwoFaGenerator';

export const metadata: Metadata = {
  title: 'Generator Kode 2FA — Toolinter',
  description:
    'Buat kode 2FA (TOTP) dari secret key secara online. 100% client-side, aman, dan gratis. Mendukung Google, Facebook, Discord, dan layanan lainnya.',
  robots: { index: false, follow: false },
};

export default function TwoFaPage() {
  return <TwoFaGenerator />;
}
