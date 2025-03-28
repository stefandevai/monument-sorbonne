import sheetData from '$lib/data/donnees.xlsx';
import { read, utils } from "xlsx";

export const prerender = true;

export async function load({ params }) {
  const wb = read(sheetData);
  const data: string[] | any[] = wb.SheetNames.map(n => [n, utils.sheet_to_json(wb.Sheets[n])]);
  return Object.fromEntries(data);
}
