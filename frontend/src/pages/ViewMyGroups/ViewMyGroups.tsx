import * as React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import LensFrens from '../../assets/LensFrens.json';
import GroupMembers from './GroupMembers';

const ViewMyGroups = () => {
  const { address } = useAccount();
  const [communities, setCommunities] = React.useState<any>([]);

  const { data: communitiesFromChain } = useContractRead({
    abi: LensFrens,
    address: '0x91de78d33aac5948654ffea3d2b35625c45d4bb5',
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
