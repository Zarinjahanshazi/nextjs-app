export const metadata = {
  title: "GRAAHO GitOps Demo",
  description: "Next.js frontend for the Argo CD on EKS demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
