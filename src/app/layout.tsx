import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "./ReduxProvider";
import AppInitializer from "./AppInitializer";  // import your initializer

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <head>
        {/* favicon and other head tags */}
        <title>ETEC SYSTEM</title>
        <link rel="shortcut icon" type="image/png" href="/image/eteclogo.png" />
      </head>
      <body>
        <ReduxProvider>
          <AppInitializer>
            {children}
          </AppInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
