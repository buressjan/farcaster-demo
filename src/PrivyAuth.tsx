import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface PrivyAuthProps {
  children: React.ReactNode;
}

function PrivyAuth({ children }: PrivyAuthProps) {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkWallet,
    createWallet,
  } = usePrivy();

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div>Loading Privy...</div>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!authenticated) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: '24px',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '8px',
          }}
        >
          Welcome to Farcaster Demo
        </h1>
        <p
          style={{
            color: '#666',
            maxWidth: '400px',
            lineHeight: '1.5',
          }}
        >
          Connect your wallet or sign in with
          email to access the Farcaster mini app
          features.
        </p>
        <button
          onClick={login}
          style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              '#5855eb')
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              '#6366f1')
          }
        >
          Sign In with Privy
        </button>
      </div>
    );
  }

  // Get user email as string
  const userEmail = user?.email?.address || '';
  const userWalletAddress =
    user?.wallet?.address || '';

  // Show authenticated content with user info and logout option
  return (
    <div>
      <div
        style={{
          background: '#f8fafc',
          padding: '16px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {userEmail.charAt(0).toUpperCase() ||
              userWalletAddress.slice(0, 2) ||
              'U'}
          </div>
          <div>
            <div
              style={{
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              {userEmail || 'Wallet User'}
            </div>
            {userWalletAddress && (
              <div
                style={{
                  fontSize: '12px',
                  color: '#666',
                }}
              >
                {userWalletAddress.slice(0, 6)}
                ...{userWalletAddress.slice(-4)}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {!user?.wallet && (
            <button
              onClick={createWallet}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Create Wallet
            </button>
          )}

          <button
            onClick={linkWallet}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Link Wallet
          </button>

          <button
            onClick={logout}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

export default PrivyAuth;
