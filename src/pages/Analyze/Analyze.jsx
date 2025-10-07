import React, { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import scan_img from "../../assets/images/shutter.svg";
import scan_black from "../../assets/images/sgutter-bg.svg";
import access_gallery from "../../assets/images/gallery.svg";
import outer_line from "../../assets/images/rect-outer-line.svg";
import "./Analyze.css";

const Analyze = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [access, setAccess] = useState(false);
  const [allowAccess, setAllowAccess] = useState(false);
  const videoRef = useRef(null);
  const [loadingType, isLoadingType] = useState("");

  const handleAllow = async () => {
    setAccess(false);
    isLoadingType("camera");
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setAllowAccess(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/camera");
      }, 1500);
    } catch (err) {
      console.log("Camera access denied");
      setAllowAccess(false);
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    isLoadingType("gallery");
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = String(reader.result);
        setPreview(dataUrl);
        const base64 = dataUrl.split(",")[1];
        uploadFileToServer(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFileToServer = async (imagebase64) => {
    setIsLoading(true);
    try {
      const body = { image: imagebase64 };

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
        const json = await response.json();
        console.log("File Uploaded succesfully!");
        alert("Image analyzed succesfully!");
        setIsLoading(false);
        sessionStorage.setItem("demographics", JSON.stringify(json.data))
        navigate("/results", { state: { demographics: json.data } });
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
        {isLoading && loadingType === "camera" && (
          <>
            <div className="camera-loader">
              <div className="loading-wrapper">
                <div className="spin-stack-wrapper">
                  <div className="spin-stack" aria-hidden="true">
                    <div className="diamond d1"></div>
                    <div className="diamond d2"></div>
                    <div className="diamond d3"></div>

                    


                    <button className="camera-access">
                      <img className="shutter-blk" src={scan_black} alt="" />
                      <img className="shutter" src={scan_img} alt="" />
                    </button>
                    <h2 className="camera-load-title">SETTING UP YOUR CAMERA...</h2>
                  </div>
                </div>
                <h3 className="load-camera-tip">TO GET BETTER RESULTS MAKE SURE TO HAVE</h3>
                <div className="loading-tips">
                 <img src={outer_line} alt="" /> <span>Neutral Expression</span>
                 <img src={outer_line} alt="" /> <span>Frontal Pose</span>
                 <img src={outer_line} alt="" /> <span>Adequate Lighting</span>
                </div>
              </div>
            </div>
          </>
        )}

        {isLoading && loadingType === "gallery" && (
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
        )}

        {!isLoading && (
          <div className="container">
            <div className="cameras">
              <div className="spin-stack" aria-hidden="true">
                <div className="diamond d1"></div>
                <div className="diamond d2"></div>
                <div className="diamond d3"></div>
              </div>
              <button className="camera-access" onClick={() => setAccess(true)}>
                <img className="shutter-blk" src={scan_black} alt="" />
                <img className="shutter" src={scan_img} alt="" />
              </button>
              <p className="img-para left">
                ALLOW A.I <br /> TO SCAN YOUR FACE
              </p>
            </div>

            {access && (
              <div className="access-overlay" role="dialog" aria-modal="true">
                <div className="access-box">
                  <h3 className="access-title">
                    ALLOW A.I TO ACCESS YOUR CAMERA
                  </h3>

                  <div className="access-divider" />

                  <div className="access-actions">
                    <button
                      type="button"
                      className="access-btn access-deny"
                      onClick={() => setAccess(false)}
                    >
                      Deny
                    </button>

                    <button
                      type="button"
                      className="access-btn access-allow"
                      onClick={handleAllow}
                    >
                      Allow
                    </button>
                  </div>
                </div>
              </div>
            )}

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
