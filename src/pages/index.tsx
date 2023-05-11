import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Tomate

  if (session && !loading) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <header className="flex justify-center items-center gap-2">
          <img
            // @ts-ignore:next-line
            src={session.user.image}
            referrerPolicy="no-referrer"
            className="rounded-full w-20 h-20"
          />
          <h1 className="text-4xl font-bold text-center">
            {/* @ts-ignore:next-line */}
            <p>{session.user.name}</p>
            <p>Teste de branch</p>
          </h1>
        </header>
        <a
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </a>
      </main>
    );
  } else if (loading) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <header>
          <h1 className="text-4xl font-bold text-center">
            <p>Loading...</p>
          </h1>
        </header>
      </main>
    );
  } else {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
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
          }}
        >
          Sign in
        </a>
      </main>
    );
  }
}
