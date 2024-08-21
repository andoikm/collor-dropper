import Header from '../../components/Header/Header';
import DropPickerToggleButton from '../../components/DropPickerToggleButton/DropPickerToggleButton';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import Toggle from '../../components/Toggle/Toggle';
import Progress from '../../components/Progress/Progress';
import DrawingBoard from '../../components/DrawingBoard/DrawingBoard';
import React, { useCallback, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const defaultState =
  'https://www.vorteqcarbon.com/cdn/shop/products/323716841_389760836706321_6500463296610750942_n.jpg';

const HomePage = () => {
  const { isDark, setIsDark } = useTheme();

  const [src, setSrc] = useState<string>(defaultState);
  const [progress, setProgress] = useState<number>(0);

  const handleImgChange = useCallback((src: string) => {
    setSrc(src);
  }, []);

  const handleProgressChange = useCallback((progress: number) => {
    setProgress(progress);
  }, []);

  return (
    <div className="container">
      <Header>
        <DropPickerToggleButton />
        <ImageUploader
          onChange={handleImgChange}
          onChangeProgress={handleProgressChange}
        />
        <Toggle checked={isDark} onChange={setIsDark} />
      </Header>
      <Progress progress={progress} />
      <DrawingBoard src={src} />
    </div>
  );
};

export default HomePage;
