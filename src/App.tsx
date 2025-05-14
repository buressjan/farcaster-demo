import { sdk } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useConnect,
  useSignMessage,
} from 'wagmi';

function App() {
  useEffect(() => {
    sdk.actions.ready();
    console.log('sdk.context', sdk.context);
  }, []);

  return (
    <>
      <div>
        Mini App + Vite + TS + React + Wagmi
      </div>
      <ConnectMenu />
      <ContextDisplay />
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

function ContextDisplay() {
  const [context, setContext] =
    useState<any>(null);

  useEffect(() => {
    // sdk.context is available immediately in Warpcast Mini Apps
    setContext(sdk.context);
    // Optionally, log it for debugging
    console.log(
      'Farcaster Mini App context:',
      sdk.context
    );
  }, []);

  if (!context)
    return <div>Loading context...</div>;

  return (
    <pre
      style={{
        color: 'white',
        background: '#222',
        padding: 16,
        borderRadius: 8,
      }}
    >
      Context:
      {JSON.stringify(context, null, 2)}
    </pre>
  );
}

export default App;
