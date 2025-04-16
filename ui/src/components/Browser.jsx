import React, { useRef, useEffect, useState } from 'react';
const Browser = ({ currentTaskId }) => {
  const [url, setUrl] = useState('');
  const iframeRef = useRef(null);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    // Set up log polling
    const pollLogs = async () => {
      if (!currentTaskId) return;

      try {
        const response = await fetch(`http://localhost:8009/api/logs/${currentTaskId}?last_index=${lastIndex}`);
        const data = await response.json();

        console.log("browser logs", data)

        if (data.logs && data.logs.length > 0) {
          data.logs.forEach(log => {
            // Check for URL in log messages
            if (log.message.includes('Session debug_url:')) {
              console.log(log.message)
              const urlMatch = log.message.match(/: (https?:\/\/[^\s]+)/);
              if (urlMatch && urlMatch[1]) {
                setUrl(urlMatch[1]);
              }
            }
          });

          setLastIndex(data.next_index);
        }
      } catch (error) {
        console.warn('Error polling logs:', error);
      }
    };

    // Start polling every second
    const pollInterval = setInterval(pollLogs, 1000);

    // Cleanup on unmount
    return () => clearInterval(pollInterval);
  }, [currentTaskId, lastIndex]);


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
