export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                filename: req.file.filename,
                path: req.file.path.replace(/\\/g, "/"),
                mimetype: req.file.mimetype,
                size: req.file.size,
            },
        });
    } catch (error) {
        console.error("Upload File Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};