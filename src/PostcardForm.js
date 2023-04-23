import { useState } from 'react';
import postcardContract from './PostcardContract';

function PostcardForm() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [imageHash, setImageHash] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const sender = accounts[0];
    await postcardContract.methods.createPostcard(recipient, message, imageHash).send({ from: sender });
    setRecipient('');
    setMessage('');
    setImageHash('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="Recipient" required />
      <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Message" required />
      <input type="text" value={imageHash} onChange={(event) => setImageHash(event.target.value)} placeholder="Image Hash" />
      <button type="submit">Send Postcard</button>
    </form>
  );
}

export default PostcardForm;
