import { ImageUploadProps } from "@/types";

export default function ImageUpload({ setFileInput }: ImageUploadProps) {
    return (
        <div className="flex flex-col gap-2 basis-1/2">
            <label htmlFor="image">Cover Image (Optional)</label>
            <input
                id="image"
                type="file"
                accept="image/*"
                className="file-input file-input-md file-input-info w-full"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFileInput(file);
                }}
            />
        </div>
    );
}
