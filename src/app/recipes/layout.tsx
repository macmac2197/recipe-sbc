import Header from "@/components/Header";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ margin: "20px 60px" }}>{children}</main>
    </>
  );
}
