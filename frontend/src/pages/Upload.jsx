import { useRef, useState } from "react";
import { Camera, UploadCloud, ImagePlus, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CameraCapture from "../components/CameraCapture";
import { useCooksy } from "../context/CooksyContext";
import { analyzeIngredients } from "../services/api";

function Upload() {
  const fileInputRef = useRef(null);
  const { setUploadedImage, setIngredients } = useCooksy();
  const [showCamera, setShowCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();

  const handleFile = (file) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  const preview = URL.createObjectURL(file);

  setSelectedImage({
    file,
    preview,
  });

  setUploadedImage({
    file,
    preview,
  });
};

  const handleInputChange = (event) => {
    handleFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    handleFile(event.dataTransfer.files[0]);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleAnalyze = async () => {
  if (!selectedImage) return;

  try {
    setIsAnalyzing(true);

    const response = await analyzeIngredients(selectedImage.file);

    const ingredientNames = response.data.ingredients.map(
      (ingredient) => ingredient.name
    );

    setIngredients(ingredientNames);

    navigate("/ingredients");
  } catch (error) {
    console.error("Ingredient analysis failed:", error);
    alert("Failed to analyze ingredients. Please try again.");
  } finally {
    setIsAnalyzing(false);
  }
};

  return (
    <section className="upload-page">
      <div className="upload-container">

        <div className="upload-heading">
          <span className="upload-eyebrow">STEP 2 · INGREDIENT SCAN</span>

          <h1>
            Show us what
            <span>you've got.</span>
          </h1>

          <p>
            Take a photo or upload an image of your ingredients.
            Cooksy's AI will identify them for you.
          </p>
        </div>

        {!selectedImage ? (
          <div
            className={`upload-box ${isDragging ? "dragging" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="upload-icon">
              <UploadCloud size={30} />
            </div>

            <h2>Drop your ingredients here</h2>

            <p>or choose one of the options below</p>

            <div className="upload-actions">

              <button
                className="upload-action primary-upload"
                onClick={() => setShowCamera(true)}
                >
                <Camera size={19} />
                Take a photo
                </button>

              <button
                className="upload-action"
                onClick={() => fileInputRef.current.click()}
              >
                <ImagePlus size={19} />
                Browse files
              </button>

            </div>

            <span className="upload-hint">
              JPG, PNG or WEBP · Maximum 10MB
            </span>

            

            {/* Normal file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="preview-card">

            <div className="preview-header">
              <div>
                <span className="preview-label">SELECTED IMAGE</span>
                <h2>Ready to analyze</h2>
              </div>

              <button
                className="remove-image"
                onClick={removeImage}
                aria-label="Remove image"
              >
                <X size={18} />
              </button>
            </div>

            <img
              src={selectedImage.preview}
              alt="Selected ingredients"
              className="image-preview"
            />

            <button
              className="primary-button analyze-button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Ingredients"}
              {!isAnalyzing && <ArrowRight size={18} />}
            </button>

          </div>
        )}

      </div>
      {showCamera && (
        <CameraCapture
            onCapture={(file) => {
            handleFile(file);
            setShowCamera(false);
            }}
            onClose={() => setShowCamera(false)}
        />
        )}
    </section>
  );
}

export default Upload;