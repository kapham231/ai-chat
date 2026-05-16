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
        <label className="cursor-pointer border rounded-lg px-4 flex items-center justify-center">
            +

            <input
                type="file"
                hidden
                onChange={handleUpload}
            />
        </label>
    );
};

export default UploadButton;