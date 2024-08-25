import { cn } from "@/lib/utils";

import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { TypographyH1, TypographyP } from "./Typography";

/**
 * CustomDialog component displays a dialog with a title, description, and optional button.
 *
 * @component
 * @example
 * <CustomDialog buttonText="Add File" title="Add File">
 *  <FileUpload />
 * </CustomDialog>
 */
export default function CustomDialog({
  displayButton = true,
  open,
  title = "",
  description = "",
  icon = <PlusIcon />,
  children,
  testId,
  buttonText,
  buttonVariant,
  buttonSize,
  buttonClassName,
  buttonContainerClassName,
  setOpen,
  text,
  textClassName,
}: {
  /**
   * The text to be displayed instead of the button. If not provided, the icon will be used.
   */
  text?: string;
  /**
   * Determines whether to display the button. Default is true.
   */
  displayButton?: boolean;
  /**
   * Determines whether the dialog is open. Default is undefined.
   */
  open?: boolean;
  /**
   * The title of the dialog.
   */
  title?: string;
  /**
   * The description of the dialog. Default is an empty string.
   */
  description?: string;
  /**
   * The icon to be displayed in the button. Default is the AddIcon component.
   */
  icon?: React.ReactNode;
  /**
   * The content to be displayed inside the dialog.
   */
  children?: React.ReactNode;
  /**
   * The test ID for the button.
   */
  testId?: string;
  /**
   * The text to be displayed on the button. If not provided, the icon will be used.
   */
  buttonText?: string;
  /**
   * The variant of the button. Can be one of: "link", "default", "destructive", "outline", "secondary", "ghost". Default is "default".
   */
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  /**
   * The size of the button. Can be one of: "default", "icon", "sm", "lg". Default is null.
   */
  buttonSize?: "default" | "icon" | "sm" | "lg" | null | undefined;
  /**
   * The class name for the button.
   */
  buttonClassName?: string;
  buttonContainerClassName?: string;
  textClassName?: string;
  /**
   * Callback function to set the open state of the dialog.
   */
  setOpen?: (open: boolean) => void;
}) {
  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          {displayButton ? (
            <div
              className={cn(
                "flex items-center justify-start gap-2",
                ` ${buttonContainerClassName}`
              )}
            >
              <div
                className={cn(
                  "py-1 px-2 gap-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                  ` ${buttonClassName}`
                )}
                data-testid={testId}
              >
                {icon && !buttonText && icon}
                {buttonText && <TypographyP text={buttonText} />}
              </div>
            </div>
          ) : (
            <div className={textClassName}>
              <TypographyP text={text!} />
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="py-8">
          <DialogHeader>
            <DialogTitle>
              <TypographyH1 text={title} />
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
