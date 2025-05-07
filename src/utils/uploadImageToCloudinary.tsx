export async function uploadImageToCloudinary(
    file: File
): Promise<{ success: boolean; data: string }> {
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
            return { success: false, data: "Upload failed" };
        }

        const data = await response.json();
        return { success: true, data: data.secure_url };
    } catch (error) {
        return { success: false, data: "Upload failed" };
    }
}
