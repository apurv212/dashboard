import { create } from 'zustand';
import { initialData } from '../data/initialData';

export const useDashboardStore = create((set) => ({
  categories: initialData.categories,
  availableWidgets: initialData.availableWidgets,
  searchTerm: '',

  setSearchTerm: (term) => set({ searchTerm: term }),

  addWidget: (categoryId, widgetId) => set((state) => {
   
    const widgetToAdd = state.availableWidgets.find(w => w.id === widgetId);
    if (!widgetToAdd) return state;

    
    const newWidget = {
      id: widgetToAdd.id,
      title: widgetToAdd.title,
      type: "empty",
      data: {
        message: "Widget content will appear here"
      }
    };

  
    const updatedCategories = state.categories.map(category => {
      if (category.id === categoryId) {
      
        const widgetExists = category.widgets.some(w => w.id === widgetId);
        if (widgetExists) return category;
        
        return {
          ...category,
          widgets: [...category.widgets, newWidget]
        };
      }
      return category;
    });

    return { categories: updatedCategories };
  }),

  removeWidget: (categoryId, widgetId) => set((state) => {
    const updatedCategories = state.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });

    return { categories: updatedCategories };
  }),
}));