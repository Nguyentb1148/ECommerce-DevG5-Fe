import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmEmailApi } from "../../../services/Api/AuthApi";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("Invalid token.");
        setIsLoading(false);
        return;
      }

      try {
        await confirmEmailApi(token);
        setStatus("Email verified successfully! You can now log in.");
      } catch (error) {
        setStatus(error?.response?.data?.error || "Verification failed.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        {isLoading ? (
          <div className="text-lg">Verifying email...</div>
        ) : (
          <div className="text-lg">
            {status}
            {status.includes("successfully") && (
              <div className="mt-4">
                <a
                  href="/authentication"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
                >
                  Go to Login
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
