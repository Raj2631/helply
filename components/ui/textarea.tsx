import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full rounded-md bg-background border border-input px-3 py-2 text-sm placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-y",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
