import { useState } from "react";
import RewardForm from "@/components/RewardForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Code = () => {
  const [showRewardForm, setShowRewardForm] = useState(false);

  const handleExploreClick = () => {
    setShowRewardForm(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Welcome Rajat,</h1>

      {showRewardForm ? (
        <RewardForm setShowRewardForm={setShowRewardForm} />
      ) : (
        <>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <span className="text-xl" aria-hidden="true">
                  🐝
                </span>
                <div>
                  <p className="font-semibold">
                    Congratulations! Your account has been created.
                  </p>
                  <p className="text-muted-foreground mt-1">
                    You can now explore the platform and navigate through its
                    features. Complete the final steps of your account setup by
                    finishing the actions below to send your first reward.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Enter Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Verify your business details to activate your account for
                  sending rewards. Our team usually takes one business hour to
                  verify after you submit.
                </p>
                <Button className="ml-4 whitespace-nowrap">Proceed</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Explore Sending Reward Points
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Reward points allow your recipients to earn points over time
                  and redeem them for existing rewards from our marketplace.
                </p>
                <Button
                  variant="outline"
                  className="ml-4 whitespace-nowrap"
                  onClick={handleExploreClick}
                >
                  Explore
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Code;
