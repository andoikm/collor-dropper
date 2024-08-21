import cx from 'classnames';
import ColorPickerIcon from '../Icons/ColorPickerIcon';
import { useDropPickerContext } from '../../contexts/DropPickerContext';

const DropPickerToggleButton = () => {
  const { isDropPickerActive, setDropPickerActive } = useDropPickerContext();
  const clickHandler = () => setDropPickerActive(!isDropPickerActive);

  const buttonCn = cx({
    button: true,
    'button--active': isDropPickerActive,
  });
  return (
    <button
      className={buttonCn}
      onClick={clickHandler}
      aria-label="Toggle drop picker"
    >
      <ColorPickerIcon />
      {isDropPickerActive ? "On" : "Off"}
    </button>
  );
};

export default DropPickerToggleButton;
