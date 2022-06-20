import React, { useEffect, useContext } from "react";
import { Context } from "../store/context";
import axios from "axios";
import baseUrl from "../services/baseUrl";

const Connect = () => {
  const { userData } = useContext(Context);

  useEffect(() => {
    getBackend();
  }, []);

  const getBackend = async () => {
    try {
      const res = await baseUrl.get("/user");
      if (res.data.userDetails[0].discord_id === userData.id) {
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
      console.log(account);
      console.log("userdata", userData);
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
