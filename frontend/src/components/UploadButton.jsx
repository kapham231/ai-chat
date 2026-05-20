import api from "../services/api";
import { toast } from "react-hot-toast";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const UploadButton = ({ onUploadSuccess }) => {
    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        const uploadPromises = files.map(async (file) => {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                return {
                    success: false,
                    fileName: file.name,
                    error: `File too large. Maximum size allowed is ${MAX_FILE_SIZE_MB}MB.`,
                };
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await api.post("/upload", formData);
                return { success: true, data: response.data.data };
            } catch (error) {
                const errMsg = error.response?.data?.message || `Failed to upload ${file.name}`;
                return { success: false, fileName: file.name, error: errMsg };
            }
        });

        toast.promise(
            Promise.all(uploadPromises).then((results) => {
                const failures = results.filter((r) => !r.success);
                const successes = results.filter((r) => r.success);

                successes.forEach((s) => {
                    if (onUploadSuccess) {
                        onUploadSuccess(s.data);
                    }
                });

                if (failures.length > 0) {
                    const failMsgs = failures.map((f) => `${f.fileName}: ${f.error}`).join(", ");
                    throw new Error(`Failed: ${failMsgs}`);
                }
                return `Uploaded ${successes.length} file(s) successfully!`;
            }),
            {
                loading: "Uploading file(s)...",
                success: (msg) => msg,
                error: (err) => err.message,
            }
        );
        
        // Reset input value to allow selecting same files again
        e.target.value = "";
    };

    return (
        <label className="cursor-pointer group flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-200 hover:border-blue-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>

            <input
                type="file"
                multiple
                hidden
                onChange={handleUpload}
            />
        </label>
    );
};

export default UploadButton;