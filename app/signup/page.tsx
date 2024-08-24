"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignUp() {
  const session = useSession();
  const router = useRouter();
  if (session && session.data) {
    router.push("/");
  }
  return (
    <div className="w-full h-full bg-zinc-800 flex flex-col justify-center items-center">
      <div className="w-full md:w-[50%] h-[40%] bg-zinc-600 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white py-2">
          SignUp
        </h2>
        <Form />
      </div>
    </div>
  );
}

export function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        signIn("credentials", {
          username,
          password,
          redirect: true,
        });
      } else {
        console.error("Failed to sign up");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      action="#"
      onClick={(e) => e.preventDefault()}
      className="flex flex-col w-full h-full bg-red-500 p-12 justify-center items-center gap-4"
    >
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        className="w-full h-1/3 rounded-lg text-3xl px-4 text-black"
        placeholder="Username"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full h-1/3 rounded-lg text-3xl px-4 text-black"
        placeholder="Password"
      />
      <button
        type="submit"
        className="bg-sky-800 h-1/3 rounded-lg text-3xl px-4"
        onClick={handleSignUp}
      >
        SignUp
      </button>
    </form>
  );
}

export default SignUp;
