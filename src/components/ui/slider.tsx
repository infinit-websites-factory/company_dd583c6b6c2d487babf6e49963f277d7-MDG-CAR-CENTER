import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2.5 w-full grow rounded-full border border-zinc-700 bg-zinc-800">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-[#ffff00] shadow-[0_0_12px_rgba(255,255,0,0.5)]" />
    </SliderPrimitive.Track>
    {/* Support for range sliders - render multiple thumbs */}
    {Array.isArray(props.value) ? (
      props.value.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-6 w-6 rounded-full border-2 border-[#ffff00] bg-white shadow-lg cursor-pointer ring-offset-background transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffff00] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))
    ) : (
      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-[#ffff00] bg-white shadow-lg cursor-pointer ring-offset-background transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffff00] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    )}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
