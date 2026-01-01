import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { HomeView } from "@/module/Home/ui/home-view";


export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <HomeView />;
};

export default Page;
