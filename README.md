Dashboard Readme
📊 Dynamic Dashboard Application
A dynamic, fully interactive Dashboard Builder using React, TailwindCSS, and Zustand for local store management.
Users can add, remove, search, and manage widgets inside different categories dynamically!

git clone <https://github.com/apurv212/dashboard.git>
cd dynamic-dashboard
Install Dependencies

npm install
Install Tailwind CSS (Already configured) Tailwind is already added, but if needed:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Install Zustand

npm install zustand
Run the Application

npm run dev
Visit the App Open your browser and navigate to:

💠 How the App Works
Dynamic JSON:
Categories and widgets are built based on a JSON (initialData.js).
Each category has an array of widgets.
Adding Widget:
Click + Add Widget → Fill Widget Name and Widget Text → Confirm.
Widget is added under the selected category.
Removing Widget:
Every widget has a ✖️ (Cross Button) on the top right → Click to remove.
Searching Widgets:

Use the search bar at the top → Type a few characters → Live filtering across all widgets.


⚡ Quick Commands Cheat Sheet
npm install tailwindcss postcss autoprefixer
npm install zustand
npm run dev
✅ Done!
