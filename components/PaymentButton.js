import { API_URL } from '@/config';
import { usePayment } from '@/context/payment/paymentState';
import { grabIntendData } from '@/context/payment/paymentAction';
import { useRouter } from 'next/router';

const PaymentButton = ({ checkoutAmount }) => {
  let amount = +checkoutAmount.split('$')[1];
  const [, paymentDispatch] = usePayment();
  const router = useRouter();

  return (
    <div>
      <button
        className="bg-green-300 rounded-md px-5 py-2 font-semibold"
        onClick={() => {
          grabIntendData(amount, paymentDispatch);
          router.push('/dashboard/payment');
        }}
      >
        Add Bitcoin
      </button>
    </div>
  );
};

export default PaymentButton;
