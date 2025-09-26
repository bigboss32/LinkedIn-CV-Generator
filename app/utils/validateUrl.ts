export function validateLinkedinUrl(url: string): boolean {
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/i;
  return linkedinRegex.test(url.trim());
}
