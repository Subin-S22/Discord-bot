// import styles from "../utils/styles/home.module.scss";
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import baseUrl from "../services/baseUrl";
import { useRouter } from "next/router";
import { Context } from "../store/context";

const Home = () => {
  const router = useRouter();
  const [value] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { userData, setUserData, setAddress } = useContext(Context);

  //get access token
  const getAccessToken = useCallback(async (code) => {
    try {
      if (code) {
        const res = await baseUrl.post("auth", { code: code });
        setAccessToken(res.data.data.access_token);
        // router.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  //get user details
  const getUser = useCallback(async () => {
    try {
      const res = await axios.get("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserData(res.data);
      const discordId = res.data.id;
      if (discordId) {
        await addUserDetails(discordId);
      }
    } catch (err) {
      console.error(err);
    }
  }, [accessToken, setUserData]);

  //adding discord id and waller address
  const addUserDetails = async (discordId) => {
    const accounts = await klaytn.enable();
    const account = accounts[0];
    try {
      const res = await baseUrl.post("user", {
        discord_id: discordId,
        wallet_address: account,
      });
    } catch (err) {
      console.error(err);
    }
  };

  //user effect
  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken, getUser]);

  //token effect
  useEffect(() => {
    const query = window.location.search;
    const code = query.split("=")[1];
    console.log("access");
    if (code) {
      getAccessToken(code);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const { klaytn } = window;
      if (!klaytn) {
        return;
      } else {
        const accounts = await klaytn.enable();
        const account = await accounts[0];
        setAddress(account);
        // const request = new XMLHttpRequest();
        // if (userData) {
        //   request.open(
        //     "POST",
        //     "https://discord.com/api/webhooks/984697040757985311/wnwwu5z7pvZ-cMuBF1eaMxj3JmuHQSPe6e0drOZqqRaMDKyMthTHbQcKb__LDx7A-OwZ"
        //   );
        //   request.setRequestHeader("Content-type", "application/json");
        //   //console.log(value)
        //   const params = {
        //     username: "Verify Bot",
        //     avatar_url: "",
        //     content: `Please enter "!role to get NFT-Holder role"`,
        //   };
        //   request.send(JSON.stringify(params));
        //   alert("Please return to Discord and check verification.");
        // }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async () => {
    console.log("CLICLED");
    //using fetch

    const url = `https://discord.com/api/oauth2/authorize?client_id=984392646791397396&permissions=0&redirect_uri=https%3A%2F%2Floquacious-druid-7782bd.netlify.app%2F&response_type=code&scope=identify%20bot%20applications.commands`;
    const res = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "",
      },
    })
      .then((resUrl) => resUrl.json())
      .catch((err) => {
        console.log(`An error occurred: ${err}`);
      });

    //using xml request
    // try {
    //   const request = new XMLHttpRequest();
    //   request.open(
    //     "GET",
    //     "https://discord.com/api/oauth2/authorize?client_id=984392646791397396&permissions=0&redirect_uri=https%3A%2F%2Floquacious-druid-7782bd.netlify.app%2F&response_type=code&scope=identify%20bot%20applications.commands"
    //   );
    //   request.setRequestHeader("Content-type", "application/json");
    //   // console.log(res);
    //   request.send();
    //   request.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //       var regexStatus = /(\w+ state:.*?)</g;
    //       var response = xhr.responseText;
    //       var statuses = response.match(regexStatus);
    //       console.log("Inside function getStatus" + statuses);
    //     }
    //   };
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="page aligned-center">
      <div>
        <button onClick={getUserInfo}>
          <span>Connect with Discord.</span>
        </button>
        <br></br>
        <button onClick={connectWallet}>
          <span>Connect Wallet to verify.</span>
        </button>
        <button onClick={() => router.push("/connect")}>
          <span>connect and verify.</span>
        </button>
      </div>
    </div>
  );
};
export default Home;
