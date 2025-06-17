import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="px-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage your account settings and preferences
        </p>
      </div>

      <div>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid h-auto w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger
              value="general"
              className="px-2 py-2 text-xs md:text-sm"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="px-2 py-2 text-xs md:text-sm"
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="px-2 py-2 text-xs md:text-sm"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="px-2 py-2 text-xs md:text-sm"
            >
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  General Settings
                </CardTitle>
                <CardDescription className="text-sm">
                  Manage your basic account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="johndoe"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue="john.doe@example.com"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col space-y-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="space-y-1">
                    <Label htmlFor="marketing" className="text-sm font-medium">
                      Marketing emails
                    </Label>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Receive emails about new products and features
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={true}
                    className="self-start sm:self-center"
                  />
                </div>
                <div className="pt-4">
                  <Button className="w-full sm:w-auto">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Appearance</CardTitle>
                <CardDescription className="text-sm">
                  Customize the look and feel of the interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Theme</Label>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Switch between light and dark mode
                    </p>
                  </div>
                  <ModeToggle />
                </div>
                <div className="flex flex-col space-y-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="space-y-1">
                    <Label htmlFor="animations" className="text-sm font-medium">
                      Animations
                    </Label>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Enable or disable UI animations
                    </p>
                  </div>
                  <Switch
                    id="animations"
                    checked={true}
                    className="self-start sm:self-center"
                  />
                </div>
                <div className="pt-4">
                  <Button className="w-full sm:w-auto">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-sm">
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="space-y-1">
                    <Label
                      htmlFor="email-notifications"
                      className="text-sm font-medium"
                    >
                      Email notifications
                    </Label>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={true}
                    className="self-start sm:self-center"
                  />
                </div>
                <div className="flex flex-col space-y-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="space-y-1">
                    <Label
                      htmlFor="push-notifications"
                      className="text-sm font-medium"
                    >
                      Push notifications
                    </Label>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    className="self-start sm:self-center"
                  />
                </div>
                <div className="pt-4">
                  <Button className="w-full sm:w-auto">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Password</CardTitle>
                <CardDescription className="text-sm">
                  Change your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="current-password"
                    className="text-sm font-medium"
                  >
                    Current password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm font-medium">
                    New password
                  </Label>
                  <Input id="new-password" type="password" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="text-sm font-medium"
                  >
                    Confirm password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="w-full"
                  />
                </div>
                <div className="pt-4">
                  <Button className="w-full sm:w-auto">Change password</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive text-lg md:text-xl">
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-sm">
                  Destructive actions that cannot be undone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
