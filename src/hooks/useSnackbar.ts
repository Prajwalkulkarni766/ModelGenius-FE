import { useContext } from 'react';
import { SnackbarContext } from '../context/SnackbarProvider.tsx';

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}
