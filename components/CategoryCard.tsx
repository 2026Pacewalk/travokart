import Link from "next/link";
import type { Category } from "@/lib/types";
import { categoryImage } from "@/lib/data";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/tour_category/${category.slug}`}
      className="group relative block rounded-2xl overflow-hidden h-56 card-lift"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={categoryImage(category)}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-extrabold text-lg leading-tight">{category.name}</h3>
        <p className="text-white/80 text-xs mt-0.5">
          {category.count} {category.count === 1 ? "Package" : "Packages"}
        </p>
      </div>
    </Link>
  );
}
