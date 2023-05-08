import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <header className="flex justify-center items-center gap-2">
          <div
            style={{
              backgroundImage: `url('${session.user.image}')`,
              backgroundPosition: "center",
            }}
            className="rounded-full w-16 h-16"></div>
          <h1 className="text-4xl font-bold text-center">
            <p>{session.user.name}</p>
          </h1>
        </header>
        <a
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}>
          Sign out
        </a>
      </main>
    );
  } else {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <header>
          <h1 className="text-4xl font-bold text-center">
            <p>Sign in to get started</p>
          </h1>
        </header>
        <a
          href={`/api/auth/signin`}
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}>
          Sign in
        </a>
      </main>
    );
  }
}
