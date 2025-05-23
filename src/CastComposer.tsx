import { sdk } from '@farcaster/frame-sdk';

function ComposeCast({
  context,
}: {
  context: any;
}) {
  const handleCompose = async () => {
    // Don't proceed if we don't have context
    if (!context || !context.user) {
      console.warn(
        'No Farcaster  context available for composing cast'
      );
      return;
    }

    // Create a message that includes user context
    const message = `Hello from the Metalend Mini App! 
    
I'm ${context.user.displayName || context.user.username || `FID: ${context.user.fid}`}.

You can now get 13.41% APY on USDC with Morpho!

#FarcasterMiniApp #Metalend`;
    try {
      // Open the compose screen with pre-filled text
      await sdk.actions.composeCast({
        text: message,
        embeds: [
          'https://app.metalend.tech/Usdc_Morpho_Ethereum_13.41',
        ],
      });
      console.log(
        'Compose cast opened successfully'
      );
    } catch (error) {
      console.error(
        'Error opening compose cast:',
        error
      );
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <button
        onClick={handleCompose}
        disabled={!context}
        style={{
          backgroundColor: context
            ? '#624DE3'
            : '#a9a9a9',
          color: 'white',
          padding: '10px 16px',
          borderRadius: 8,
          border: 'none',
          cursor: context
            ? 'pointer'
            : 'not-allowed',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        🔊 Share on Farcaster
      </button>
      {!context && (
        <div
          style={{
            fontSize: 14,
            marginTop: 8,
            color: '#888',
          }}
        >
          Connect to enable sharing
        </div>
      )}
    </div>
  );
}

export default ComposeCast;
