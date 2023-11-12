import Car from "./entities/car.ts";
import { getImage } from "./getImage.ts";


const automakerAndCarPair: Array<Array<any>> = [];

const models2: Array<Array<any>> = [];
const features2: Array<Array<any>> = [];

async function getCarsDirectoryTree() {
  for await (const dirEntry of Deno.readDir("./cars")) {
    for await (const carDirEntry of Deno.readDir(`./cars/${dirEntry.name}/`)) {
      if (carDirEntry.isDirectory) {
        const structure = [[dirEntry.name, carDirEntry.name]];
        automakerAndCarPair.push(structure);
        models2.push([
          `./cars/${dirEntry.name}/${carDirEntry.name}/models.json`,
        ]);
        features2.push([
          `./cars/${dirEntry.name}/${carDirEntry.name}/features.json`,
        ]);
      }
    }
  }
}

await getCarsDirectoryTree();

for (let i = 0; i < automakerAndCarPair.length; i++) {
  const models = JSON.parse(await Deno.readTextFile(models2[i][0]));
  const currentCar = automakerAndCarPair[i][0][1];
  const currentAutomaker = automakerAndCarPair[i][0][0];
  const features = JSON.parse(await Deno.readTextFile(features2[i][0]));
  const image = await getImage(
    automakerAndCarPair[i][0][0],
    automakerAndCarPair[i][0][1]
  );
  const imageFile = new File([image], `${currentCar}.png`, {
    type: "image/png",
  });
  console.log(imageFile.name);

  for (let i = 0; i < models.length; i++) {
    // console.log(features)
    features;
    const name = models[i].modelname.replace(/ .*/, "");
    const year = models[i].modelname.replace("s*([S]+)$", "");
    const model = models[i].modelname;
    const featureSet = `f${i + 1}`;
    const transmission = eval(`features[3].${featureSet}`);
    const fuel = eval(`features[4].${featureSet}`);
    const power = eval(`features[5].${featureSet}`);
    const torque = eval(`features[6].${featureSet}`);

    const car = new Car({
      image: imageFile,
      name: name,
      model: model,
      year: year,
      transmission: transmission,
      fuel: fuel,
      power: power,
      torque: torque,
    });

    const formData = new FormData();

    formData.append("file", car.image, car.image.name);
    formData.append("name", car.name);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("transmission", car.transmission);
    formData.append("fuel", car.fuel);
    formData.append("power", car.power);
    formData.append("torque", car.torque);

    console.log(formData);

    fetch(`http://146.235.60.112:3333/api/cars/create/${currentAutomaker}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
}
