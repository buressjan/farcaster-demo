import { sdk } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import {
  usePrivy,
  useWallets,
} from '@privy-io/react-auth';
import ComposeCast from './CastComposer';
import ViewProfileSubscribe from './ViewProfileSubscribe';
import AddMiniApp from './AddMiniApp';
import PrivyAuth from './PrivyAuth';

function App() {
  return (
    <PrivyAuth>
      <AppContent />
    </PrivyAuth>
  );
}

function AppContent() {
  const [context, setContext] =
    useState<any>(null);
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();

  const isConnected =
    authenticated && wallets.length > 0;

  // Fetch context when app loads or when connection status changes
  useEffect(() => {
    console.log('ready', ready);
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
  }, [isConnected]);

  if (!ready) {
    return <div>Loading Privy...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#fff',
        }}
      >
        Farcaster Mini App Demo
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <ConnectMenu setContext={setContext} />
        Context below:
        <ContextDetails context={context} />
        <ExternalRedirect />
        <ComposeCast context={context} />
        <ViewProfileSubscribe />
        <AddMiniApp />
      </div>
    </div>
  );
}

function ConnectMenu({
  setContext,
}: {
  setContext: (ctx: any) => void;
}) {
  const { ready, authenticated, connectWallet } =
    usePrivy();
  const { wallets } = useWallets();
  const [privyContext, setPrivyContext] =
    useState<any>(null);

  const isConnected =
    authenticated && wallets.length > 0;
  const primaryWallet = wallets[0];

  const handleConnect = async () => {
    if (!authenticated) {
      return;
    }

    if (wallets.length === 0) {
      await connectWallet();
    }

    const contextAwaited = await sdk.context;
    console.log('contextAwaited', contextAwaited);
    if (!contextAwaited) {
      console.warn(
        'No Farcaster context available'
      );
      setContext(null);
      setPrivyContext(null);
      return;
    }
    setContext(contextAwaited);
    setPrivyContext(contextAwaited);
  };

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (isConnected && primaryWallet) {
    return (
      <>
        <div>
          <div>
            Connected wallet:{' '}
            {primaryWallet.address}
          </div>
          <div>
            Wallet type:{' '}
            {primaryWallet.walletClientType}
          </div>
          <div>
            Privy context:{' '}
            {JSON.stringify(
              privyContext,
              null,
              2
            )}
          </div>
          <SignButton wallet={primaryWallet} />
        </div>
      </>
    );
  }

  return (
    <button type='button' onClick={handleConnect}>
      {wallets.length === 0
        ? 'Connect Wallet'
        : 'Reconnect'}
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

function SignButton({ wallet }: { wallet: any }) {
  const [isPending, setIsPending] =
    useState(false);
  const [signature, setSignature] = useState<
    string | null
  >(null);
  const [error, setError] = useState<
    string | null
  >(null);

  const signMessage = async () => {
    if (!wallet) return;

    setIsPending(true);
    setError(null);

    try {
      const message = 'hello world';
      const signature =
        await wallet.sign(message);
      setSignature(signature);
    } catch (err: any) {
      setError(
        err.message || 'Failed to sign message'
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={signMessage}
        disabled={isPending}
      >
        {isPending
          ? 'Signing...'
          : 'Sign message'}
      </button>
      {signature && (
        <>
          <div>Signature</div>
          <div
            style={{
              wordBreak: 'break-all',
              fontSize: '12px',
            }}
          >
            {signature}
          </div>
        </>
      )}
      {error && (
        <>
          <div>Error</div>
          <div>{error}</div>
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
    <button
      onClick={handleRedirect}
      style={{
        width: 'fit-content',
      }}
    >
      Redirect to Metalend
    </button>
  );
}

export default App;
