export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "tm6cdyjt");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ipmykqap/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();

  return data.secure_url;
};
