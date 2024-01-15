import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(error);
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log({ newCabin });
  const isEditSession = Boolean(id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // create new cabin
  if (!isEditSession) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // edit cabin
  if (isEditSession) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(
      isEditSession ? "Cabin couldn't be edited" : "Cabin couldn't be created"
    );
  }

  if (hasImagePath) {
    return data;
  }

  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if file uploading is failed
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      `Updating cabin image is failed and the cabin wasn't be ${
        isEditSession ? "edited" : "created"
      }`
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin couldn't be deleted");
  }

  return data;
}
