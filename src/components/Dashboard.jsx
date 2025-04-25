import React, { useState } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import Widget from './Widget';
import AddWidgetSidePanel from './AddWidgetSidePanel';

const Dashboard = () => {
  const { categories, searchTerm, setSearchTerm } = useDashboardStore();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState('');

  
  const filterWidgets = (widgets) => {
    if (!searchTerm) return widgets;
    return widgets.filter(widget => 
      widget.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setShowMenu(false);
  };

 
  const handleAddWidgetClick = (categoryId) => {
    setCurrentCategoryId(categoryId);
    setIsSidePanelOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dashboard V2</h1>
          </div>
          
          {/* Search and Notification Area */}
          <div className="flex-1 mx-6">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                className={`w-full px-4 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-white'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Search anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Bell notification icon */}
            <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {/* 3-dots menu */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
              
              {showMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                  <button
                    onClick={toggleDarkMode}
                    className={`block px-4 py-2 text-sm w-full text-left ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Settings
                  </a>
                  <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Account
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
     
        <div className="flex justify-end mt-2 mb-6 space-x-2">
          <button
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow`}
          >
            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
          <button
            onClick={() => {
             
              if (categories.length > 0) {
                setCurrentCategoryId(categories[0].id);
              }
              setIsSidePanelOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Widget12
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="mt-6">
          {categories.map(category => {
            const filteredWidgetsList = filterWidgets(category.widgets);
            
            return (
              <div key={category.id} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {category.name}:
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredWidgetsList.map(widget => (
                    <Widget 
                      key={widget.id} 
                      categoryId={category.id} 
                      widget={widget}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                  
                  {/* Add Widget Button (with category-specific click handler) */}
                  <div className={`flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 border-2 border-dashed ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} min-h-[200px]`}>
                    <button 
                      className="flex items-center text-blue-600 hover:text-blue-800"
                      onClick={() => handleAddWidgetClick(category.id)}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      Add Widget
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Add Widget Side Panel with currentCategoryId prop */}
      <AddWidgetSidePanel 
        isOpen={isSidePanelOpen} 
        onClose={() => setIsSidePanelOpen(false)}
        isDarkMode={isDarkMode}
        currentCategoryId={currentCategoryId}
      />
    </div>
  );
};

export default Dashboard;