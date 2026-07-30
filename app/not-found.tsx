import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="container-tk py-24 text-center">
      <div className="text-[100px] font-extrabold leading-none text-gradient">404</div>
      <h1 className="text-2xl font-extrabold text-ink mt-2">Page Not Found</h1>
      <p className="text-muted mt-2 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-7 flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn btn-primary">Back Home <ArrowRight width={18} height={18} /></Link>
        <Link href="/tours" className="btn btn-outline">Browse Tours</Link>
      </div>
    </section>
  );
}
