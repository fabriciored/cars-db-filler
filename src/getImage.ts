export async function getImage(automaker: string, model: string) {
    for await (const f of Deno.readDir(`./cars/${automaker}/${model}`)) {
      if (!f.isFile) continue;
      const fileExtension = await f.name.split(".")[1];
      if (fileExtension == "png") {
        return await Deno.readFile(
          `./cars/${automaker}/${model}/${f.name}`
        );
      }
    }
  }