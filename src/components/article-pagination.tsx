import React from "react";

interface PaginationItem {
    slug: string;
    title: string;
}

export function ArticlePagination({ previous, next }: { previous?: PaginationItem | null, next?: PaginationItem | null }) {
    if (!previous && !next) return null;

    return (
        <nav className="border-y border-stone-200 mt-12 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div className="group cursor-pointer text-left">
                {previous ? (
                    <a href={`/stories/${previous.slug}`} className="block py-6 md:py-8 px-4 md:px-0 md:pr-8">
                        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">Previous</p>
                        <h4 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-all duration-300 leading-tight">
                            <span className="inline-block mr-2 transition-transform duration-300 group-hover:-translate-x-1.5">«</span>{previous.title}
                        </h4>
                    </a>
                ) : (
                    <div className="opacity-0 pointer-events-none h-full" aria-hidden="true" />
                )}
            </div>

            <div className="group cursor-pointer text-left md:text-right">
                {next ? (
                    <a href={`/stories/${next.slug}`} className="block py-6 md:py-8 px-4 md:px-0 md:pl-8">
                        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">Next</p>
                        <h4 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-all duration-300 leading-tight">
                            {next.title}<span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1.5">»</span>
                        </h4>
                    </a>
                ) : (
                    <div className="opacity-0 pointer-events-none h-full" aria-hidden="true" />
                )}
            </div>
        </nav>
    );
}
