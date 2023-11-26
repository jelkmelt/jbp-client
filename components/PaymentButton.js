import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import products from "../static/products";

const PaymentButton = ({ checkoutAmount }) => {
  let amount = +checkoutAmount.split("$")[1];
  const productDetails = products.filter(
    (product) => product.price === amount
  )[0];
  const [loading, setLoading] = useState(false);

  const coinbase = async () => {
    setLoading(true);
    const url = `${API_URL}/payment`; //url will change
    try {
      const data = await axios.post(url, { id: productDetails.id });
      setLoading(false);
      window.open(data.data.hosted_url, "_blank");
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="bg-green-300 rounded-md px-5 py-2 font-semibold"
        onClick={coinbase}
        disabled={loading}
      >
        Add Bitcoin
      </button>
    </div>
  );
};

export default PaymentButton;
