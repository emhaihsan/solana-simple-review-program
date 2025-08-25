# Solana Review DApp - README

Welcome to the Solana Review DApp project repository! This decentralized application (DApp) leverages blockchain technology to implement a review platform on the Solana network. Users can share their experiences about restaurants, services, or any location in a transparent and immutable way.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Testing](#testing)
- [Frontend](#frontend)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Solana Review DApp provides a user-friendly interface to participate in blockchain-based reviews. This project ensures transparency and trust in the review process through the use of Solana programs (smart contracts). Users can create reviews with ratings, descriptions, and locations, all stored immutably on the Solana blockchain.

## Features

- **Create Reviews**: Submit reviews with title, description, location, and rating (1-10 scale)
- **Browse Reviews**: View all community reviews in a modern, responsive interface
- **Blockchain Transparency**: All reviews are stored on Solana blockchain for immutability
- **Wallet Integration**: Connect your Solana wallet (Phantom, Solflare) to participate
- **Real-time Updates**: Instant updates when new reviews are submitted
- **Modern UI**: Futuristic glass morphism design with animations and gradients
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

Follow these steps to set up the project locally and start participating in blockchain reviews.

### Prerequisites

- **Node.js**: Ensure Node.js (v16+) is installed. Download it from [nodejs.org](https://nodejs.org)
- **Solana CLI**: Install Solana CLI tools from [docs.solana.com](https://docs.solana.com/cli/install-solana-cli-tools)
- **Rust**: Install Rust for building Solana programs from [rustup.rs](https://rustup.rs)
- **Solana Wallet**: Install Phantom or Solflare wallet extension

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/emhaihsan/solana-simple-review-program.git
   cd solana-simple-review-program
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Set up Solana environment:**

   ```bash
   # Set to devnet for development
   solana config set --url https://api.devnet.solana.com

   # Generate a keypair if you don't have one
   solana-keygen new

   # Get devnet SOL for testing
   solana airdrop 2
   ```

## Usage

### Running the Frontend

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

3. **Connect your Solana wallet:**

   - Click "Connect Wallet" button
   - Select your preferred wallet (Phantom/Solflare)
   - Ensure your wallet is set to Devnet

4. **Create a review:**
   - Fill in the review form with title, description, location, and rating
   - Click "Submit Review" and approve the transaction
   - Your review will appear in the community reviews section

## Smart Contracts

The Solana program (smart contract) handles the review creation and storage logic. The program is written in Rust and deployed on Solana blockchain.

### Program Structure

- **`lib.rs`**: Main program entry point and instruction processing
- **`instruction.rs`**: Defines review instructions (Add/Update) and payload structures
- **`state.rs`**: Defines account state structure for storing review data

### Key Functions

- **`add_review`**: Creates a new review with PDA (Program Derived Address)
- **`update_review`**: Updates an existing review (by original author only)

### Account Structure

```rust
pub struct AccountState {
    pub is_initialized: bool,
    pub rating: u8,           // 1-10 rating
    pub description: String,  // Review description
    pub title: String,        // Review title
    pub location: String,     // Review location
}
```

### PDA Seeds

Reviews are stored in PDAs derived from:

- User's public key
- Review title

This ensures each user can have multiple reviews with different titles.

## Testing

### Frontend Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Smart Contract Testing

1. **Build the program:**

   ```bash
   # In the program directory
   cargo build-sbf
   ```

2. **Deploy to devnet:**

   ```bash
   solana program deploy target/deploy/review_program.so
   ```

3. **Update Program ID:**
   - Copy the returned Program ID
   - Update `REVIEW_PROGRAM_ID` in `src/pages/index.tsx`

## Frontend

The DApp frontend is built using modern web technologies:

- **Next.js 13**: React framework with Pages Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Solana Web3.js**: Solana JavaScript SDK
- **Wallet Adapter**: Solana wallet integration
- **Borsh**: Binary serialization for Solana data

### Key Components

- **`WalletContextProvider`**: Manages wallet connection and Solana network
- **`ReviewForm`**: Interactive form for creating reviews
- **`ReviewCard`**: Displays individual reviews with modern design
- **`AppBar`**: Wallet connection interface

### Design Features

- **Glass Morphism**: Modern translucent card designs
- **Gradient Animations**: Dynamic color transitions
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects and smooth transitions

## Deployment

### Deploy Smart Contract

1. **Build the program:**

   ```bash
   cargo build-sbf
   ```

2. **Deploy to desired network:**

   ```bash
   # For devnet
   solana config set --url https://api.devnet.solana.com
   solana program deploy target/deploy/review_program.so

   # For mainnet (production)
   solana config set --url https://api.mainnet-beta.solana.com
   solana program deploy target/deploy/review_program.so
   ```

### Deploy Frontend

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel (recommended):**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Or deploy to other platforms:**
   - Netlify
   - AWS Amplify
   - GitHub Pages

## Contributing

Contributions to this project are welcome! To contribute:

1. **Fork the repository**
2. **Create a new branch for your feature/bug fix:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes and test thoroughly**
4. **Commit with clear and concise messages:**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push changes to your fork:**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Submit a pull request describing your changes**

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Add comments for complex logic
- Test on devnet before proposing changes
- Ensure responsive design compatibility

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Additional Resources

- [Solana Documentation](https://docs.solana.com/)
- [Solana Web3.js Guide](https://solana-labs.github.io/solana-web3.js/)
- [Anchor Framework](https://www.anchor-lang.com/) (for advanced Solana development)
- [Phantom Wallet](https://phantom.app/)
- [Solflare Wallet](https://solflare.com/)

## Support

For questions, issues, or suggestions:

- Open an issue on [GitHub](https://github.com/emhaihsan/solana-simple-review-program/issues)
- Join the [Solana Discord](https://discord.gg/solana) community
- Follow [Solana Twitter](https://twitter.com/solana) for updates

---

**Thank you for your interest in the Solana Review DApp project! Happy reviewing on the blockchain! 🚀**
