import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

const AddWidgetSidePanel = ({ isOpen, onClose, isDarkMode, currentCategoryId }) => {
  const { categories, availableWidgets, addWidget, searchTerm } = useDashboardStore();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  
  // Set the initial category when panel opens
  useEffect(() => {
    if (isOpen) {
      
      if (currentCategoryId && categories.some(cat => cat.id === currentCategoryId)) {
        setSelectedCategory(currentCategoryId);
      } else if (categories.length > 0 && !selectedCategory) {
      
        setSelectedCategory(categories[0].id);
      }
    }
  }, [isOpen, categories, selectedCategory, currentCategoryId]);
  

  const getAddedWidgetIds = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return [];
    return category.widgets.map(widget => widget.id);
  };
  
 
  const filteredWidgets = availableWidgets.filter(widget => {
    const matchesSearch = widget.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = widget.category === selectedCategory;
    
   
    const addedWidgetIds = getAddedWidgetIds(selectedCategory);
    const isAlreadyAdded = addedWidgetIds.includes(widget.id);
    
    return matchesSearch && matchesCategory && !isAlreadyAdded;
  });
  
  const handleWidgetToggle = (widgetId) => {
    if (selectedWidgets.includes(widgetId)) {
      setSelectedWidgets(selectedWidgets.filter(id => id !== widgetId));
    } else {
      setSelectedWidgets([...selectedWidgets, widgetId]);
    }
  };
  
  const handleConfirm = () => {
    selectedWidgets.forEach(widgetId => {
      addWidget(selectedCategory, widgetId);
    });
    setSelectedWidgets([]);
    onClose();
  };
  
  // Handle closing the panel
  const handleClose = () => {
    setSelectedWidgets([]);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Semi-transparent overlay */}
      <div 
        className="fixed inset-0 bg-black z-40"
        style={{ opacity: 0.7 }}
        onClick={handleClose}
      />
      
      {/* Side panel */}
      <div className={`fixed inset-y-0 right-0 w-96 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-xl z-50 flex flex-col`}>
        <div className={`p-6 ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
          <h2 className="text-xl font-medium">Add Widget</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mt-1`}>
            Personalize your dashboard by adding the following widget
          </p>
        </div>
        
        <div className={`flex ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-3 ${
                selectedCategory === category.id 
                  ? `border-b-2 border-blue-500 text-blue-500 font-medium` 
                  : isDarkMode ? 'text-gray-300' : 'text-gray-500'
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedWidgets([]); // Clear selections when changing category
              }}
            >
              {category.id.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {filteredWidgets.map(widget => {
            // Check if widget is already added to the dashboard
            const addedWidgetIds = getAddedWidgetIds(selectedCategory);
            const isAlreadyAdded = addedWidgetIds.includes(widget.id);
            
            return (
              <div key={widget.id} className="flex items-center py-3">
                <input
                  type="checkbox"
                  id={`widget-${widget.id}`}
                  checked={selectedWidgets.includes(widget.id)}
                  onChange={() => handleWidgetToggle(widget.id)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300"
                  disabled={isAlreadyAdded}
                />
                <label 
                  htmlFor={`widget-${widget.id}`} 
                  className={`ml-3 ${
                    isAlreadyAdded 
                      ? (isDarkMode ? 'text-gray-500' : 'text-gray-400') 
                      : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
                  } ${isAlreadyAdded ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {widget.title}
                  {isAlreadyAdded && (
                    <span className={`ml-2 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      (Already added)
                    </span>
                  )}
                </label>
              </div>
            );
          })}
          
          {filteredWidgets.length === 0 && (
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} py-8`}>
              {searchTerm 
                ? "No widgets found matching your search"
                : "All available widgets have been added to the dashboard"}
            </p>
          )}
        </div>
        
        <div className={`p-4 flex justify-end ${isDarkMode ? 'bg-gray-900 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'}`}>
          <button
            onClick={handleClose}
            className={`px-6 py-2 ${
              isDarkMode 
                ? 'border border-gray-600 hover:bg-gray-700 text-gray-300' 
                : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
            } rounded-md mr-3`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
              selectedWidgets.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={selectedWidgets.length === 0}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default AddWidgetSidePanel;