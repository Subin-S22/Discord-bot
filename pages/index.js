// import styles from "../utils/styles/home.module.scss";
import { useState } from "react";

const Home = () => {
  const [value] = useState("");

  const connectWallet = async () => {
    try {
      const { klaytn } = window;
      if (!klaytn) {
        return;
      } else {
        const accounts = await klaytn.enable();
        const account = await accounts[0];
        //console.log(account);
        const request = new XMLHttpRequest();
        request.open(
          "POST",
          "https://discord.com/api/webhooks/950117153519067136/49tzSE-AcpgkKugvKhqT3OS_x91p1jp3G8MFJiqHxxcUHEPhJ2u01vwlJoabVTFPHbls"
        );
        request.setRequestHeader("Content-type", "application/json");
        //console.log(value)
        const params = {
          username: "Verify Bot",
          avatar_url: "",
          content: `${value} ${account}`,
        };
        request.send(JSON.stringify(params));
        alert("Please return to Discord and check verification.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async () => {
    console.log("CLICLED");
    const url = `https://discord.com/api/oauth2/authorize?client_id=984392646791397396&permissions=0&redirect_uri=https%3A%2F%2Floquacious-druid-7782bd.netlify.app%2F&response_type=code&scope=identify%20bot%20applications.commands`;
    const res = await fetch(url)
      .then((resUrl) => resUrl.json())
      .catch((err) => {
        console.log(`An error occurred: ${err}`);
      });
    console.log(res);
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
      </div>
    </div>
  );
};
export default Home;
