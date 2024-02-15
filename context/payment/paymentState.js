import { useReducer, createContext, useContext } from 'react';
import paymentReducer from './paymentReducer';

const PaymentContext = createContext();

PaymentContext.displayName = 'PaymentContext';

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('Component must be wrapped with in PaymentProvider');
  }
  return context;
};

const defaultState = {
  status: 'idle',
  transections: [],
  intendData: null,
  packageData: null, // how much want to deposit
};

const PaymentProvider = props => {
  const [state, dispatch] = useReducer(paymentReducer, defaultState);

  return <PaymentContext.Provider value={[state, dispatch]} {...props} />;
};

export default PaymentProvider;
