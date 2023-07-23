import * as React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import CommunityLedger from '../../assets/CommunityLedger.json';

const GroupMembers: React.FC<{ community: string }> = ({ community }) => {
  const { address } = useAccount();
  const communityLedgetQuery = useContractRead({
    abi: CommunityLedger,
    address: '0x32bf852c06b424a907875cd03d68b827e30f3099',
    args: [community],
    functionName: 'listMembersFromAccount',
    account: address,
  });

  return (
    <div>
      <h1>Group Members</h1>

      {communityLedgetQuery.data &&
        communityLedgetQuery.data?.map((address: any) => {
          return address + ', ';
        })}
    </div>
  );
};

export default GroupMembers;
