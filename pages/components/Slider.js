import { useState } from 'react';
import { Range } from 'react-range';

const Slider = ({ max, currentValue }) => {
  const [value, setValue] = useState([currentValue]);
  return (
    <Range
      step={1}
      min={0}
      max={max}
      values={value}
      onChange={(value) => {
        setValue(value);
      }}
      renderTrack={({ props, children }) => (
        <div {...props} className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md">
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="w-5 h-5 transform translate-x-10 bg-yellow-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        />
      )}
    />
  );
};

export default Slider;
