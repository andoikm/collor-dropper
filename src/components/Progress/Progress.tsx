import React from 'react';

export interface ProgressProps {
  progress: number;
}

const Progress: React.FC<ProgressProps> = ({ progress }) => {
  const validProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-container">
      <progress
        max="100"
        aria-valuemin={0}
        aria-valuemax={100}
        value={validProgress}
        aria-valuenow={validProgress}
      >
        {validProgress}%
      </progress>
    </div>
  );
};

export default Progress;
