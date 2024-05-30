import { useAppDispatch, useAppSelector } from "@/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { signInSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "@/store/slices/auth.slice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Input
          label="E-mail"
          type="email"
          error={errors?.email?.message}
          {...register("email")}
        />
        <Input
          label="Senha"
          type="password"
          error={errors?.password?.message}
          {...register("password")}
        />
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Acessar
      </Button>
    </form>
  );
}
