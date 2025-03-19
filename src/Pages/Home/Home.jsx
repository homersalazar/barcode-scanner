import React, { useState, useEffect, useRef } from "react";
import Quagga from "quagga";

const Home = () => {
  const [barcode, setBarcode] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current,
          constraints: {
            facingMode: "environment", // Use rear camera on mobile devices
            width: 640, // Adjust resolution for better quality
            height: 480,
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader", // For EAN barcodes (common on products)
            "ean_8_reader",
            "code_39_reader",
            "codabar_reader",
            "upc_reader", // For UPC barcodes (common on products)
            "upc_e_reader",
          ],
        },
        locator: {
          patchSize: "medium", // Adjust for better detection
          halfSample: true,
        },
        numOfWorkers: 4, // Use multiple workers for better performance
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Quagga initialization error:", err);
          setBarcode("Error initializing camera: " + err.message);
          return;
        }
        console.log("Quagga initialized successfully");
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      console.log("Barcode detected:", code);
      setBarcode(code);
      // Optionally stop scanning after detection
      // Quagga.stop();
    });

    Quagga.onProcessed((result) => {
      if (!result) {
        console.log("No barcode detected in this frame");
      }
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Barcode Scanner</h2>

      <div
        ref={videoRef}
        style={{
          marginBottom: "20px",
          border: "2px solid red",
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
        }}
      />

      <div>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Barcode will appear here"
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "8px",
            fontSize: "16px",
          }}
        />
      </div>
    </div>
  );
};

export default Home;
