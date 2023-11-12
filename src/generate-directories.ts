import { Destination, download } from "https://deno.land/x/download/mod.ts";
import AutomakerProps from "./interfaces/automaker.interface.ts";

const dir = './cars';

async function generateDirectories() {
  const automakers = JSON.parse(
    await Deno.readTextFile("./automakers/automakers.json")
  );
  await Deno.mkdir(dir);

  automakers.forEach(async (automaker: AutomakerProps) => {
    console.log(automaker.automaker)
    await Deno.mkdir(`${dir}/${automaker.automaker}`);

    try {
      const destination: Destination = {
        file: `${automaker.automaker}.png`,
        dir: `${dir}/${automaker.automaker}`,
      };
      const fileObj = await download(automaker.automakerLogo, destination);
    } catch (error) {
      console.log(error);
    }
  });
}

generateDirectories();
