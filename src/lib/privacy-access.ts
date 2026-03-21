const BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/;

export const PRIVACY_ACCESS_COOKIE = "privacy_access";
export const PRIVACY_ACCESS_ENV_KEY = "PRIVACY_ACCESS_KEY_B64";

const SESSION_SALT = "cyanluna-privacy-session/v1";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function normalizeBase64Key(input: string | null | undefined): string | null {
  const trimmed = input?.trim();
  if (!trimmed) {
    return null;
  }

  const canonical = trimmed.replace(/-/g, "+").replace(/_/g, "/");
  const padded = canonical.padEnd(Math.ceil(canonical.length / 4) * 4, "=");

  if (!BASE64_RE.test(padded)) {
    return null;
  }

  try {
    atob(padded);
    return padded;
  } catch {
    return null;
  }
}

export function getConfiguredPrivacyKey(): string | null {
  return normalizeBase64Key(process.env[PRIVACY_ACCESS_ENV_KEY]);
}

export function hasConfiguredPrivacyKey(): boolean {
  return getConfiguredPrivacyKey() !== null;
}

async function sha256Base64Url(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return toBase64Url(new Uint8Array(digest));
}

export async function createPrivacySessionToken(): Promise<string | null> {
  const configuredKey = getConfiguredPrivacyKey();
  if (!configuredKey) {
    return null;
  }

  return sha256Base64Url(`${SESSION_SALT}:${configuredKey}`);
}

export async function isValidPrivacyKey(input: string | null | undefined): Promise<boolean> {
  const candidate = normalizeBase64Key(input);
  const configuredKey = getConfiguredPrivacyKey();

  return Boolean(candidate && configuredKey && candidate === configuredKey);
}

export async function isValidPrivacySessionToken(
  token: string | null | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const expected = await createPrivacySessionToken();
  return Boolean(expected && token === expected);
}

export function sanitizePrivacyNextPath(input: string | null | undefined): string {
  if (!input?.startsWith("/privacy")) {
    return "/privacy";
  }

  if (input.startsWith("/privacy/unlock")) {
    return "/privacy";
  }

  return input;
}
