"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { updateProduct, deleteProduct } from "@/app/lib/products";

export async function updateProductAction(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await updateProduct(id, {
    title: String(formData.get("title")),
    price: Number(formData.get("price")),
    description: String(formData.get("description")),
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteProductAction(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await deleteProduct(id);

  revalidatePath("/");
  redirect("/");
}