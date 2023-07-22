import { Web3Button, Web3Modal } from '@web3modal/react';
import * as React from 'react';
import hero from '../../assets/hero.jpg';
import logo from '../../assets/logo.png';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { address } = useAccount();
  console.log(address);
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex items-center justify-center w-screen h-screen gap-4 bg-cover"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="flex flex-col items-center justify-center bg-white rounded w-72 h-72 bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
          <img src={logo} className="w-36" />
          <br />
          <Web3Button />
          {address && (
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => navigate('/create')}
            >
              Create NFT Group
            </button>
          )}
        </div>
        {/* <div className="bg-white rounded w-72 h-72 bg-opacity-40 backdrop-blur-md drop-shadow-lg"></div> */}
        {/* <div className="bg-white bg-opacity-50 rounded w-72 h-72 backdrop-blur-xl drop-shadow-lg"></div> */}
      </div>
      {/* <Web3Button /> */}
    </>
  );
};
export default Home;