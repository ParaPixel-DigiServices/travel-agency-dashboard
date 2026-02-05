import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSidebar, NavItems } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user || !user.$id) {
      console.log("Admin: No active session, redirecting to sign-in");
      return redirect("/sign-in");
    }

    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status === "user") {
      console.log(
        "Admin: Regular user tried to access admin panel, redirecting to home",
      );
      return redirect("/");
    }

    const userData = existingUser?.$id ? existingUser : await storeUserData();
    console.log("✅ Admin user loaded:", userData?.name || userData?.email);
    return userData;
  } catch (e) {
    console.log("⚠️ Admin auth error:", e.message);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />

      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};
export default AdminLayout;
