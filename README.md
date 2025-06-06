# Farcaster Demo with Privy Auth

A Farcaster mini app demo that integrates Privy
authentication for seamless wallet connection and
user management.

## Features

- 🔐 **Privy Authentication** - Email, social, and
  wallet login options
- 🌐 **Farcaster Integration** - Full Farcaster
  Frame SDK support
- 💼 **Multi-Wallet Support** - Connect external
  wallets or create embedded wallets
- ⚡ **Modern Stack** - Vite + React +
  TypeScript + Wagmi

## Setup

1. **Clone and install dependencies:**

```bash
git clone <your-repo-url>
cd farcaster-demo
npm install
```

2. **Set up environment variables:**

```bash
cp env.example .env.local
```

3. **Get your Privy App ID:**

   - Go to
     [Privy Dashboard](https://dashboard.privy.io)
   - Create a new app or use an existing one
   - Copy your App ID and paste it in
     `.env.local`:

   ```
   VITE_PRIVY_APP_ID=your-actual-privy-app-id
   ```

4. **Optional - WalletConnect setup:**

   - Go to
     [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a project and get your Project ID
   - Add it to `.env.local`:

   ```
   VITE_WALLETCONNECT_PROJECT_ID=your-project-id
   ```

5. **Run the development server:**

```bash
npm run dev
```

## How it works

The app combines Privy's authentication system
with Farcaster's Frame SDK:

1. **Authentication Flow**: Users can sign in with
   email, social accounts, or connect existing
   wallets
2. **Embedded Wallets**: Privy automatically
   creates secure embedded wallets for users who
   don't have one
3. **Farcaster Integration**: Once authenticated,
   users can access all Farcaster mini app
   features
4. **Multi-Chain Support**: Supports Base,
   Ethereum, Polygon, and Arbitrum networks

## Key Components

- `PrivyAuth.tsx` - Handles authentication UI and
  state
- `App.tsx` - Main app component with Farcaster
  functionality
- `main.tsx` - App initialization with Privy and
  Wagmi providers

## Privy Configuration

The Privy provider is configured with:

- Multiple login methods (email, wallet, social)
- Custom branding and theme
- Embedded wallet creation
- Multi-chain support
- WalletConnect integration

## Learn More

- [Privy Documentation](https://docs.privy.io)
- [Farcaster Frame SDK](https://docs.farcaster.xyz/developers/frames/v2)
- [Wagmi Documentation](https://wagmi.sh)

This is a [Vite](https://vitejs.dev) project
bootstrapped with
[`@farcaster/create-mini-app`](https://github.com/farcasterxyz/frames/tree/main/packages/create-mini-app).

## `farcaster.json`

The `/.well-known/farcaster.json` is served from
the
[public directory](https://vite.dev/guide/assets)
and can be updated by editing
`./public/.well-known/farcaster.json`.

You can also use the `public` directory to serve a
static image for `splashBackgroundImageUrl`.

## Frame Embed

Add a the `fc:frame` in `index.html` to make your
root app URL sharable in feeds:

```html
<head>
  <!--- other tags --->
  <meta
    name="fc:frame"
    content='{"version":"next","imageUrl":"https://placehold.co/900x600.png?text=Frame%20Image","button":{"title":"Open","action":{"type":"launch_frame","name":"App Name","url":"https://app.com"}}}'
  />
</head>
```
