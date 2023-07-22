import { useAccount } from 'wagmi';
import { TokenboundClient } from '@tokenbound/sdk';

import { useCallback, useEffect } from 'react';
import { useEthersSigner } from '../../hooks';

export default function Test() {
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner({ chainId: 137 });
  // or useSigner() from legacy wagmi versions: const { data: signer } = useSigner()
  const nftContract = '0x3ef9d4764f2b3879947ca95ca84430cee9857a7d';

  const tokenboundClient = new TokenboundClient({ signer, chainId: 137 });
  // 0x851c7fc46333294099dC758A944421e50C6E0A43

  useEffect(() => {
    async function testTokenboundClass() {
      const account = await tokenboundClient.getAccount({
        tokenContract: nftContract,
        tokenId: '9',
      });

      const preparedExecuteCall = await tokenboundClient.prepareExecuteCall({
        account: account,
        to: account,
        value: 0n,
        data: '',
      });

      const preparedAccount = await tokenboundClient.prepareCreateAccount({
        tokenContract: nftContract,
        tokenId: '1',
      });

      console.log('getAccount', account);
      console.log('prepareExecuteCall', preparedExecuteCall);
      console.log('preparedAccount', preparedAccount);

      // if (signer) {
      // signer?.sendTransaction(preparedAccount)
      // signer?.sendTransaction(preparedExecuteCall)
      // }
    }

    testTokenboundClass();
  }, [tokenboundClient]);

  const createAccount = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    const createAccount = await tokenboundClient.createAccount({
      tokenContract: nftContract,
      tokenId: '1',
    });
  }, [tokenboundClient]);

  const executeCall = useCallback(async () => {
    if (!tokenboundClient || !address) return;
    const executedCall = await tokenboundClient.executeCall({
      account: address,
      to: address,
      value: 0n,
      data: '0x',
    });
  }, [tokenboundClient]);

  return (
    <>
      <h1>Ethers 5 Signer + Vite</h1>
      {address && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            margin: '32px 0 0',
            maxWidth: '320px',
          }}
        >
          <button onClick={() => executeCall()}>EXECUTE CALL</button>
          <button onClick={() => createAccount()}>CREATE ACCOUNT</button>
        </div>
      )}
    </>
  );
}
