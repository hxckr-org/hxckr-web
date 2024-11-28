import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CourseSuccessProps {
  title: string;
  description: string;
}

export const CourseSuccess = ({ title, description }: CourseSuccessProps) => {
  const router = useRouter();
  const [lnAddress, setLnAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/claim-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lnAddress,
          courseTitle: title,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to claim reward");
      }

      toast.success("Reward claimed successfully!");
      router.push("/challenges");
    } catch (error) {
      toast.error("Failed to claim reward. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push("/challenges");
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">🎉 Congratulations!</h1>
      <p className="text-xl text-gray-600 mb-8">{description}</p>

      <div className="w-full max-w-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your Lightning address"
              value={lnAddress}
              onChange={(e) => setLnAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              required
            />
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isSubmitting || !lnAddress}
            >
              {isSubmitting ? "Claiming..." : "Claim Sats Reward"}
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              onClick={handleSkip}
            >
              Continue without claiming
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
