import { InputHTMLAttributes } from "react";
import { Mail, Lock, CircleUser } from "lucide-react";

type InputProps = {
  icon?: "email" | "password" | "user";
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ icon, error, ...rest }: InputProps) {
  const Icon =
    icon === "email"
      ? Mail
      : icon === "password"
        ? Lock
        : icon === "user"
          ? CircleUser
          : null;

  return (
    <div className="w-full">
      <div
        className={[
          "flex items-center bg-white rounded-full px-4 py-3 w-full border",
          error ? "border-red-500" : "border-transparent",
        ].join(" ")}
      >
        {Icon && <Icon className="w-5 h-5 text-gray-500 mr-3" />}

        <input
          className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          aria-invalid={!!error}
          {...rest}
        />
      </div>

      {error && <p className="mt-1 pl-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
