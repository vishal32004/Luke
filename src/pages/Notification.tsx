import { useState } from "react";
import { Bold, Italic, Underline, Link, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationSettings() {
  const [lowBalanceEnabled, setLowBalanceEnabled] = useState(true);
  const [reminderEmailsEnabled, setReminderEmailsEnabled] = useState(false);
  const [emailFrequencyEnabled, setEmailFrequencyEnabled] = useState(true);
  const [newRewardEnabled, setNewRewardEnabled] = useState(true);
  const [rewardClaimedEnabled, setRewardClaimedEnabled] = useState(true);
  const [balanceThreshold, setBalanceThreshold] = useState("0");
  const [senderName, setSenderName] = useState("Rewards Program");
  const [senderEmail, setSenderEmail] = useState("notifications@company.com");
  const [emailFooter, setEmailFooter] = useState("");

  return (
    <div className="container mx-auto py-8 px-5">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Low Balance Notification</h3>
              <p className="text-sm text-muted-foreground">
                Set a threshold balance limit. You will be notified immediately
                if the balance is equal to or below the limit.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium">INR</span>
                <Input
                  type="number"
                  value={balanceThreshold}
                  onChange={(e) => setBalanceThreshold(e.target.value)}
                  className="w-24"
                />
                <span className="ml-2 text-sm font-medium">.00</span>
              </div>
              <Switch
                checked={lowBalanceEnabled}
                onCheckedChange={setLowBalanceEnabled}
              />
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">
                Enable Reminder Emails for Redemption
              </h3>
              <p className="text-sm text-muted-foreground">
                Enable reminders for your end users to redeem their rewards once
                a month.
              </p>
            </div>
            <Switch
              checked={reminderEmailsEnabled}
              onCheckedChange={setReminderEmailsEnabled}
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">New Reward Notification</h3>
              <p className="text-sm text-muted-foreground">
                Notify users when new rewards are added to the platform.
              </p>
            </div>
            <Switch
              checked={newRewardEnabled}
              onCheckedChange={setNewRewardEnabled}
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Reward Claimed Notification</h3>
              <p className="text-sm text-muted-foreground">
                Notify administrators when users claim rewards.
              </p>
            </div>
            <Switch
              checked={rewardClaimedEnabled}
              onCheckedChange={setRewardClaimedEnabled}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Customise Footer</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Add your customised footer to all the emails from this platform.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Type className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={emailFooter}
                  onChange={(e) => setEmailFooter(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Enter your email footer text here..."
                />
                <div className="flex justify-end">
                  <p className="text-xs text-muted-foreground">
                    {emailFooter.length}/200
                  </p>
                </div>
              </div>
              <Button variant="link" className="text-xs p-0 h-auto mt-1">
                See where it appears
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Sender Name</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This is the name that will appear on all the emails from this
                platform as the sender of the rewards.
              </p>
              <Input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mb-1"
              />
              <div className="flex justify-between">
                <Button variant="link" className="text-xs p-0 h-auto">
                  See where it appears
                </Button>
                <p className="text-xs text-muted-foreground">
                  {senderName.length}/100
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Sender Email</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This is the sender email that appears in emails to your
                recipients. If you want to modify sender email address, reach
                out to support.
              </p>
              <Input
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="mb-1"
              />
              <div className="flex justify-between">
                <Button variant="link" className="text-xs p-0 h-auto">
                  See where it appears
                </Button>
                <p className="text-xs text-muted-foreground">
                  {senderEmail.length}/100
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium">Digest Email</h3>
              <p className="text-sm text-muted-foreground">
                Send a daily digest email instead of individual notifications.
                This helps reduce email volume.
              </p>
            </div>
            <Switch
              checked={emailFrequencyEnabled}
              onCheckedChange={setEmailFrequencyEnabled}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
