import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="w-[100%] h-[100vh] bg-gray-200 grid place-content-center">
        <div>
          <h1 className="text-6xl font-bold">
            Welcome 
            <span className="text-blue-950"> Back</span>
          </h1>
          <p>Please enter your username or email and password</p>
        </div>
      </main>
    </div>
  );
}
