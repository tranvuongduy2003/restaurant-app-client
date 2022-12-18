import * as React from 'react';
import Image from 'next/image';
import Field from 'components/Field';
import Label from 'components/Label';
import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Button from 'components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Control } from 'react-hook-form/dist/types';
import Link from 'next/link';
import userApi from 'apis/userApi';
import { toast } from 'react-toastify';

interface ISignUpPageProps {}

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const PHONE_REG_EXP =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const authSchema = yup.object({
  name: yup.string().required('Họ tên không được để trống'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
  phoneNumber: yup
    .string()
    .matches(PHONE_REG_EXP, 'Kí tự không hợp lệ')
    .min(10, 'Số điện thoại phải chứa ít nhất 10 kí tự')
    .required('Số điện thoại không được để trống'),
});

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpPayload>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    resolver: yupResolver(authSchema),
  });

  const handleSignUp: SubmitHandler<SignUpPayload> = async (data) => {
    try {
      await userApi.signup(data);
      toast.success('Đăng kí thành công');
      router.push('/');
    } catch (error: any) {
      toast.error('Đăng kí thất bại');
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/3 p-16">
        <h2 className="text-4xl font-medium after:content-[''] after:my-4 after:w-10 after:h-1 after:bg-secondary after:block after:rounded-full">
          Đăng ký
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)} className="my-10">
          <Field>
            <Label name="name">Họ tên:</Label>
            <Input
              control={control as Control<any>}
              name="name"
              placeholder="Nhập họ và tên"
            ></Input>
            {errors?.email && (
              <ErrorMessage>{errors?.email.message}</ErrorMessage>
            )}
          </Field>
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
            <Label name="phoneNumber">Số điện thoại:</Label>
            <Input
              control={control as Control<any>}
              type="text"
              name="phoneNumber"
              placeholder="Nhập số điện thoại"
            ></Input>
            {errors?.password && (
              <ErrorMessage>{errors?.password.message}</ErrorMessage>
            )}
          </Field>
          <Field>
            <p className="">
              Nếu bạn đã có tài khoản, xin mời{' '}
              <Link href="/auth/login" className="text-secondary">
                Đăng nhập
              </Link>
            </p>
          </Field>
          <Field className="items-center mt-10">
            <Button type="submit" loading={isSubmitting} color="bg-secondary">
              Đăng ký
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

export default SignUpPage;
