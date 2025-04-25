Dynamic Dashboard Application
A dynamic, fully interactive Dashboard Builder using React, TailwindCSS, and Zustand for local store management.
Users can add, remove, search, and manage widgets inside different categories dynamically!

🔧 Installation

git clone https://github.com/apurv212/dashboard.git


Install additional packages if needed

# Tailwind CSS (already configured in the project)
`npm install -D tailwindcss postcss autoprefixer`
`npx tailwindcss init -p`

# Zustand for state management
`npm install zustand`
💻 Usage
Start the development server:
`npm run dev`

💠 How the App Works
Dashboard Structure
The application dynamically builds categories and widgets based on data in initialData.js.
Adding Widgets

Click the "+ Add Widget" button
Fill in the widget name and content
Select the category
Click "Confirm"

Removing Widgets

Each widget has a "✖️" button in the top right corner
Click this button to remove the widget

Searching

Use the search bar at the top of the dashboard
Results filter in real-time as you type

⚡ Quick Commands Cheat Sheet
npm install tailwindcss postcss autoprefixer
npm install zustand
npm run dev
✅ Done!
