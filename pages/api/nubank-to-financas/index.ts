import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import csv from "csvtojson";
import moment from "moment";
import Papa from "papaparse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  //transformando em json
  let jsonData = await csv().fromFile(
    `D:/Users/Yasmin/Documentos/Code/scripts/pages/api/nubank-to-financas/files/rawFile/nubank.csv`
  );

  //removendo pagamentos
  for (const obj of jsonData) {
    if (obj.title === "Pagamento recebido") {
      const index = jsonData.indexOf(obj);
      if (index > -1) {
        jsonData.splice(index, 1);
      }
    }
  }

  //formatar
  const filesParsed = jsonData.map(function (row) {
    const date = moment(row.date, "YYYY-MM-DD").format("DD/MM/YYYY");

    return {
      title: row.title,
      amount: row.amount,
      date: date,
      category: "",
      subcategory: "",
      bank: "nubank",
      bank2: "nubank",
    };
  });

  //transformar em csv

  const file = Papa.unparse(filesParsed);

  //salvar arquivo

  fs.writeFileSync("nubankFormatado.csv", file);
  res.status(200).json("Done!");
}
