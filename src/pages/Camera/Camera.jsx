import React, { useEffect, useRef, useState } from "react";
import "./Camera.css";
import { Link, useNavigate } from "react-router-dom";
import back_btn from "../../assets/images/buttin-icon-shrunk (1).svg";
import take_pic from "../../assets/images/image 225 (Traced).svg";
import outer_line from "../../assets/images/rect-outer-line.svg";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState();

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    };
    enableStream();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setCaptured(dataUrl);
    try {
      video.pause();
      const tracks = video.srcObject?.getTracks?.() || [];
      tracks.forEach((t) => t.stop());
    } catch {}
  };

  const acceptPicture = async () => {
    if (!captured) return;
    const base64 = captured.split(",")[1];
    setIsLoading(true);
    try {
      const body = { image: base64 };

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
        console.log("Selfie analyzed succesfully!");
        sessionStorage.setItem("demographics", JSON.stringify(json.data));
        navigate("/results", { state: { demographics: json.data } });
      } else {
        const errText = await response.text();
        console.error("Camera Upload Failed", response.status, errText);
      }
    } catch (error) {
      console.error("Error analyzing selfie", error);
    } finally {
      setIsLoading(false);
    }
  };

  const retakePicture = async () => {
    setCaptured(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Could not restart camera", err);
    }
  };

  return (
    <div className="camera-page">
      {!captured ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-feed"
        />
      ) : (
        <img src={captured} alt="Captured" className="camera-feed" />
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {!captured && !loading && (
        <div className="camera-overlay">
          <h3 className="overlay-title">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </h3>
          <p className="overlay-tips">
          <span> <img src={outer_line} alt="" /> NEUTRAL EXPRESSION </span> 
          <span> <img src={outer_line} alt="" /> FRONTAL POSE </span> 
          <span> <img src={outer_line} alt="" /> ADEQUATE LIGHTING </span> 
          </p>
        </div>
      )}

      {!captured ? (
        <div className="capture-wrapper">
          <span className="capture-text">TAKE PICTURE</span>
          <button className="capture-btn" onClick={takePicture}>
            <img className="capture-icon" src={take_pic} alt="" />
          </button>
        </div>
      ) : (
        <>
          <div className="toast-message">GREAT SHOT!</div>
          <div className="preview-controls">
            <span className="preview-label">Preview</span>
            <div className="preview-buttons">
              <button
                className="preview-btn use"
                onClick={acceptPicture}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Use This Photo"}
              </button>
              <button
                className="preview-btn retake"
                onClick={retakePicture}
                disabled={loading}
              >
                Retake
              </button>
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="analyzing-img">
            <p>Analyzing Image...</p>
            <div className="dots">
                 <span></span>
                    <span></span>
                    <span></span>
            </div>
        </div>
      )}

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

export default Camera;
