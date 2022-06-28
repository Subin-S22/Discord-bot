import axios from "axios";

async function Me(setUserData) {
  try {
    const res = await axios.get("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res);

    setUserData(res.data);
  } catch (err) {
    console.error(err);
  }
}
export default Me;
