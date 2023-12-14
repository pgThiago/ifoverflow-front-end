export const stripHtml = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const text =
    doc.body.textContent !== "undefined" ? doc.body.textContent! : "";
  return text;
};
