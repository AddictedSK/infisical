export const removeTrailingSlash = (str: string) => {
  if (str === "/") return str;

  return str.endsWith("/") ? str.slice(0, -1) : str;
};

export const isValidPath = (val: string): boolean => {
  if (val.length === 0) return false;
  if (val === "/") return true;

  // Check for valid characters and no consecutive slashes
  const validPathRegex = /^[a-zA-Z0-9-_.:]+(?:\/[a-zA-Z0-9-_.:]+)*$/;
  return validPathRegex.test(val);
};

export const DistinguishedNameRegex =
  /^(?:(?:[a-zA-Z0-9]+=[^,+="<>#;\\\\]+)(?:(?:\\+[a-zA-Z0-9]+=[^,+="<>#;\\\\]+)*)(?:,(?:[a-zA-Z0-9]+=[^,+="<>#;\\\\]+)(?:(?:\\+[a-zA-Z0-9]+=[^,+="<>#;\\\\]+)*))*)?$/;

export const UserPrincipalNameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Truncates text to a specified maximum length, appending an ellipsis if trimmed.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Validates whether a URL is a safe local redirect path.
 */
export const isSafeRedirectUrl = (url: string): boolean => {
  if (!url || typeof url !== "string") return false;

  // Allow relative paths starting with /
  if (/[\u0000-\u001f\u007f]/.test(url)) return false;
  if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) {
    return true;
  }

  return false;
};
