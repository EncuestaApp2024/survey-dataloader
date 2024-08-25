import * as fs from "fs";
import * as path from "path";
import csv from "csvtojson";
import { firestoreService } from "./services/firestore.service";

const availablesDirs = [
  "coymolacheAlto",
  "esmeraldaPuntaHermosa",
  "laCuadratura",
  "pilancones",
  "tingo",
];

const subDir = availablesDirs[4];
const csvDir = path.join(__dirname, `data/${subDir}`);

type jsonData = { [key: string]: string | number | boolean | jsonData };

const cleanSpecialChars = (str: string) => {
  // camel case
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  str = str.replace(/á/g, "a");
  str = str.replace(/é/g, "e");
  str = str.replace(/í/g, "i");
  str = str.replace(/ó/g, "o");
  str = str.replace(/ú/g, "u");
  str = str.replace(/[^a-zA-Z0-9]/g, "");
  str = str.replace(/\s/g, "");
  return str;
};

fs.readdir(csvDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(async (file) => {
    const filePath = path.join(csvDir, file);
    let fileName = path.basename(file, ".csv");
    fileName = cleanSpecialChars(fileName);
    const jsonDataSet = await csv().fromFile(filePath);
    // firestore.collection(collection).doc(file).set({ data: json });
    let foundDocuments = 0;

    jsonDataSet.forEach(async (survey: any) => {
      let ID = undefined;
      const DNI = survey["dni"];
      delete survey["apellido paterno"];
      delete survey["apellido materno"];
      delete survey["nombre"];
      delete survey["n°"];
      delete survey["dni"];

      let addDataToSurvey: jsonData = {};
      addDataToSurvey[fileName] = survey;

      try {
        const surveysCloud = await firestoreService.get("surveys", {
          "identity.dni": DNI,
          // "isDeleted": true,
        });
        if (surveysCloud.length === 0) return;

        let docCloud = surveysCloud[0];
        ID = docCloud["id"];

        firestoreService.patch("surveys", ID, addDataToSurvey);
        foundDocuments++;
      } catch (error) {
        console.error("ERROR", error);
      }

      console.log(fileName, foundDocuments, "loaded");
    });
  });
});
