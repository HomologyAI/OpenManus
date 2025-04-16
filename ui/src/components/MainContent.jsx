import React, { useState } from 'react';
import Header from './Header';
import ChatArea from './ChatArea';
import RightPanel from './RightPanel';
import Footer from './Footer';

const MainContent = ({ currentTaskId, setCurrentTaskId }) => {
  const [activeTab, setActiveTab] = useState('browser');

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <ChatArea 
          currentTaskId={currentTaskId} 
          setCurrentTaskId={setCurrentTaskId} 
        />
        <RightPanel 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          currentTaskId={currentTaskId}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MainContent; 