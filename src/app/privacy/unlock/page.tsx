import { hasConfiguredPrivacyKey, sanitizePrivacyNextPath } from "@/lib/privacy-access";
import PrivacyUnlockClient from "./PrivacyUnlockClient";

export default async function PrivacyUnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <PrivacyUnlockClient
      nextPath={sanitizePrivacyNextPath(next)}
      configured={hasConfiguredPrivacyKey()}
    />
  );
}
