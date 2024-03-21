import { Slider } from "antd";
import { useRef, useState } from "react";
import { Brightness } from "../utils/brightness";
import GreyLevelSlicing from "../utils/greyLevelSlicing";
import { Contrast } from "../utils/contrast";
import { Blur } from "../utils/blur";
import { Sharpen } from "../utils/sharpen";



export const Home = () => {
  const formatter = (value: number | undefined) => `${value}%`;

  const displayImageRef = useRef<HTMLImageElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [imageOriginal, setImageOriginal] = useState<string>("");

  const [brightnessSliderValue, setBrightnessSliderValue] = useState<number | undefined>(0);

  const [greyLevelSlicingValue, setGreyLevelSlicingValue] = useState<number[]>([0, 255]);

  const [contrastSliderValue, setContrastSliderValue] = useState<number | undefined>(0);

  const [blurSliderValue, setBlurSliderValue] = useState<number | undefined>(0); // State for blur value
  const [sharpenSliderValue, setSharpenSliderValue] = useState<number | undefined>(0); // State for sharpen value
 
  const handleBrightnessChange = (value: number | undefined) => {
    // displayImageRef.current.style = ''

    setBrightnessSliderValue(value);
    setImage(
      Brightness({
        value: value || 0,
        image: imageOriginal,
        setImage: setImage,
      })
    );
  };

  const handleGreyLevelSlicing = (value: number[]) => {
    // console.log(value);
    setGreyLevelSlicingValue(value);
    setImage(
      GreyLevelSlicing({
        min: value[0],
        max: value[1],
        image: imageOriginal,
        setImage: setImage,
      })
    );
  };

 
const handleContrastChange = (value: number | undefined) => {
    setContrastSliderValue(value);
    setImage(
      Contrast({
        value: value || 0,
        image: imageOriginal,
        setImage: setImage,
      })
    );
  };

  const handleBlurChange = (value: number | undefined) => { // Handler for blur adjustment
    setBlurSliderValue(value);
    setImage(
      Blur({
        value: value || 0,
        image: imageOriginal,
        setImage: setImage,
      })
    );
  };

  const handleSharpenChange = (value: number | undefined) => { // Handler for sharpen adjustment
    setSharpenSliderValue(value);
    setImage(
      Sharpen({
        value: value || 0,
        image: imageOriginal,
        setImage: setImage,
      })
    );
  };
  
  return (
    <div className="flex">
      <div className="w-60 bg-[#24242B] h-screen flex-shrink-0 p-1">

        <div className="bg-gray-800 h-16 w-full rounded">
          Brightness
          <Slider
            value={brightnessSliderValue}
            tooltip={{ formatter }}
            onChange={handleBrightnessChange}
          />
        </div>

        <div className="bg-gray-800 h-16 w-full rounded">
          GreyLevelSlicing
          <Slider
          value={greyLevelSlicingValue}
            range
            defaultValue={[0, 200]}
            min={0}
            max={255}
            onChange={handleGreyLevelSlicing}
          />
        </div>

        <div className="bg-gray-800 h-16 w-full rounded">
          Contrast
        <Slider
          value={contrastSliderValue}
          tooltip={{ formatter }}
          onChange={handleContrastChange}
          min={-100} // Minimum value for contrast adjustment
          max={100} // Maximum value for contrast adjustment
        />
      </div>
      
      <div className="bg-gray-800 h-16 w-full rounded">
          Blur
          <Slider
            value={blurSliderValue}
            tooltip={{ formatter }}
            onChange={handleBlurChange}
            min={0} // Minimum value for blur intensity
            max={100} // Maximum value for blur intensity
          />
        </div>
        <div className="bg-gray-800 h-16 w-full rounded">
          Sharpen
          <Slider
            value={sharpenSliderValue}
            tooltip={{ formatter }}
            onChange={handleSharpenChange}
            min={0} // Minimum value for sharpen adjustment
            max={100} // Maximum value for sharpen adjustment
          />
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
              <img
                ref={displayImageRef}
                src={image}
                alt="Uploaded"
                style={{ width: "100%" }}
              />
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
                setImageOriginal(selectedImage);
              }
            }}
            style={{ display: "none" }}
          />
          <p className="ant-upload-text">
            Click or drag image to this area to upload
          </p>
        </div>
      </div>
    </div>
  );
};
