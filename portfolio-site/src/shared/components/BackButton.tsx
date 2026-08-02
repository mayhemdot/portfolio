'use client'
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export function BackButton({className}: {className?: string}) {

  return (
    <div className={cn("top-4 xl:top-2 df-px absolute z-100")}>
      <Button variant="default" onClick={() => window.history.back()} className="cursor-pointer!">
        Back
      </Button>
    </div>
  )
}