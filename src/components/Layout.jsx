import React from 'react';

const Layout = ({ sidebar, editor, config, preview }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Sidebar for chart types */}
      <div className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center lg:justify-start">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-0 lg:mr-3">
            C
          </div>
          <h1 className="hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            ChartPro
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {sidebar}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top toolbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 justify-between shadow-sm">
          <h2 className="text-sm font-medium text-gray-500">Design Studio</h2>
        </header>

        {/* Workspace */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-gray-100">

          {/* Left panel: Data & Config */}
          <div className="w-full lg:w-1/3 max-w-md flex flex-col border-r border-gray-200 bg-white z-10 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {/* Configuration Section */}
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Settings</h3>
                {config}
              </div>

              {/* Data Editor Section */}
              <div className="p-5">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Data</h3>
                {editor}
              </div>
            </div>
          </div>

          {/* Right panel: Preview */}
          <div className="flex-1 flex flex-col bg-gray-50 relative">
            <div className="flex-1 p-4 lg:p-8 flex flex-col">
              <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                {preview}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;