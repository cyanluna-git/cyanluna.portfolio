import { timingSafeEqual } from "node:crypto";

const BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/;
const BEARER_RE = /^Bearer\s+(\S+)$/i;

export const ADMIN_UPLOAD_ENV_KEY = "ADMIN_UPLOAD_KEY_B64";

function normalizeBase64Key(input: string | null | undefined): string | null {
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

function getConfiguredAdminKey(): string | null {
  return normalizeBase64Key(process.env[ADMIN_UPLOAD_ENV_KEY]);
}

export function hasConfiguredAdminKey(): boolean {
  return getConfiguredAdminKey() !== null;
}

export function verifyAdminToken(authHeaderValue: string | null): boolean {
  try {
    const match = BEARER_RE.exec(authHeaderValue ?? "");
    if (!match) {
      return false;
    }

    const rawToken = match[1];
    const candidate = normalizeBase64Key(rawToken);
    const configured = getConfiguredAdminKey();

    if (!candidate || !configured) {
      return false;
    }

    const candidateBuf = Buffer.from(candidate, "utf8");
    const configuredBuf = Buffer.from(configured, "utf8");

    if (candidateBuf.byteLength !== configuredBuf.byteLength) {
      timingSafeEqual(configuredBuf, configuredBuf); // dummy same-length comparison
      return false;
    }

    return timingSafeEqual(candidateBuf, configuredBuf);
  } catch {
    return false;
  }
}
