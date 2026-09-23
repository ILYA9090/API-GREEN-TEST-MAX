import { LoginForm } from "@/features/auth-by-credentials";
import cls from "./LoginPage.module.scss";

export function LoginPage() {
  return (
    <main className={cls.page}>
      <LoginForm />
    </main>
  );
}
