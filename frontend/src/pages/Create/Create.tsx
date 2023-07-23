import {
  Media,
  Profile,
  useProfile,
  useProfilesOwnedByMe,
  useSearchProfiles,
  useWalletLogin,
} from '@lens-protocol/react-web';
import * as React from 'react';
import logo from './../../assets/logo.png';
import createPost from './../../assets/create-post.jpg';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import LensFrens from '../../assets/LensFrens.json';

const CreateGroup: React.FC<{}> = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProfiles, setSelectedProfiles] = React.useState<Profile[]>([]);
  const [groupName, setGroupName] = React.useState('');
  const [privacy, setPrivacy] = React.useState('');

  const handleSelectProfile = (profileId: Profile) => {
    setSelectedProfiles([...selectedProfiles, profileId]);
  };
  const { config } = usePrepareContractWrite({
    address: '0x48cfc9424f35c2899c208c762408E04c26E3E9e3',
    value: BigInt(0),
    abi: LensFrens,
    args: [groupName, selectedProfiles.map((profile) => profile.ownedBy)],
    functionName: 'createGroup',
  });
  const { write, isLoading, isSuccess, data } = useContractWrite(config);

  // const { data: profiles, error, loading } = useProfilesOwnedByMe();

  const search = useSearchProfiles({
    query: searchQuery,
    limit: 10,
  });
  console.log(search);

  return (
    <div className="flex flex-row w-screen min-h-screen text-white">
      {/* left */}
      <div className="w-[400px] bg-[#101113]">
        <div className="flex flex-col w-full p-4">
          <div className="flex flex-row items-center justify-center w-full">
            <img src={logo} className="w-48" />
          </div>
          <br />
          Group Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2 text-black border-2 border-gray-300 rounded-md"
            onChange={(e) => setGroupName(e.target.value)}
          />
          <br />
          Privacy type:
          {/* radio buttons */}
          <div className="flex">
            <input
              type="radio"
              name="privacy"
              value="public"
              onChange={(e) => setPrivacy(e.target.value)}
            />
            <label htmlFor="public">Public</label>
          </div>
          <div className="flex">
            <input
              type="radio"
              name="privacy"
              value="private"
              onChange={(e) => setPrivacy(e.target.value)}
            />
            <label htmlFor="private">Private</label>
          </div>
          <br />
          Members:
          {/* <input
            type="text"
            name="members"
            placeholder="Name"
            className="p-2 border-2 border-gray-300 rounded-md"
            value={selectedProfiles.join(', ')}
            disabled
          /> */}
          <br />
          {/* search bar */}
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="p-2 text-black border-2 border-gray-300 rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <br />
          {/* search results */}
          <div className="flex flex-col">
            {search &&
              search.data &&
              search?.data
                .filter((profile) => !selectedProfiles.includes(profile))
                .map((profile) => (
                  <div
                    key={profile.id}
                    className="flex flex-row justify-between p-2 border-2 border-gray-300 rounded-md cursor-pointer "
                    onClick={() => handleSelectProfile(profile)}
                  >
                    <div>
                      {profile.picture &&
                        profile.picture.__typename === 'MediaSet' && (
                          <img
                            src={profile?.picture.original.url}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                    </div>
                    <div>{profile.handle}</div>
                    <div>{profile.id}</div>
                  </div>
                ))}
          </div>
          <br />
          {/* loading spinner */}
          {isSuccess && <div>Success</div>}
          {data && <div>{data.toString()}</div>}
          {isLoading && (
            <div className="">
              {/* loading spinner */}
              <svg
                className="w-6 h-6 text-white animate-spin"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042.
                  1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          <button
            onClick={() => {
              write?.();
            }}
            className="px-4 py-2 font-bold text-white bg-[#6437AE] rounded hover:bg-blue-700"
          >
            Create The group
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full p-6">
          <img src={createPost} className="w-full rounded-md" />
          <br />
          <div className="w-full text-3xl text-black">{groupName}</div>
          <br />
          <div className="flex flex-row w-[200px]">
            <div className="w-full text-black">{privacy}</div>
          </div>
          <br />
          <div className="flex flex-wrap gap-4 text-black">
            {selectedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-row items-center justify-between p-2 border-2 border-gray-300 rounded-md cursor-pointer "
                onClick={() =>
                  setSelectedProfiles(
                    selectedProfiles.filter((id) => id !== profile)
                  )
                }
              >
                <div>
                  {profile.picture &&
                    profile.picture.__typename === 'MediaSet' && (
                      <img
                        src={profile?.picture.original.url}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                </div>
                <div>{profile.handle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
