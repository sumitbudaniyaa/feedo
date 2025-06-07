import "./qr.css";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import download from "downloadjs";
import { Pipette } from "lucide-react";

const QR = () => {
  const { restaurant } = useOutletContext();
  if (!restaurant) {
    return <div>Loading QR data...</div>;
  }
  const qr = restaurant.qr;

  const [color, setColor] = useState("#ba4646");

  const [isdark, setisdark] = useState(true);

  const handleColor = (e) => {
    setColor(e);
  };

  const checkcolor = (e) => {
    const hex = e.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (luminance < 128) {
    setisdark(true);
  } else setisdark(false);
  };

  const [colorchange, setcolorchange] = useState(false);

  const handleDownload = async (template) => {
    const element = document.querySelector(template);
    const canvas = await html2canvas(element);
    const imgDataURL = await canvas.toDataURL("image/png");
    download(imgDataURL, "qr.png", "image/png");
  };

  return (
    <div className="qrpage">
      <ToastContainer theme="dark" autoClose={2000} position="bottom-right" />

      <div className="qr-header">
        <h2>My QR Code</h2>
      </div>

      <div className="qr-guide">
        <h4>Instructions to use</h4>

        <ul>
          <li>
            Use the color picker <Pipette fill="cyan" fillOpacity={20} strokeWidth={1}/> below to choose your preferred color. This
            allows you to match the QR codes with your brand or aesthetic.
          </li>
          <li>
            Once you're happy with the color customization, click the Download
             button <Download size={"1.1rem"} />  to save the QR codes to your device.
          </li>
          <li>Print or display the QR codes on your tables.</li>
          <li>
            When scanned, these QR codes will automatically redirect users to{" "}
            <strong>your user portal</strong>, providing them with easy and
            instant access.
          </li>
        </ul>
      </div>

      <div className="qrs">
        <button
          className="color-picker-btn"
          onClick={() => setcolorchange(!colorchange)}
        >
          {" "}
          <Pipette fill="cyan" fillOpacity={20} strokeWidth={1} />
        </button>

        {colorchange ? (
          <HexColorPicker
            className="color-picker"
            onChange={(e) => {
              handleColor(e), checkcolor(e)
            }}
          />
        ) : (
          ""
        )}

        <div className="feedo-rect-qr">
          <div className="rect-qr" style={{ backgroundColor: color }}>
            <div className="qr">
              <img src={qr} alt="Restaurant QR Code" />
              <h3 style={isdark ? { color: "#FFFFFF" } : {}}>
                Scan to order food
              </h3>
              <p style={isdark ? { color: "#FFFFFF" } : {}}>
                powered by <strong>feedo.</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload(".rect-qr")}
            className="download-btn"
          >
            <Download size={"1.2rem"} />
          </button>
        </div>

        <div className="feedo-cir-qr">
          <div className="cir-qr" style={{ backgroundColor: color }}>
            <div className="qr">
              <img src={qr} alt="Restaurant QR Code" />
              <h3 style={isdark ? { color: "#FFFFFF" } : {}}>
                Scan to order food
              </h3>
              <p style={isdark ? { color: "#FFFFFF" } : {}}>
                powered by <strong>feedo.</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload(".cir-qr")}
            className="download-btn"
          >
            <Download size={"1.2rem"} />
          </button>
        </div>

        <div className="normal-qr">
          <img src={qr} alt="Restaurant QR Code" className="norm-qr" />
          <button
            onClick={() => handleDownload(".norm-qr")}
            className="download-btn"
          >
            <Download size={"1.2rem"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QR;
