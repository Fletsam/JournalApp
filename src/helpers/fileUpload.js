export const fileUpload = async (file) => {
  if (!file) throw new Error("No tenemos un archivo que subir");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dea3bexw3/upload";

  const formData = new FormData();
  formData.append("upload_preset", "JournalApp");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
