import { Slider } from "antd";
import { useState } from "react";
import { Brightness } from "../utils/brightness";

export const Home = () => {
  const formatter = (value: number | undefined) => `${value}%`;
  const [image, setImage] = useState<string>("");
  const [imageOriginal, setImageOriginal] = useState<string>("");

  const [brightnessSliderValue, setBrightnessSliderValue] = useState<number | undefined>(0)

  const handleBrightnessChange = (value: number | undefined) => {
    setBrightnessSliderValue(value)
    setImage(Brightness({ value: value || 0, image:imageOriginal, setImage:setImage }));
  };

  return (
    <div className="flex">
      <div className="w-60 bg-[#24242B] h-screen flex-shrink-0 p-1">
        <div className="bg-gray-800 h-16 w-full rounded">
          <Slider value={brightnessSliderValue} tooltip={{ formatter }} onChange={handleBrightnessChange} />
        </div>
        {/* <div className="bg-gray-800 h-16 w-full rounded">
          <Slider tooltip={{ formatter }} onChange={(value)=> {}} />
        </div>
        <div className="bg-gray-800 h-16 w-full rounded">
          <Slider tooltip={{ formatter }} onChange={(value)=> {}} />
        </div> */}
      </div>
      <div className="w-full p-4">
        <div className="w-full h-full bg-slate-200 rounded">
          <label htmlFor="upload-input" className="ant-upload-drag-icon">
            {image ? (
              <img src={image} alt="Uploaded" style={{ width: "100%" }} />
            ) : (
              "+"
            )}
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const selectedImage = URL.createObjectURL(e.target.files[0]);
                setImage(selectedImage);
                setImageOriginal(selectedImage)
              }
            }}
            style={{ display: "none" }}
          />
          <p className="ant-upload-text">Click or drag image to this area to upload</p>
        </div>
      </div>
    </div>
  );
};
