import './globals.css';

export const metadata = {
  title: 'Oracle of Power — The 48 Laws',
  description: 'Consult the mythological Oracle of Power. Ask any question and receive strategic wisdom drawn from the 48 Laws of Power, delivered by an immortal advisor from Mount Olympus.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Oracle of Power — The 48 Laws',
    description: 'Consult the mythological Oracle of Power for Machiavellian wisdom.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
