async function fillAutomakers() {
  for await (const dirEntry of Deno.readDir("./cars")) {
    console.log(dirEntry.name);

    for await (const subDirEntry of Deno.readDir(`./cars/${dirEntry.name}`)) {
      console.log(subDirEntry.name);
      const automaker = dirEntry.name;
      const imagePath = `./cars/${dirEntry.name}/${subDirEntry.name}`;
      const image = await Deno.readFile(imagePath)
      const imageFile = new File([image], `${automaker}.png`, {
        type: "image/png",
      });

      const form = new FormData();

      form.append("name", automaker);
      form.append("file", imageFile, imageFile.name);

      fetch(`http://146.235.60.112:3333/api/automakers/create/`, {
        method: "POST",
        body: form,
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
  }
}

fillAutomakers();
