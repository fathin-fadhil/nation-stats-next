"use client";

import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  FooterComponent,
}: {
  TriggerComponent: React.ReactNode;
  TitleComponent: React.ReactNode;
  ContentComponent: React.ReactNode;
  FooterComponent?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const screenWidth = useScreenWidth();

  const isDesktop = screenWidth >= 768;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
        <DialogContent aria-describedby="" className="gap-0 sm:max-w-[425px]">
          <DialogHeader className="mb-4">
            <DialogTitle>{TitleComponent}</DialogTitle>
          </DialogHeader>
          {ContentComponent}
          <DialogDescription className="hidden">
            Penjelasan mengenai {TitleComponent}
          </DialogDescription>
          {FooterComponent && <DialogFooter>{FooterComponent}</DialogFooter>}
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
        <DrawerDescription className="hidden">
          Penjelasan mengenai {TitleComponent}
        </DrawerDescription>
        <div className="px-4">{ContentComponent}</div>
        <DrawerFooter className="pt-2">
          {FooterComponent}
          <DrawerClose asChild>
            <Button variant={"secondary"}>Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
