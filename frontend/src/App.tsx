// import { useState } from 'react'
import './App.css';
// import { useAccount } from 'wagmi';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Avatar } from '@coinbase/onchainkit/identity';

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
      </Wallet>
    </>
  );
}

export default App;
