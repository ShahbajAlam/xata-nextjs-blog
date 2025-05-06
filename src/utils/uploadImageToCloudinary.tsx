export async function uploadImageToCloudinary(
    file: File
): Promise<{ success: boolean; message: string }> {
    const cloudName = "dqid08knh";
    const uploadPreset = "blogapp";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            return { success: false, message: "Upload failed" };
        }

        const data = await response.json();
        return { success: true, message: data };
    } catch (error) {
        return { success: false, message: "Upload failed" };
    }
}
