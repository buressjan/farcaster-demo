import { sdk } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useConnect,
  useSignMessage,
} from 'wagmi';

function App() {
  const [context, setContext] =
    useState<any>(null);

  useEffect(() => {
    sdk.actions.ready();

    async function fetchContext() {
      const contextAwaited = await sdk.context;
      if (!contextAwaited) {
        console.warn(
          'No Farcaster context available'
        );
        setContext(null);
        return;
      }
      console.log(
        'sdk.context.user:',
        contextAwaited.user
      );
      console.log(
        'sdk.context.location:',
        contextAwaited.location
      );
      console.log(
        'sdk.context.client:',
        contextAwaited.client
      );

      setContext(contextAwaited);
    }

    fetchContext();
  }, []);

  return (
    <>
      <div>
        Mini App + Vite + TS + React + Wagmi
      </div>
      <ConnectMenu />
      <div>
        <span>
          Context:{' '}
          {JSON.stringify(context, null, 2)}
        </span>
      </div>
    </>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  const handleConnect = () => {
    console.log('connectors', connectors);
    connect({ connector: connectors[0] });
  };

  if (isConnected) {
    return (
      <>
        <div>Connected account:</div>
        <div>{address}</div>
        <SignButton />
      </>
    );
  }

  return (
    <button type='button' onClick={handleConnect}>
      Connect
    </button>
  );
}

function SignButton() {
  const { signMessage, isPending, data, error } =
    useSignMessage();

  return (
    <>
      <button
        type='button'
        onClick={() =>
          signMessage({ message: 'hello world' })
        }
        disabled={isPending}
      >
        {isPending
          ? 'Signing...'
          : 'Sign message'}
      </button>
      {data && (
        <>
          <div>Signature</div>
          <div>{data}</div>
        </>
      )}
      {error && (
        <>
          <div>Error</div>
          <div>{error.message}</div>
        </>
      )}
    </>
  );
}

export default App;
