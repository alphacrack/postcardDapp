import { useEffect, useState } from 'react';
import postcardContract from './PostcardContract';

function PostcardList() {
  const [postcards, setPostcards] = useState([]);

  useEffect(() => {
    async function fetchPostcards() {
      const totalPostcards = await postcardContract.methods.totalSupply().call();
      const postcardPromises = [];
      for (let i = 1; i <= totalPostcards; i++) {
        postcardPromises.push(postcardContract.methods.readPostcard(i).call());
      }
      const postcards = await Promise.all(postcardPromises);
      setPostcards(postcards);
    }
    fetchPostcards();
  }, []);

  const handleDelete = async (id) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const sender = accounts[0];
    await postcardContract.methods.deletePostcard(id).send({ from: sender });
    const updatedPostcards = postcards.filter((postcard) => postcard.id !== id);
    setPostcards(updatedPostcards);
  };

  return (
    <div>
      <h2>Postcards</h2>
      {postcards.map((postcard) => (
        <div key={postcard.id}>
          <h3>{postcard.title}</h3>
          <p>{postcard.message}</p>
          <button onClick={() => handleDelete(postcard.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostcardList;
