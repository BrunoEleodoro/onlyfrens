import * as React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import CommunityLedger from '../../assets/CommunityLedger.json';
import LensFrens from '../../assets/LensFrens.json';
import { ethers } from 'ethers';
import { useQuery, gql } from '@apollo/client';
import { useProfilesOwnedByMe } from '@lens-protocol/react-web';
import GroupMembers from './GroupMembers';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "AUD") {
      currency
      rate
    }
  }
`;

const ViewMyGroups = () => {
  const { address } = useAccount();
  const [communities, setCommunities] = React.useState<any>([]);
  const [communityMembers, setCommunityMembers] = React.useState<any>({});

  const { data: communitiesFromChain } = useContractRead({
    abi: LensFrens,
    address: '0xe661c29dfd8ca424461dae7a3ade92f82bd456ee',
    args: [],
    functionName: 'getMyCommunities',
    account: address,
    enabled: true,
    watch: true,
  });

  React.useEffect(() => {
    console.log(communitiesFromChain);

    setCommunities(communitiesFromChain);
  }, [communitiesFromChain]);

  return (
    <div>
      <h1>View My Groups</h1>
      <br />
      <br />
      <div className="flex flex-col p-6">
        {communities.map((community: any) => {
          return (
            // make a card
            <div className="flex flex-col p-6 bg-gray-500 rounded bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
              <b>Group :{community} </b>
              <GroupMembers community={community} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewMyGroups;
