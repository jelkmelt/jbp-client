import { useState, useEffect } from 'react';
import UserProfileHead from '../../components/UserProfileHead';
import PaymentButton from '../../components/PaymentButton';
import products from '../../static/products';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const BuyCredit = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [checkout, setCheckout] = useState('USD $10');
  const handleChange = e => setCheckout(e.target.value);

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
    // eslint-disable-next-line
  }, []);

  const checkoutAmount = checkout.split(' ')[1];
  return (
    <div className="container mt-3">
      <UserProfileHead session={session} />
      <div
        className="mt-3 py-3"
        style={{
          border: '2px solid #EFEFEF',
          borderRadius: '5px',
        }}
      >
        <div>
          <p
            className="m-2 p-2"
            style={{
              border: '1px solid red',
              backgroundColor: '#FCEDA5',
              fontSize: '18px',
            }}
          >
            Deposit your account credit for future ads (Deposit credit add in
            instant)
          </p>
          <div
            className="m-3 pr-3"
            style={{ borderBottom: '1px solid #EFEFEF' }}
          >
            <ul className="ml-3" style={{ listStyle: 'none' }}>
              <li>
                <strong>&bull;</strong> Premium post
              </li>
              <li>
                <strong>&bull;</strong> Sponsor post
              </li>
              <li>
                <strong>&bull;</strong> Multiple post
              </li>
            </ul>
          </div>
        </div>
        <div
          className="m-3"
          style={{
            maxWidth: '350px',
            border: '1px solid #EEEEEE',
            borderRadius: '5px',
          }}
        >
          <p
            className="p-2"
            style={{
              backgroundColor: '#EFEFEF',
              fontSize: '16px',
            }}
          >
            Instant Bitcoin Add
          </p>

          <div className="px-2 mt-3">
            <select
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {products.map(product => (
                <option key={product.id}>USD ${product.price}</option>
              ))}
            </select>
          </div>
          <div className="m-3">
            <PaymentButton checkoutAmount={checkoutAmount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;
