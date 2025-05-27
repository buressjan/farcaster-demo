import { sdk } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';

function AddMiniApp() {
  const [appAdded, setAppAdded] = useState<
    boolean | null
  >(null);

  const [miniAppClicks, setMiniAppClicks] =
    useState<number>(0);

  const [errors, setErrors] = useState<string[]>(
    []
  );

  const handleAddMiniApp = async () => {
    try {
      console.log('adding mini app');
      await sdk.actions.addMiniApp();
      setAppAdded(true);
      setMiniAppClicks((prev) => prev + 1);
    } catch (err: any) {
      console.error(
        'Error adding Mini App:',
        err
      );

      const errorMessage =
        err.message ||
        err.toString() ||
        'Unknown error';
      setErrors((prev) => [
        ...prev,
        errorMessage + ' ' + err.type,
      ]);

      if (err.name === 'RejectedByUser') {
        setAppAdded(false);
      }
    }
  };

  useEffect(() => {
    handleAddMiniApp();
  }, []);

  return (
    <div>
      <h1>
        Favorites
        {appAdded !== null &&
          (appAdded ? (
            <span>: added</span>
          ) : (
            <span>: rejected by user</span>
          ))}
      </h1>
      <button onClick={handleAddMiniApp}>
        Add Mini App {miniAppClicks}
      </button>
      <div>
        {errors.map((error, index) => (
          <p key={index}>Error: {error}</p>
        ))}
      </div>
    </div>
  );
}

export default AddMiniApp;
