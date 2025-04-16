import React from 'react';
import Browser from './Browser';
import { GlobeAltIcon} from '@heroicons/react/24/outline';

const RightPanel = ({ activeTab, setActiveTab, currentTaskId }) => {
  const tabs = [
    {
      id: 'browser',
      name: '浏览器',
      icon: GlobeAltIcon,
      component: (props) => <Browser {...props} currentTaskId={currentTaskId} />
    },
    // {
    //   id: 'logs',
    //   name: '日志',
    //   icon: DocumentTextIcon,
    //   component: (props) => <Logger {...props} currentTaskId={currentTaskId} />
    // },
    // {
    //   id: 'files',
    //   name: '文件',
    //   icon: FolderIcon,
    //   component: FileManager
    // }
  ];

  return (
    <div className="w-1/2 flex flex-col border-l border-gray-200">
      <div className="p-2 border-b border-gray-200 bg-white flex items-center">
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button px-3 py-1.5 font-medium text-sm rounded-md ${
                activeTab === tab.id
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4 inline-block mr-1" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`h-full ${activeTab === tab.id ? '' : 'hidden'}`}
          >
            <tab.component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
