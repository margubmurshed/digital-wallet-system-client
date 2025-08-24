import { MailIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function EmailInput({...field}) {
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input className="peer pe-9" placeholder="Enter your email" type="email" {...field} required/>
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <MailIcon size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
