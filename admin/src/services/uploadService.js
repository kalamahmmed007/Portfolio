import { api } from "./api";

export const uploadService = {
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data; // expected: { url: "uploaded-file-url" }
    },
};

