import React from 'react';
import { useDashboardStore } from '../store/dashboardStore';

const Widget = ({ categoryId, widget, isDarkMode }) => {
  const { removeWidget } = useDashboardStore();

 
  const renderDonutChart = (data) => {
    const { total, segments } = data;
    const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
    const radius = 50;
    const strokeWidth = 20;
    const centerX = 60;
    const centerY = 60;
    const circumference = 2 * Math.PI * radius;
    
    let currentOffset = 0;

  
    const colorMap = {
      'red': '#EF4444',
      'yellow': '#F59E0B',
      'green': '#10B981',
      'blue': '#3B82F6',
      'lightblue': '#93C5FD',
      'gray': '#9CA3AF',
      'orange': '#F97316'
    };

    return (
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            {segments.map((segment, index) => {
              const percentage = totalValue > 0 ? segment.value / totalValue : 0;
              const segmentLength = percentage * circumference;
              const offset = currentOffset;
              currentOffset += segmentLength;
              
              return (
                <circle
                  key={index}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="transparent"
                  stroke={colorMap[segment.color] || '#CBD5E1'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                  strokeDashoffset={-offset}
                  transform="rotate(-90 60 60)"
                />
              );
            })}
            <text 
              x={centerX} 
              y={centerY - 10} 
              textAnchor="middle" 
              className="text-2xl font-bold"
              fill={isDarkMode ? 'white' : 'black'}
            >
              {total}
            </text>
            <text 
              x={centerX} 
              y={centerY + 10} 
              textAnchor="middle" 
              className="text-xs"
              fill={isDarkMode ? '#9CA3AF' : '#6B7280'}
            >
              Total
            </text>
          </svg>
        </div>
        <div className="ml-4">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center mb-1">
              <div className="w-3 h-3 mr-2" style={{ backgroundColor: colorMap[segment.color] }}></div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {segment.label} ({segment.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  
  const renderProgressBar = (data) => {
    const { total, label, segments } = data;
    
    
    const colorMap = {
      'red': '#EF4444',
      'yellow': '#F59E0B',
      'green': '#10B981',
      'blue': '#3B82F6',
      'orange': '#F97316',
      'gray': '#9CA3AF'
    };

    return (
      <div className="w-full">
        <div className="flex justify-between mb-2">
          <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {total}
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {label}
          </span>
        </div>
        
        <div className={`w-full h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
          <div className="flex h-full">
            {segments.map((segment, index) => {
              const segmentWidth = (segment.value / total) * 100;
              return (
                <div 
                  key={index}
                  className="h-full" 
                  style={{ 
                    width: `${segmentWidth}%`,
                    backgroundColor: colorMap[segment.color] || '#CBD5E1'
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center mr-4 mb-1">
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: colorMap[segment.color] }}></div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {segment.label} ({segment.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  
  const renderEmptyWidget = (data) => {
    return (
      <div className={`flex flex-col items-center justify-center h-48 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
        <p>{data.message}</p>
      </div>
    );
  };


  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'donut':
        return renderDonutChart(widget.data);
      case 'progress':
        return renderProgressBar(widget.data);
      case 'empty':
      default:
        return renderEmptyWidget(widget.data);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 relative`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {widget.title}
        </h3>
        <button 
          onClick={() => removeWidget(categoryId, widget.id)}
          className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {renderWidgetContent()}
    </div>
  );
};

export default Widget;