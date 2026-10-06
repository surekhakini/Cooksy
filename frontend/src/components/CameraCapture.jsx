import { useEffect, useRef, useState } from "react";
import { Camera, X, RotateCcw } from "lucide-react";

function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraError, setCameraError] = useState("");
  const [facingMode, setFacingMode] = useState("environment");

  const startCamera = async () => {
    try {
      setCameraError("");

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(
        "Unable to access camera. Please allow camera permission."
      );
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video) return;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File(
        [blob],
        `cooksy-photo-${Date.now()}.jpg`,
        {
          type: "image/jpeg",
        }
      );

      onCapture(file);
    }, "image/jpeg", 0.9);
  };

  const switchCamera = () => {
    setFacingMode((current) =>
      current === "environment" ? "user" : "environment"
    );
  };

  return (
    <div className="camera-overlay">
      <div className="camera-modal">

        <div className="camera-header">
          <div>
            <span className="preview-label">CAMERA</span>
            <h2>Take a photo</h2>
          </div>

          <button
            className="remove-image"
            onClick={onClose}
            aria-label="Close camera"
          >
            <X size={18} />
          </button>
        </div>

        {cameraError ? (
          <div className="camera-error">
            <Camera size={30} />
            <p>{cameraError}</p>
            <button
              className="upload-action primary-upload"
              onClick={startCamera}
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="camera-preview">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />
            </div>

            <div className="camera-controls">
              <button
                className="camera-switch"
                onClick={switchCamera}
                title="Switch camera"
              >
                <RotateCcw size={20} />
              </button>

              <button
                className="capture-button"
                onClick={capturePhoto}
                aria-label="Capture photo"
              >
                <Camera size={26} />
              </button>

              <div className="camera-control-spacer" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;