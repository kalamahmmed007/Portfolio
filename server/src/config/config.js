const config = {
  env: process.env.NODE_ENV || "development",

  server: {
    port: process.env.PORT || 5000
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "7d"
  },

  database: {
    uri: process.env.MONGO_URI
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    folder: "portfolio"
  },

  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFormats: ["jpg", "jpeg", "png", "webp"]
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100
  }
};

export default config;
