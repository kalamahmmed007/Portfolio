const ImageUploader = ({ onChange }) => {
  return (
    <label className="cursor-pointer rounded-xl border-2 border-dashed p-6 text-center">
      <input
        type="file"
        hidden
        onChange={(e) => onChange?.(e.target.files[0])}
      />
      <p className="text-sm text-gray-500">Click to upload image</p>
    </label>
  );
};

export default ImageUploader;
