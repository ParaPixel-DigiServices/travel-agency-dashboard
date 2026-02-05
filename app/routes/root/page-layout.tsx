import { Outlet, redirect, useNavigate } from "react-router";
import { getExistingUser, logoutUser, storeUserData } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import RootNavbar from "../../../components/RootNavbar";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user || !user.$id) {
      console.log("No active session found");
      return null;
    }

    const existingUser = await getExistingUser(user.$id);
    const userData = existingUser?.$id ? existingUser : await storeUserData();
    console.log(
      "✅ User loaded successfully:",
      userData?.name || userData?.email,
    );
    return userData;
  } catch (e) {
    console.log("⚠️ Auth error (non-critical):", e.message);
    // Return null instead of redirecting to allow page to load
    return null;
  }
}

const PageLayout = () => {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
    </div>
  );
};
export default PageLayout;
