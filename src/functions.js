import { useRef, useEffect } from "react";

export function BalanceList(key, chain, address, setBalances) {
  // Return a list of all ERC20 and NFT token balances along with their current spot prices
  chain = chain.toString();
  const endpoint = chain + "/address/" + address + "/balances_v2";
  const url = "https://api.covalenthq.com/v1/" + endpoint + "/?key=" + key;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setBalances(JSON.stringify(data.data.items));
    });
}

export function useIsMounted() {
  // HOOKS MOUNT
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
}

export function Chains(key) {
  // Get all chains
  const endpoint = "chains";
  const url = "https://api.covalenthq.com/v1/" + endpoint + "/?key=" + key;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

export function DEXAssets(dex, key, chain, setAssets, pageNo, pageSize) {
  //Return a paginated list of Sushiswap pools sorted by exchange volume
  if (dex && chain) {
    console.log(chain, dex);
    chain = chain.toString();
    const endpoint = chain + "/xy=k/" + dex + "/pools";
    const url = "https://api.covalenthq.com/v1/" + endpoint + "/?page-number=" + pageNo + "&page-size=" + pageSize + "&key=" + key;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const item = {
          value: data,
          ttl: Date.now() + 15000,
        };
        console.log(data);
        var setStr = chain + "dexAssets";
        localStorage.setItem(setStr, JSON.stringify(item));
        setAssets(data);
      });
  }
}

export function FarmingStats(address, key, chain, setStats, pageNo, pageSize) {
  //Get farming positions on Uniswap, Sushiswap, and Harvest.
  chain = chain.toString();
  const endpoint = chain + "/address/" + address + "/stacks/farming/positions";
  const url = "https://api.covalenthq.com/v1/" + endpoint + "/?page-number=" + pageNo + "&page-size=" + pageSize + "&key=" + key;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const item = {
        value: data,
        ttl: Date.now() + 15000,
      };
      var setStr = chain + "farmStats";
      localStorage.setItem(setStr, JSON.stringify(item));
      setStats(data);
    });
}

export function getPortfolio(key, chain, address, setPortfolio) {
  //Given chain_id and wallet address, return wallet value for the last 30 days at 24 hour timestamps.
  chain = chain.toString();
  const endpoint = chain + "/address/" + address + "/portfolio_v2";
  const url = "https://api.covalenthq.com/v1/" + endpoint + "/?key=" + key;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setPortfolio(data);
    });
}

export function getExchangeBal(key, chain, dex, address, setExBal) {
  // Get Sushiswap address exchange balances. Passing in an ENS resolves automatically
  chain = chain.toString();
  const endpoint = chain + "/xy=k/" + dex + "/address/" + address + "/balances";
  const url = "https://api.covalenthq.com/v1/" + endpoint + "/?key=" + key;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setExBal(data);
    })
    .catch((error) => {
      setExBal(false);
    });
}

export const getDEXHealth = async (key, chain, dex) => {
  //DEX health
  chain = chain.toString();
  const endpoint = `${chain}/xy=k/${dex}/health`;
  const url = "https://api.covalenthq.com/v1/" + endpoint + "/?key=" + key;
  const res = await fetch(url);
  const data = await res.json();
  localStorage.setItem("health", JSON.stringify(data));
  return data;
};

export function getCGData(id, setGecko) {
  //Coingecko data
  let dex;

  switch (id) {
    case "sushiswap":
      dex = "sushi";
      break;
    case "uniswap_v2":
      dex = "uniswap";
      break;
    case "stellaswap":
      dex = "stellaswap";
      break;
    case "beamswap":
      dex = "beamswap";
      break;
    case "apeswap_v2":
      dex = "apeswap-finance";
      break;
    case "quickswap":
      dex = "quick";
      break;
    case "katana":
      dex = "ronin";
      break;
    case "spiritswap":
      dex = "spiritswap";
      break;
    case "spookyswap":
      dex = "spookyswap";
      break;
    case "standard":
      dex = "shiden";
      break;
    case "pangolin":
      dex = "pangolin";
      break;
    case "traderjoe":
      dex = "joe";
      break;
    case "moonlift":
      dex = "moonlift";
      break;
    case "pancakeswap_v2":
      dex = "pancakeswap_v2";
      break;
    default:
  }

  console.log(dex);
  let endpoint = "coins/" + dex;
  if (dex) {
    const url = "https://api.coingecko.com/api/v3/" + endpoint;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGecko(data);
      });
  }
}
