import { sdk } from '@farcaster/frame-sdk';
import { useState } from 'react';
import {
  useAccount,
  useConnect,
  useSignMessage,
} from 'wagmi';

function App() {
  const [context, setContext] =
    useState<any>(null);

  return (
    <>
      <div>
        Mini App + Vite + TS + React + Wagmi
      </div>
      <ConnectMenu setContext={setContext} />
      <ContextDetails context={context} />
      <ExternalRedirect />
    </>
  );
}

function ConnectMenu({
  setContext,
}: {
  setContext: (ctx: any) => void;
}) {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  const handleConnect = async () => {
    console.log('connectors', connectors);
    connect({ connector: connectors[0] });

    // Fetch and set Farcaster context on connect
    const contextAwaited = await sdk.context;
    if (!contextAwaited) {
      console.warn(
        'No Farcaster context available'
      );
      setContext(null);
      return;
    }
    setContext(contextAwaited);
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

function ContextDetails({
  context,
}: {
  context: any;
}) {
  if (!context) return null;

  return (
    <div
      style={{
        marginTop: 16,
        color: 'white',
        background: '#222',
        padding: 16,
        borderRadius: 8,
      }}
    >
      <h3>Farcaster Context</h3>
      <div>
        <strong>User:</strong>
        <pre>
          {JSON.stringify(context.user, null, 2)}
        </pre>
      </div>
      <div>
        <strong>Location:</strong>
        <pre>
          {JSON.stringify(
            context.location,
            null,
            2
          )}
        </pre>
      </div>
      <div>
        <strong>Client:</strong>
        <pre>
          {JSON.stringify(
            context.client,
            null,
            2
          )}
        </pre>
      </div>
    </div>
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

function ExternalRedirect() {
  return (
    <button
      onClick={() => {
        sdk.actions.openUrl(
          'https://app.metalend.tech'
        );
      }}
    >
      Redirect to Metalend
    </button>
  );
}

export default App;
