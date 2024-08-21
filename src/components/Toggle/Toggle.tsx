import React, { ChangeEvent } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className="toggle-button">
      <input
        type="checkbox"
        id="theme-checkbox"
        checked={checked}
        onChange={handleToggle}
      />
      <div className="toggle-slider"></div>
    </label>
  );
};

export default Toggle;
