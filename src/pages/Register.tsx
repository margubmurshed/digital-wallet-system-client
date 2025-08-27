import { RegisterForm } from "@/components/modules/Register/RegisterForm"
import { usePageTitle } from "@/hooks/usePageTitle";
import { useEffect } from "react";

export default function Register() {
  const title = usePageTitle();

  useEffect(() => {
    document.title = title;
  }, [title])
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  )
}
