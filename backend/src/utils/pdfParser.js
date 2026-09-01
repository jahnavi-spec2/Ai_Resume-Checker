import pdf from "pdf-parse";

export async function extractTextFromPdf(buffer) {
  const data = await pdf(buffer);
  return data.text.trim();
}