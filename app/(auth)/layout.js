import { Inter } from "next/font/google";
import "../globals.css";
import ToastContext from "@/components/ToastContext";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Realtime Chat-App",
  description: "A next js Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}bg-purple-1`}>
        <Provider>
      <ToastContext/>
        {children}
        </Provider>
      </body>
    </html>
  );
}