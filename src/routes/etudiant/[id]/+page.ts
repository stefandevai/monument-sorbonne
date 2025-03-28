import { error } from '@sveltejs/kit';
import { read, utils } from "xlsx";
import sheetData from '$lib/data/donnees.xlsx';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const id = parseInt(params.id);

  if (isNaN(id) || id < 0) {
    return error(400, 'Invalid id');
  }

  const wb = read(sheetData);
  const dataRaw: string[] | any[] | undefined = wb.SheetNames.map(n => [n, utils.sheet_to_json(wb.Sheets[n])]);

  if (!dataRaw) {
    return error(404, 'Not found');
  }

  const dataObj = Object.fromEntries(dataRaw);
  const data = dataObj['Feuille 1'];

  if (!data) {
    return error(404, 'Not found');
  }

  const row = data[id];

  console.log(row);

  if (!row) {
    return error(404, 'Not found');
  }

  return {
    data: row,
  };
};
