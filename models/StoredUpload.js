import mongoose from "mongoose";

const StoredUploadSchema = new mongoose.Schema(
  {
    folder: { type: String, required: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export default mongoose.models.StoredUpload ||
  mongoose.model("StoredUpload", StoredUploadSchema);
