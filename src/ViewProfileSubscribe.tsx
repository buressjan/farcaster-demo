import { sdk } from '@farcaster/frame-sdk';

function ViewProfileSubscribe() {
  const handleViewProfile = async () => {
    await sdk.actions.viewProfile({
      fid: 1043120, // https://farcaster.xyz/warpslot-
    });
  };

  return (
    <div>
      <h1>View Profile (Subscribe)</h1>
      <button onClick={handleViewProfile}>
        View Warpslot Profile
      </button>
    </div>
  );
}

export default ViewProfileSubscribe;
