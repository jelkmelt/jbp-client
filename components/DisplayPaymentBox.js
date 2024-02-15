import { usePayment } from '@/context/payment/paymentState';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/router';

const DisplayPaymentBox = () => {
  const router = useRouter();
  const [state] = usePayment();
  return (
    <div className="py-24 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">
        BTC Address: {state.intendData.intend.pay_address}
      </h1>
      <h1 className="text-xl font-semibold">
        Amount: {state.intendData.intend.pay_amount}
      </h1>
      <div
        style={{
          height: 'auto',
          margin: '40px auto',
          maxWidth: 200,
          width: '100%',
        }}
      >
        <QRCode
          value={state.intendData.intend.pay_address}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          viewBox={`0 0 256 256`}
          size={256}
        />
      </div>
      <div className="flex justify-between">
        <button
          className="font-semibold capitalize px-6 py-2 bg-red-300 rounded-md"
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          cencel payment
        </button>
        <button
          className="font-semibold capitalize px-6 py-2 bg-green-300 rounded-md"
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          {' '}
          already paid
        </button>
      </div>
    </div>
  );
};

export default DisplayPaymentBox;

// "intend": {
//     "payment_id": "4856560704",
//     "payment_status": "waiting",
//     "pay_address": "3A2adXfYokfvcPF8r5G9YcZLURgXLBaBKW",
//     "price_amount": 100,
//     "price_currency": "usd",
//     "pay_amount": 0.00193296,
//     "amount_received": 0.0018815,
//     "pay_currency": "btc",
//     "order_id": "7926130482266631",
//     "order_description": "Buy credit for premium post",
//     "payin_extra_id": null,
//     "ipn_callback_url": "https://nowpayments.io",
//     "created_at": "2024-02-15T22:35:49.864Z",
//     "updated_at": "2024-02-15T22:35:49.864Z",
//     "purchase_id": "5972665173",
//     "smart_contract": null,
//     "network": "btc",
//     "network_precision": null,
//     "time_limit": null,
//     "burning_percent": null,
//     "expiration_estimate_date": "2024-02-15T22:55:49.864Z",
//     "is_fixed_rate": false,
//     "is_fee_paid_by_user": false,
//     "valid_until": "2024-02-22T22:35:49.864Z",
//     "type": "crypto2crypto"
// }
