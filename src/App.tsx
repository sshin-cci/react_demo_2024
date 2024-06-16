import './App.css';

import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';

function App() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        - <h1 className='text-red-500'>React TypeScript Webpack Starter</h1>
        <div className='card'>
          <TextInput />
        </div>
        <div className='card'>
          <Button>クリック</Button>
        </div>
      </div>
    </main>
  );
}

export default App;
