import { stripHtml } from "@/utils/stripHtml";
// export function formatDescriptionText(text: string, limit: number) {
//   const striped = stripHtml(text)!;
//   const originalText = text.split(striped);
//   const temp = text.split(striped)[1];
//   if (text.split(striped)[0] !== "" && text.split(striped)[1] !== "") {
//     if (striped.length > limit) {
//       const newText = striped.slice(0, limit) + "...";
//       originalText[1] = newText;
//       originalText.push(temp);
//       const finalText = originalText[0] + originalText[1] + originalText[2];
//       return finalText;
//     }
//   }
//   return text;
// }

export function formatDescriptionText(text: string, limit: number) {
  const striped = stripHtml(text)!;
  if (striped.length <= limit) {
    return text; // O text não precisa de truncagem
  }
  const originalText = text.split(striped);
  if (originalText[0] && originalText[1]) {
    const newText = striped.slice(0, limit) + "...";
    return originalText[0] + newText + originalText[1];
  }

  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }

  return text;
}
