import React from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

import './ZipLink.css';
function ZipLink({ filenames = [] }) {
  const onClickHandler = async () => {
    const zip = new JSZip();
    for (let filename of filenames) {
      const image = window.localStorage.getItem(filename);
      zip.file(filename + '.png', image, { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });

    FileSaver.saveAs(content, 'screenshots.zip');
  };

  return (
    <button className="ZipLink" onClick={onClickHandler}>
      DOWNLOAD
    </button>
  );
}

export default ZipLink;
