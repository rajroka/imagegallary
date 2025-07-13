import { signIn, signOut, auth } from "@/auth";



export default async function ProfilePage() {


     const session = await auth();
     const user = session?.user;

     const username = user?.name || "Guest";
        const email = user?.email || "No email provided";
        const image = user?.image || "/default-avatar.png";
        const isLoggedIn = !!user;
   return (

    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {isLoggedIn ? `Welcome, ${username}` : "Welcome to My App"}
            </h1>
    
            {isLoggedIn ? (
                <>
                <img
                    src={image}
                    alt={username}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 mb-2">Email: {email}</p>
                <form
                    action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                    }}
                >
                    <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-200"
                    >
                    Log Out
                    </button>
                </form>
                </>
            ) : (
                <>
                <p className="text-gray-600 mb-6">Login to continue.</p>
                <form
                    action={async () => {
                    "use server";
                    await signIn("google", { callbackUrl: "/" });
                    }}
                >
                    <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                    >
                    Login with Google
                    </button>
                </form>
                </>
            )}
            </div>
        </div>

    </>
   )

}