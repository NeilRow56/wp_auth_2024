import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SettingsPage = async () => {
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl text-primary md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile Settings</p>
        </div>
      </div>
      <Card>
        <form>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please dont
              forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label className="text-lg font-semibold text-primary">
                  Your Name
                </Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  defaultValue=""
                />
              </div>
              <div className="space-y-1">
                <Label className="text-lg font-semibold text-primary">
                  Your Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  disabled
                  defaultValue=""
                />
              </div>

              <div className="space-y-1">
                <Label className="text-lg font-semibold text-primary">
                  Color Scheme
                </Label>
                <Select name="color" defaultValue="orange">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>Submit Button</CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SettingsPage
