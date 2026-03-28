import { redirect } from "next/navigation";

export default async function PrivacyUnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  await searchParams;
  redirect("/privacy");
}
