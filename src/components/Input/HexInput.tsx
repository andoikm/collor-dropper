import React, { CSSProperties, FC } from 'react';
import { clipboardCopy } from '../../utils/clipboardCopy';

interface HexInputProps {
  selectedColor: string;
  hoveredColor: string;
}

const HexInput: FC<HexInputProps> = ({ selectedColor, hoveredColor }) => {
  const handleCopy = async () => {
    const isSuccess = await clipboardCopy(selectedColor);
    if (isSuccess) {
      alert('Copied successfully');
    } else {
      alert('Failed to copy');
    }
  };
  const hexStyle: CSSProperties = {
    '--hex-bg-color': hoveredColor,
    '--hex-border-color': selectedColor,
    '--hex-selected-color': selectedColor,
  } as CSSProperties;

  return (
    <div className="hex-input" style={hexStyle}>
      <div className="color-box"></div>
      <span className="hex-code">{selectedColor}</span>
      <span className="hex-code">{hoveredColor}</span>
      <button className="button" disabled={!selectedColor} onClick={handleCopy}>
        Copy
      </button>
    </div>
  );
};

export default HexInput;
