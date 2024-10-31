import { NavigationProvider } from '@/components/navigation-provider';
import MainFrame from '@/components/MainFrame';

function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <MainFrame />
      </div>
    </NavigationProvider>
  );
}

export default App;