import { useAppDispatch, useAppSelector } from "@/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { signInSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "@/store/slices/auth.slice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { LockIcon, MailIcon } from "lucide-react";

type SignInInput = {
  email: string;
  password: string;
};

export function SignIn() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInInput> = async (payload) => {
    dispatch(signIn(payload))
      .unwrap()
      .catch((error) => {
        toast.error((error as string) ?? "Ocorreu um erro. Tente novamente.");
      });
  };

  if (authenticated) return <Navigate to="/categories" />;

  return (
    <div className="flex w-full flex-col items-center space-y-5">
      <div className="space-y-3 text-center">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
          Boas vindas ao Admin Pointer!
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Realize login para acessar sua conta.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-4"
      >
        <Input
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          error={errors?.email?.message}
          icon={MailIcon}
          {...register("email")}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Digite a sua senha"
          error={errors?.password?.message}
          icon={LockIcon}
          {...register("password")}
        />

        {/* <Link
          to="/reset-password"
          className="group ml-auto flex items-center text-sm font-semibold text-zinc-600 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Esqueceu sua senha?
        </Link> */}

        <Button type="submit" loading={loading} className="w-full">
          Acessar
        </Button>
      </form>
    </div>
  );
}
