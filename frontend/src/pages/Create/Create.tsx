import { Profile, useSearchProfiles } from '@lens-protocol/react-web';
import * as React from 'react';

const CreateGroup: React.FC<{}> = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProfiles, setSelectedProfiles] = React.useState<Profile[]>([]);

  const handleSelectProfile = (profileId: Profile) => {
    setSelectedProfiles([...selectedProfiles, profileId]);
  };

  const search = useSearchProfiles({
    query: searchQuery,
    limit: 10,
  });
  console.log(search);

  return (
    <>
      <form>
        <div className="flex flex-col p-4">
          Group Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2 border-2 border-gray-300 rounded-md"
          />
          Privacy type:
          {/* radio buttons */}
          <div className="flex">
            <input type="radio" name="privacy" value="public" />
            <label htmlFor="public">Public</label>
          </div>
          <div className="flex">
            <input type="radio" name="privacy" value="private" />
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
          {/* chips of selected profiles that can be deselected */}
          <div className="flex flex-row flex-wrap">
            {selectedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-row justify-between p-2 border-2 border-gray-300 rounded-md cursor-pointer "
                onClick={() =>
                  setSelectedProfiles(
                    selectedProfiles.filter((id) => id !== profile)
                  )
                }
              >
                <div>{profile.handle}</div>
              </div>
            ))}
          </div>
          {/* search bar */}
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="p-2 border-2 border-gray-300 rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
                    <div>{profile.handle}</div>
                    <div>{profile.id}</div>
                  </div>
                ))}
          </div>
          <br />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Create The group
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateGroup;
