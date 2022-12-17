import * as React from 'react';
import Image from 'next/image';
import Field from 'components/Field';
import Label from 'components/Label';
import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Button from 'components/Button';
import { Control, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import userApi from 'apis/userApi';
import { toast } from 'react-toastify';

interface ILoginPageProps {}

type LoginPayload = {
  email: string;
  password: string;
};

const authSchema = yup.object({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
});

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(authSchema),
  });

  const handleLogin: SubmitHandler<LoginPayload> = async (data) => {
    try {
      await userApi.login(data);
      toast.success('Đăng nhập thành công');
      router.push('/');
    } catch (error: any) {
      toast.error('Đăng nhập thất bại');
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/3 p-16">
        <h2 className="text-4xl font-medium after:content-[''] after:my-4 after:w-10 after:h-1 after:bg-primary after:block after:rounded-full">
          Login
        </h2>
        <form onSubmit={handleSubmit(handleLogin)} className="my-10">
          <Field>
            <Label name="email">Email:</Label>
            <Input
              control={control as Control<any>}
              name="email"
              placeholder="Nhập địa chỉ email"
            ></Input>
            {errors?.email && (
              <ErrorMessage>{errors?.email.message}</ErrorMessage>
            )}
          </Field>
          <Field>
            <Label name="password">Mật khẩu:</Label>
            <Input
              control={control as Control<any>}
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
            ></Input>
            {errors?.password && (
              <ErrorMessage>{errors?.password.message}</ErrorMessage>
            )}
          </Field>
          <Field>
            <p>
              Create new accont?{' '}
              <Link href="/auth/signup" className="text-primary">
                Sign up
              </Link>
            </p>
          </Field>
          <Field className="items-center mt-10">
            <Button type="submit" loading={isSubmitting}>
              Đăng nhập
            </Button>
          </Field>
        </form>
      </div>
      <div className="w-2/3">
        <Image
          src="/login-bg.jpg"
          alt="background"
          width={1000}
          height={1000}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoginPage;
