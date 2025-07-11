import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <head>
        {/* favicon and other head tags */}
        <link rel="shortcut icon" type="image/png" href="/image/eteclogo.png" />
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
