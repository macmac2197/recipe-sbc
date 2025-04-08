import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import recipesData from "../mocks/recipes.json";

export const metadata: Metadata = {
  title: "SBC Recipe App",
  description:
    "I hope to successfully complete this coding challenge, move forward to the next stage, and ultimately receive a job offer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider recipes={recipesData}>
      <html lang="en">
        <body style={{ margin: 0 }}>{children}</body>
      </html>
    </StoreProvider>
  );
}
