import React, { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import scan_img from "../../assets/images/shutter.svg";
import scan_black from "../../assets/images/sgutter-bg.svg";
import access_gallery from "../../assets/images/gallery.svg";
import "./Analyze.css";

const Analyze = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = String(reader.result);
        setPreview(dataUrl);
        uploadFileToServer(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFileToServer = async (imageDataUrl) => {
    setIsLoading(true);
    try {
      const body = { image: imageDataUrl };

      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        console.log("File Uploaded succesfully!");
        alert("Image analyzed succesfully!");
        setIsLoading(false);
        navigate("/results");
      } else {
        const errText = await response.text();
        console.error("File Upload Failed", response.status, errText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="sub-header">TO START ANALYSIS</div>

      <div className="analyze-page">
        {isLoading ? (
          <>

               <div className="preview-box">
              <div className="preview-title">Preview</div>
              <div className="preview-screen">
                {preview && <img src={preview} />}
              </div>
            </div>


            <div className="loading-wrapper">
              <div className="spin-stack-wrapper">
                <div className="spin-stack" aria-hidden="true">
                  <div className="diamond d1"></div>
                  <div className="diamond d2"></div>
                  <div className="diamond d3"></div>
                </div>
                <div className="status">
                  <h2 className="status-title">PREPARING YOUR ANALYSIS...</h2>
                  <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container">
            <div className="cameras">
              <div className="spin-stack" aria-hidden="true">
                <div className="diamond d1"></div>
                <div className="diamond d2"></div>
                <div className="diamond d3"></div>
              </div>
              <button className="camera-access">
                <img className="shutter-blk" src={scan_black} alt="" />
                <img className="shutter" src={scan_img} alt="" />
              </button>
              <p className="img-para left">
                ALLOW A.I <br /> TO SCAN YOUR FACE
              </p>
            </div>

            <div className="cameras">
              <div className="spin-stack" aria-hidden="true">
                <div className="diamond d1"></div>
                <div className="diamond d2"></div>
                <div className="diamond d3"></div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />

              <button className="camera-access" onClick={triggerFileInput}>
                <img className="gallery-img" src={access_gallery} alt="" />
              </button>
              <p className="img-para right">
                ALLOW A.I <br />
                ACCESS GALLERY
              </p>
            </div>

            <div className="preview-box">
              <div className="preview-title">Preview</div>
              <div className="preview-screen">
                {preview && <img src={preview} />}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="back-btn">
        <Link to="/">
          <button className="back-button">
            <img className="btn-img" src={back_btn} alt="" />
            BACK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Analyze;
