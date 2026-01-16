export const uploadImage = (req, res) => {
  res.json({
    url: req.file.path,
    public_id: req.file.filename
  });
};
