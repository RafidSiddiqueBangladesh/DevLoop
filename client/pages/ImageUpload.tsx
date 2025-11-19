import { Header } from "@/components/Header";
import { useTranslation } from "@/lib/useTranslation";
import { useState } from "react";
import { Upload, X, Check } from "lucide-react";

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  type: "receipt" | "label" | "food-photo";
  uploadDate: string;
  size: number;
}

export default function ImageUpload() {
  const { t } = useTranslation();
  const [uploadType, setUploadType] = useState<
    "receipt" | "label" | "food-photo"
  >("receipt");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([
    {
      id: "1",
      name: "Market Receipt - Jan 15",
      url: "https://via.placeholder.com/300x200?text=Receipt",
      type: "receipt",
      uploadDate: "2024-01-15",
      size: 245,
    },
    {
      id: "2",
      name: "Milk Label",
      url: "https://via.placeholder.com/300x200?text=Label",
      type: "label",
      uploadDate: "2024-01-14",
      size: 156,
    },
    {
      id: "3",
      name: "Fresh Tomatoes",
      url: "https://via.placeholder.com/300x200?text=Tomatoes",
      type: "food-photo",
      uploadDate: "2024-01-13",
      size: 512,
    },
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = () => {
          const newImage: UploadedImage = {
            id: Date.now().toString(),
            name: file.name,
            url: reader.result as string,
            type: uploadType,
            uploadDate: new Date().toISOString().split("T")[0],
            size: Math.round(file.size / 1024),
          };
          setUploadedImages([newImage, ...uploadedImages]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const deleteImage = (id: string) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id));
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "receipt":
        return "Food Receipt";
      case "label":
        return "Food Label";
      case "food-photo":
        return "Food Photo";
      default:
        return "Image";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold">Upload Images</h1>
            <p className="text-muted-foreground mt-2">
              Upload food receipts, labels, and photos for tracking
            </p>
          </div>

          {/* Upload Type Selection */}
          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Upload Type</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  value: "receipt" as const,
                  label: "Food Receipt",
                  desc: "Shopping receipts",
                },
                {
                  value: "label" as const,
                  label: "Food Label",
                  desc: "Product labels",
                },
                {
                  value: "food-photo" as const,
                  label: "Food Photo",
                  desc: "Food photos",
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    uploadType === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="uploadType"
                    value={option.value}
                    checked={uploadType === option.value}
                    onChange={(e) =>
                      setUploadType(e.target.value as typeof uploadType)
                    }
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {option.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`rounded-xl border-2 border-dashed p-12 transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <Upload className="w-8 h-8 text-primary" />
              </div>

              <div>
                <p className="text-lg font-semibold">
                  Drag and drop your files here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, PDF (Max 10MB)
              </p>

              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:shadow-lg transition-all cursor-pointer"
              >
                Select Files
              </label>
            </div>
          </div>

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <div className="rounded-xl bg-card border border-border p-6">
              <h2 className="text-lg font-bold mb-4">
                Uploaded Images ({uploadedImages.length})
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
                  >
                    {/* Image */}
                    <div className="relative w-full h-40 bg-card/50 overflow-hidden">
                      {image.url.startsWith("data:image") ||
                      image.url.includes("placeholder") ? (
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground">
                            PDF Document
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => deleteImage(image.id)}
                        className="absolute top-2 right-2 p-1 rounded-lg bg-destructive/80 text-white hover:bg-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-3 space-y-2">
                      <p className="text-sm font-medium truncate">
                        {image.name}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="px-2 py-1 rounded bg-accent">
                          {getTypeLabel(image.type)}
                        </span>
                        <span>{image.size} KB</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {image.uploadDate}
                      </p>

                      {/* Success Indicator */}
                      <div className="flex items-center gap-1 text-xs text-primary pt-1">
                        <Check className="w-3 h-3" />
                        <span>Uploaded</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage Tips */}
          <div className="rounded-xl bg-card/50 border border-border p-6">
            <h2 className="text-lg font-bold mb-4">
              Tips for Better Recognition
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Use clear, well-lit photos</li>
              <li>✓ For receipts, ensure all text is legible</li>
              <li>✓ For food labels, capture nutritional information</li>
              <li>✓ For food photos, include scale reference if possible</li>
              <li>✓ Avoid shadows and reflections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
