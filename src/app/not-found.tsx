import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getNavigationData } from "@/ai/live-data";

export default async function NotFoundPage() {
  const navigation = await getNavigationData();

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <p className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-4">404</p>
        <h1 className="font-heading font-bold text-[40px] md:text-[64px] leading-[1.02] tracking-tight mb-5">
          Page Not Found
        </h1>
        <p className="font-serif text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10">
          The page you are looking for does not exist or has moved. Continue exploring Susinsight from the links below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            className="px-5 py-3 rounded-lg bg-brand-primary text-white font-heading font-bold text-xs uppercase tracking-widest hover:bg-brand-dark transition-colors"
          >
            Go Home
          </a>
          <a
            href="/stories"
            className="px-5 py-3 rounded-lg border border-stone-200 text-brand-dark font-heading font-bold text-xs uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            Browse Stories
          </a>
          <a
            href="/search"
            className="px-5 py-3 rounded-lg border border-stone-200 text-brand-dark font-heading font-bold text-xs uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            Search
          </a>
        </div>
      </main>

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
