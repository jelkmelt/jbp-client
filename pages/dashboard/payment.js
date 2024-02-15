import { usePayment } from '@/context/payment/paymentState';
import { useEffect } from 'react';
import { createPaymentIntend } from '@/context/payment/paymentAction';
import UserProfileHead from '@/components/UserProfileHead';
import { useSession } from 'next-auth/react';
import DisplayPaymentBox from '@/components/DisplayPaymentBox';

const Payment = () => {
  const { data: session } = useSession();
  const [state, PaymentDispatch] = usePayment();

  useEffect(() => {
    if (state.packageData) {
      createPaymentIntend(state.packageData, PaymentDispatch);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-3">
      <UserProfileHead session={session} />
      {state.status === 'idle' && state.intendData ? (
        <DisplayPaymentBox />
      ) : (
        <div className="flex items-center justify-center space-x-2 animate-bounce mt-7">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default Payment;
