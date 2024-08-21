export const clipboardCopy = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
