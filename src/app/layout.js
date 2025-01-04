// import localFont from "next/font/local";
import "./globals.css";
import TawkToWidget from "../../components/TawkToWidget"

import {
  ClerkProvider
} from '@clerk/nextjs'




export const metadata = {
  title: "Ghau-Ghau Pet Adoption",
  description: "Pet adoption platform",
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider>
   


      <html lang="en">
        <body  className="font-acme">
 
          <TawkToWidget />
          {children}
        </body>
      </html>
      
    </ClerkProvider>
  );
}
