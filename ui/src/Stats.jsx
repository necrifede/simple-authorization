import { useEffect, useState } from 'react';
import { host } from '../config';

export const Stats = ({ token }) => {
  const [messages, setMessages] = useState({});
  const { numberOfCalls = 0, lastMessage: { from, to, message } = {} } = messages;

  useEffect(() => {
    fetch(`${host}/api/stats`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setMessages(res));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <dl>
        <dt>Number of Calls:</dt>
        <dd>{numberOfCalls}</dd>
        <h3>Last Message</h3>
        <dt>from:</dt>
        <dd>{`"${from ?? ''}"`}</dd>
        <dt>to:</dt>
        <dd>{`"${to ?? ''}"`}</dd>
        <dt>message:</dt>
        <dd>{`"${message ?? ''}"`}</dd>
      </dl>
    </div>
  );
};
