import { WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';

import { WalletDropdownLink } from '@coinbase/onchainkit/wallet';

import { Address, EthBalance } from '@coinbase/onchainkit/identity';
import { Identity } from '@coinbase/onchainkit/identity';

import { WalletDropdown } from '@coinbase/onchainkit/wallet';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';

import { Name } from '@coinbase/onchainkit/identity';

import { Avatar } from '@coinbase/onchainkit/identity';
import { Wallet } from '@coinbase/onchainkit/wallet';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      {
        <div className="absolute top-4 right-4">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      }
      {children}
    </div>
  );
}
