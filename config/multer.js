import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extensionName = allowedTypes.test(
    path.extensionName(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extensionName && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed (JPEG, JPG or PNG)"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
