import RelatedTools from "@/components/related-tools";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath="/foto/resize-4x6" />
      </div>
    </>
  );
}
