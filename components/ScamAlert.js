const ScamAlert = () => {
  return (
    <div
      className="my-3 p-2"
      style={{
        border: '1px solid red',
        backgroundColor: '#faffe5',
        padding: '10px',
      }}
    >
      <h5 style={style}>SCAM Alert!!!</h5>
      <p className="mb-0 text-sm md:text-md">
        if ad poster asks for money or tells you to verify in another website by
        Gift Card, Cash app, Venmo, Zelle app, bitcoin, debit card, credit card
        or by any other way, consider its a Total SCAM ! They will take your
        money and will never respond your messages. DO NOT pay anything before
        meeting the provider!{' '}
      </p>
      <p style={style}>
        Brand won’t be responsible for any fraud if you ignore this warning.
      </p>
    </div>
  );
};
const style = {
  color: 'red',
  marginBottom: 0,
};

export default ScamAlert;
