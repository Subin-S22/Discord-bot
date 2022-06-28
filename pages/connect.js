import React, { useEffect, useContext } from "react";
import { Context } from "../store/context";
import axios from "axios";
import baseUrl from "../services/baseUrl";
import { holderVerification } from "../utils/verification";
import caver from "../caver/caver";

const Connect = () => {
  const { userData, setVerify, address, verify, setAddress } =
    useContext(Context);

  useEffect(() => {
    // getBackend();

    isWalletConnected();
    const contract = holderVerification(setVerify);
  }, []);

  useEffect(() => {
    if (verify && address) {
      balance(verify);
    }
  }, [verify, address]);

  const isWalletConnected = async () => {
    try {
      const { klaytn } = window;
      if (!klaytn) {
        return;
      } else {
        const accounts = await klaytn.enable();
        const account = await accounts[0];
        setAddress(account);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const balance = async (contract) => {
    const balance = await contract.methods.balanceOf(address).call();
    const tokensData = await Promise.all(
      Array.from({ length: balance }, (_, i) => i).map(async (index) =>
        contract.methods.tokenOfOwnerByIndex(address, index).call()
      )
    );
    if (tokensData.length) {
      await baseUrl.patch("user", {
        discord_id: userData.id,
        wallet_address: address,
        nft_holder: true,
      });
      await getBackend();
    } else {
      await baseUrl.patch("user", {
        discord_id: userData.id,
        wallet_address: address,
        nft_holder: false,
      });
    }
  };

  const getBackend = async () => {
    try {
      const res = await baseUrl.get("/user");
      if (res.data.userDetails[0].nft_holder) {
        alert("You are already a NFT holder");
        return;
      }
      await getNFTRole();
    } catch (err) {
      alert(err.message);
    }
  };

  const connect = async () => {
    const { klaytn } = window;
    if (!klaytn) return;
    else {
      //to open the kaikas wallet
      const accounts = await klaytn.enable();
      const account = await accounts[0];
      const request = new XMLHttpRequest();
      if (userData.id) {
        request.open(
          "POST",
          "https://discord.com/api/webhooks/986151798312169502/1GYuK1jrKyTj7ziyhVoyWzQcUgzYs4cw71jXsiYl007lDa0kVVfmcK8BZOR8h8ntedJ3"
        );
        request.setRequestHeader("Content-type", "application/json");
        //console.log(value)
        const params = {
          username: "Verify Bot",
          avatar_url: "",
          content: account,
        };
        request.send(JSON.stringify(params));
      }
    }
  };

  const getNFTRole = async () => {
    try {
      const request = new XMLHttpRequest();
      request.open(
        "POST",
        "https://discord.com/api/webhooks/986151798312169502/1GYuK1jrKyTj7ziyhVoyWzQcUgzYs4cw71jXsiYl007lDa0kVVfmcK8BZOR8h8ntedJ3"
      );
      request.setRequestHeader("Content-type", "application/json");
      //console.log(value)
      const params = {
        username: "Verify Bot",
        avatar_url: "",
        content: "You have been verified!",
      };
      request.send(JSON.stringify(params));
      alert("NFT-Holder role is assigned to you! Congrats");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={connect}>connect to wallet</button>
      <div>
        <a href="https://discord.com/api/oauth2/authorize?client_id=984392646791397396&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20guilds">
          verify
        </a>
      </div>
    </div>
  );
};

export default Connect;
