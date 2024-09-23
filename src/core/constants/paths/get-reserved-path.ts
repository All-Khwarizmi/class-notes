import { RESERVED_PATHS } from "./paths";

export function isValidHostname(hostname: string) {
  // Convert hostname to lowercase for case-insensitive comparison
  const lowercaseHostname = hostname.toLowerCase();

  // Check minimum and maximum length
  if (hostname.length < 3 || hostname.length > 63) {
    return false;
  }

  // Check if the hostname is in the reservedPaths array
  if (RESERVED_PATHS.includes(lowercaseHostname)) {
    return false;
  }

  // Check for valid characters (alphanumeric and hyphens)
  const validCharsRegex = /^[a-z0-9-]+$/;
  if (!validCharsRegex.test(lowercaseHostname)) {
    return false;
  }

  // Check that hostname doesn't start or end with a hyphen
  if (hostname.startsWith("-") || hostname.endsWith("-")) {
    return false;
  }

  // Check for consecutive hyphens
  if (hostname.includes("--")) {
    return false;
  }

  // Check for common unsafe patterns
  const unsafePatterns = [
    /admin/i,
    /mod(erator)?/i,
    /staff/i,
    /support/i,
    /official/i,
    /help/i,
    /info/i,
    /contact/i,
    /login/i,
    /signin/i,
    /signup/i,
    /register/i,
    /account/i,
    /billing/i,
    /payment/i,
    /reset/i,
    /password/i,
    /auth/i,
    /api/i,
    /dev(eloper)?/i,
    /test/i,
    /staging/i,
    /prod(uction)?/i,
  ];

  if (unsafePatterns.some((pattern) => pattern.test(lowercaseHostname))) {
    return false;
  }

  // Check for trademark infringement (example)
  const trademarks = ["google", "facebook", "twitter", "linkedin", "github"];
  if (trademarks.some((tm) => lowercaseHostname.includes(tm))) {
    return false;
  }

  // If all checks pass, return true
  return true;
}
