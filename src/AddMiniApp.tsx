import { sdk } from '@farcaster/frame-sdk';
import { useState } from 'react';

function AddMiniApp() {
  const [appAdded, setAppAdded] = useState<
    boolean | null
  >(null);

  const handleAddMiniApp = async () => {
    try {
      await sdk.actions.addMiniApp();
      setAppAdded(true);
    } catch (err: any) {
      if (err.name === 'RejectedByUser') {
        setAppAdded(false);
      }
    }
  };

  return (
    <div>
      <h1>
        Favorites
        {appAdded &&
          (appAdded ? (
            <p>: added</p>
          ) : (
            <p>: rejected by user </p>
          ))}
      </h1>
      <button onClick={handleAddMiniApp}>
        Add Mini App
      </button>
    </div>
  );
}

export default AddMiniApp;
