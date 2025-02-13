import xlsx from "xlsx";

import { headers } from "../constants/data_fields.js";

export function convertXlsxToJson(buffer) {
  const workbook = xlsx.read(buffer, {
    type: "buffer",
    cellDates: true,
  });

  const data = [];

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const sheetJson = xlsx.utils.sheet_to_json(sheet, {
      skipHeader: true,
      skipHidden: true,
      header: headers,
    });

    const dataWithoutHeaders = sheetJson.filter(
      (item) =>
        typeof item.surname === "string" &&
        item.surname !== sheetName &&
        item.surname !== "STATUTORY TRAINING" &&
        item.surname !== "SURNAME" &&
        !!item.initials
    );

    const cleanData = dataWithoutHeaders.map((item) => ({
      department: sheetName,
      ...Object.fromEntries(
        Object.entries(item).filter(([key, value]) => {
          if (key === "surname") return true;
          if (key === "initials") return true;
          return value !== "X" && value !== "-";
        })
      ),
    }));

    data.push(...cleanData);
  });

  return data;
}
