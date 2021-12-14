import { useEffect } from 'react';

const downloadScreenshot = href => {
  const link = document.createElement('a');
  link.href = href;
  link.click();
};

function useDownloadLinkClick(refs = [], urls = []) {
  useEffect(() => {
    refs.forEach((ref, index) => {
      ref.current.onclick = async () => {
        downloadScreenshot(urls[index]);
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useDownloadLinkClick;
