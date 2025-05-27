import { sdk } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useConnect,
  useSignMessage,
} from 'wagmi';
import ComposeCast from './CastComposer';

function App() {
  const [context, setContext] =
    useState<any>(null);
  const { isConnected } = useAccount();

  // Fetch context when app loads or when connection status changes
  useEffect(() => {
    sdk.actions.ready();

    async function fetchContext() {
      if (isConnected) {
        const contextAwaited = await sdk.context;
        if (contextAwaited) {
          setContext(contextAwaited);
        } else {
          console.warn(
            'No Farcaster context available'
          );
        }
      }
    }

    fetchContext();
  }, [isConnected]); // Refetch whenever connection status changes

  return (
    <>
      <div>
        Mini App + Vite + TS + React + Wagmi
      </div>
      <ConnectMenu setContext={setContext} />
      Context below:
      <ContextDetails context={context} />
      <ExternalRedirect />
      <ComposeCast context={context} />
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
        <div>
          <span>Connectors: </span>
          <pre>
            {JSON.stringify(connectors, null, 2)}
          </pre>
        </div>
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

function ExternalRedirect({ internal = false }) {
  async function handleRedirect() {
    const isMiniApp = await sdk.isInMiniApp();
    const url = 'https://app.metalend.tech';

    if (isMiniApp) {
      if (internal) {
        sdk.actions.openUrl(url);
      } else {
        window.location.href = url;
      }
    } else {
      window.location.href = url;
    }
  }

  return (
    <button onClick={handleRedirect}>
      Redirect to Metalend
    </button>
  );
}

export default App;
