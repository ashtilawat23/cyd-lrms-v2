import { getSession } from "@auth0/nextjs-auth0";
import Pricing from "../components/pricing";
import Dashboard from "../components/dashboard";

interface UserProfile {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
}

const Home = async () => {
  const session = await getSession();
  console.log("Session:", session);
  const user = session?.user as UserProfile | undefined;
  console.log("User:", user);

  if (!user) {
    console.log("No user logged in");
    return (
      <div className="flex justify-center items-center">
        <p className="text-3xl">Home</p>
      </div>
    );
  }

  console.log("User sub:", user.sub);

  // Fetch payment status from your backend
  let hasAccess = null;
  try {
    const res = await fetch(`http://localhost:3000/api/users/email/${user.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const text = await res.text();
    console.log("API response status:", res.status);
    console.log("API response text:", text);

    if (res.ok) {
      const responseData = JSON.parse(text);
      const data = responseData.data;
      console.log("Payment status response:", data);
      hasAccess = data.hasAccess;
    } else {
      console.error("Error fetching payment status:", text);
      hasAccess = false; // In case of an error, assume no access
    }
  } catch (error) {
    console.error("Error fetching payment status:", error);
    hasAccess = false; // In case of an error, assume no access
  }

  console.log("Has access:", hasAccess);

  if (hasAccess) {
    return <Dashboard />;
  } else {
    return <Pricing />;
  }
};

export default Home;
