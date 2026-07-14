import RelatedTools from "@/components/related-tools";
import ToolFaq from "@/components/tool-faq";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <ToolFaq toolPath="/umkm/harga-jual" />
        <RelatedTools toolPath="/umkm/harga-jual" />
      </div>
    </>
  );
}
