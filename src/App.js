import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import CalculationContext from './contexts/calculation/calculationContext';
import CalculationState from './contexts/calculation/calculationState';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <>
      <ChakraProvider>
        <CalculationState>
          <BrowserRouter>
            <Routes>
              <Route path='/' exact element={<Homepage/>}></Route>
            </Routes>
          </BrowserRouter>
        </CalculationState>
      </ChakraProvider>
    </>
  );
}

export default App;
