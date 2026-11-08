import { cn } from "@/lib/utils";

type SignalMarkProps = {
  compact?: boolean;
  light?: boolean;
  className?: string;
};

export function SignalMark({ compact = false, light = false, className }: SignalMarkProps) {
  return (
    <div className={cn("signal-mark", compact && "signal-mark-compact", light && "signal-mark-light", className)}>
      <span className="signal-mark-symbol" aria-hidden="true">
        <span />
      </span>
      {!compact && <span className="signal-mark-word">Signal<span>Desk</span></span>}
    </div>
  );
}
