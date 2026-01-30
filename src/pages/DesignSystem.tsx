import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const DesignSystem = () => {
  return (
    <div className="container mx-auto min-h-screen space-y-12 px-4 py-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Design System</h1>
        <p className="text-muted-foreground">
          Theme: <span className="font-semibold text-primary">Amethyst Haze</span>
        </p>
      </div>

      <Separator />

      {/* Colors */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Colors</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          <div className="space-y-2">
            <div className="h-20 rounded-md bg-background border"></div>
            <p className="text-xs font-medium">Background</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-md bg-primary"></div>
            <p className="text-xs font-medium">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-md bg-secondary"></div>
            <p className="text-xs font-medium">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-md bg-muted"></div>
            <p className="text-xs font-medium">Muted</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-md bg-accent"></div>
            <p className="text-xs font-medium">Accent</p>
          </div>
           <div className="space-y-2">
            <div className="h-20 rounded-md bg-destructive"></div>
            <p className="text-xs font-medium">Destructive</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Inputs</h2>
        <div className="grid max-w-sm gap-4">
           <Input placeholder="Default Input" />
           <Input placeholder="Disabled Input" disabled />
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-6">
         <h2 className="text-2xl font-semibold">Badges</h2>
         <div className="flex gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
         </div>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Name of your project" />
                </div>
             </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default DesignSystem;