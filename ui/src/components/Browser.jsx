import React, { useRef, useEffect, useState } from 'react';

const Browser = ({ logs }) => {
  const [url, setUrl] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!logs || logs.length === 0) return;

    // Process new logs
    logs.forEach(log => {
      // Check for URL in log messages
      if (log.message.includes('Session debug_url:')) {
        console.log(log.message);
        const urlMatch = log.message.match(/: (https?:\/\/[^\s]+)/);
        if (urlMatch && urlMatch[1]) {
          setUrl(urlMatch[1]);
        }
      }
    });
  }, [logs]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-white overflow-hidden">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts"
          src={url}
          title="Browser preview window"
        />
      </div>
    </div>
  );
};

export default Browser;
