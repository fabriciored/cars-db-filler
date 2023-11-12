export async function getImage(automaker: string, model: string) {
    for await (const entry of Deno.readDir(`./cars/${automaker}/${model}`)) {
      if (!entry.isFile) continue;
      const fileExtension = await entry.name.split(".")[1];
      if (fileExtension == "png") {
        return await Deno.readFile(
          `./cars/${automaker}/${model}/${entry.name}`
        );
      }
    }
  }