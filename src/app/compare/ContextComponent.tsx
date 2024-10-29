"use client";

import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useScreenWidth } from "~/lib/hooks/useScreenWidth";

export function ContextComponent({
  TriggerComponent,
  TitleComponent,
  ContentComponent,
}: {
  TriggerComponent: React.ReactNode;
  TitleComponent: React.ReactNode;
  ContentComponent: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const screenWidth = useScreenWidth();

  const isDesktop = screenWidth >= 768;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{TitleComponent}</DialogTitle>
          </DialogHeader>
          {ContentComponent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerComponent}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{TitleComponent}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">{ContentComponent}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>Ok</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
