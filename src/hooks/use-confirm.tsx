"use client";
import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive_dialog";

export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  // Function to trigger confirmation dialog
  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });
  };

  // Handle actions
  const handleClose = () => setPromise(null);
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  // JSX Component to render dialog
  const ConfirmationDialog = () => {
    return (
      <ResponsiveDialog
        open={promise !== null}
        onOpenChange={handleClose}
        title={title}
        description={description}
      >
        <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row lg:justify-end lg:gap-x-2 items-center">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="w-full lg:w-auto">
            Confirm
          </Button>
        </div>
      </ResponsiveDialog>
    );
  };

  return [ConfirmationDialog, confirm];
};
