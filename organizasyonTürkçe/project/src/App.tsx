import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import FCFSPage from './pages/FCFSPage';
import SCANPage from './pages/SCANPage';
import SSTFPage from './pages/SSTFPage';
import ComparisonPage from './pages/ComparisonPage';
import { motion, AnimatePresence } from 'framer-motion';

export type Page = 'home' | 'fcfs' | 'scan' | 'sstf' | 'comparison';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userInputs, setUserInputs] = useState({
    diskPositions: [0, 100, 50, 25, 75],
    initialHeadPosition: 50,
    diskSize: 200,
  });

  const handleInputChange = (newInputs: typeof userInputs) => {
    setUserInputs(newInputs);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'fcfs':
        return <FCFSPage inputs={userInputs} onInputChange={handleInputChange} />;
      case 'scan':
        return <SCANPage inputs={userInputs} onInputChange={handleInputChange} />;
      case 'sstf':
        return <SSTFPage inputs={userInputs} onInputChange={handleInputChange} />;
      case 'comparison':
        return <ComparisonPage inputs={userInputs} onInputChange={handleInputChange} />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentPage={currentPage} onChangePage={setCurrentPage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default App;