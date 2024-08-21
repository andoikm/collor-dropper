import React, { useState, ChangeEvent, useEffect } from 'react';
import { MAX_SIZE_MB } from '../../constants/constants';

export interface ImageUploaderProps {
  onChange: (src: string) => void;
  onChangeProgress: (progress: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  onChangeProgress,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  useEffect(() => {
    onChangeProgress(progress);
  }, [onChangeProgress, progress]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Please upload a valid image file.');
        return;
      }

      if (file.size > MAX_SIZE_BYTES) {
        console.error(`File size exceeds ${MAX_SIZE_MB} MB limit.`);
        return;
      }

      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      reader.onload = (e) => {
        onChange(e.target?.result as string);
        setProgress(0);
      };

      reader.onerror = () => {
        console.error('Error reading file.');
        setProgress(0);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <label className="upload-button button">
        <input type="file" accept="image/*" onChange={handleImageUpload} />+
        Upload
      </label>
    </div>
  );
};

export default ImageUploader;
