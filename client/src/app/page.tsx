import type { GetServerSidePropsContext } from "next";
import buildClient from "./api/build-client";

export interface ICurrentUser {
  id: string;
  email: string;
}

type Props = {
  currentUser: ICurrentUser;
};
const HomePage = ({ currentUser }: Props) => {
  return currentUser ? (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>You are logged in</h1>
    </div>
  ) : (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>You are not logged in</h1>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("On landing page");
  const client = buildClient(context);
  const data = await client.get("/api/users/currentuser");
  return data;
}

export default HomePage;
