import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="cupcake">
      <head>
        {/* Favicon: place the file in /public/favicon.ico */}
        {/* <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" /> */}
        <link rel="shortcut icon" type="image/png" href="/image/eteclogo.png"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
