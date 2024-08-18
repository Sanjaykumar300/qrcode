import React, { useState } from "react";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrCode] = useState("");
  const [qrSize, setQrSize] = useState("");

  async function generateQR() {
    if (!qrdata || !qrSize) return; // Avoid generating QR code if data or size is missing
    setLoading(true);
    try {
      const size = parseInt(qrSize, 10);
      if (isNaN(size) || size <= 0) {
        alert("Please enter a valid size.");
        return;
      }
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQrCode() {
    if (!img) return; // Avoid downloading if no image is available
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading QR code:", error);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="QR Code" className="qr-code-image" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code
        </label>
        <input
          type="text"
          id="dataInput"
          value={qrdata}
          onChange={(e) => setQrCode(e.target.value)}
        />
        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 150)
        </label>
        <input
          type="text"
          id="sizeInput"
          placeholder="Enter Image Size"
          value={qrSize}
          onChange={(e) => setQrSize(e.target.value)}
        />
        <button
          className="generate-button"
          disabled={loading}
          onClick={generateQR}
        >
          Generate QR Code
        </button>
        <button
          className="download-button"
          onClick={downloadQrCode}
        >
          Download QR Code
        </button>
      </div>
      <footer className="footer">
        <p>
          Designed By <a href="">Sanjay@dev.in</a>
        </p>
      </footer>
    </div>
  );
};

export default QrCode;
