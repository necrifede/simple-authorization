import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setFrom':
      return { ...state, from: action.payload };
    case 'setTo':
      return { ...state, to: action.payload };
    case 'setMessage':
      return { ...state, message: action.payload };

    default:
      return state;
  }
};

const initial = {
  from: '',
  to: '',
  message: '',
};

export const Message = ({ handleMessages }) => {
  const [{ from, to, message }, dispatch] = useReducer(reducer, initial);

  const sentForm = (value) => dispatch({ type: 'setFrom', payload: value });
  const sentTo = (value) => dispatch({ type: 'setTo', payload: value });
  const sentMessage = (value) => dispatch({ type: 'setMessage', payload: value });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '250px' }}>
        <h2>Send message</h2>
        <input type="text" placeholder="from" value={from} onChange={(e) => sentForm(e.target.value)} />
        <input type="text" placeholder="to" value={to} onChange={(e) => sentTo(e.target.value)} />
        <input type="text" placeholder="message" value={message} onChange={(e) => sentMessage(e.target.value)} />
        <button
          type="submit"
          style={{ maxWidth: '100px' }}
          onClick={(e) => {
            e.preventDefault();
            handleMessages({ from, to, message });
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};
