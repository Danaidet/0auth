import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "./lib/products";
import { AuthButtons } from "../components/auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = await getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <header className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">สินค้า</h1>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            data-testid="product"
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="mt-2 flex-1 text-sm text-gray-400">
              {product.description}
            </p>
            <p className="mt-4 text-2xl font-bold text-indigo-400">
              ${product.price.toLocaleString("en-US")}
            </p>
            {isLoggedIn && (
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="flex-1 rounded-lg bg-indigo-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-indigo-400"
                >
                  แก้ไข
                </Link>
                <Link
                  href={`/products/${product.id}/delete`}
                  className="flex-1 rounded-lg border border-red-400/40 px-4 py-2 text-center text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                >
                  ลบ
                </Link>
              </div>
            )}
          </article>
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">ไม่มีสินค้า</p>
        )}
      </div>
    </main>
  );
}