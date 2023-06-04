import { useState, useEffect } from "react";
import qrCodeImage from "../assets/qrcode.jpeg";

function UpiPayment() {
  const [upiId, setUpiId] = useState("9334929659571@paytm");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = qrCodeImage;
    image.onload = () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-center">
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <img src={qrCodeImage} alt="QR Code" className="w-full h-full" />
        )}
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-800">Scan QR Code to Pay</p>
        <p className="text-sm text-gray-500">UPI ID: {upiId}</p>
      </div>
      <div className="mt-6">
        <p className="text-md capitalize mb-2">✅ Save Screenshot After Payment and Submit Form</p>
        <a
          href="https://forms.gle/ni1a4FDEowyDsU2z9"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          Submit Screenshot Here
        </a>
      </div>
    </div>
  );
}

export default UpiPayment;
