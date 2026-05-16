import api from "../services/api";

const UploadButton = () => {
    const handleUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const formData = new FormData();

            formData.append("file", file);

            const response = await api.post(
                "/upload",
                formData
            );

            console.log(
                "Uploaded:",
                response.data
            );

            alert("File uploaded!");
        } catch (error) {
            console.error(error);

            alert("Upload failed");
        }
    };

    return (
        <label className="cursor-pointer group flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-200 hover:border-blue-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>

            <input
                type="file"
                hidden
                onChange={handleUpload}
            />
        </label>
    );
};

export default UploadButton;