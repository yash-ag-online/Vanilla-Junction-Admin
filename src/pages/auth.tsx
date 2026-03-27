import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeftToLine, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/user-context';

const formSchema = z.object({
  phone: z.string().regex(/^\+91\d{10}$/, 'please provide valid phone number.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .max(12, 'Password must be at most 12 characters.'),
});

const AuthCard = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userContext = useUser();

  useEffect(() => {
    if (userContext) {
      const { loading: userLoading, user } = userContext;

      if (!userLoading && user) navigate('/');
    }
  }, [userContext]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const body = JSON.stringify({
      phoneNumber: {
        countryCode: '+91',
        number: data['phone'].split('+91')[1],
      },
      password: data['password'],
    });

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login Failed.');
      }

      const result = await response.json();

      if (result && result.data && result.data.tokens) {
        toast.success('Login Successfull.');
        userContext && userContext.fetchUser();
      } else {
        throw new Error('Invalid login api response.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Login Failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!userContext?.loading && !userContext?.user) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your phone number and password below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      {...field}
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="+911234567890"
                      required
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input {...field} id="password" type="password" aria-invalid={fieldState.invalid} required />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="signin-form" className="w-full">
            {loading ? <Loader className="animate-spin" /> : 'Login'}
          </Button>
        </CardFooter>
      </Card>
    );
  } else return <></>;
};

const Auth = () => {
  return (
    <main className="w-full h-screen flex flex-col gap-4 items-center justify-center max-w-sm mx-auto px-4">
      <Link to={'/'} className={'mr-auto'}>
        <Button variant={'ghost'}>
          <ArrowLeftToLine /> Back Home
        </Button>
      </Link>
      <AuthCard />
    </main>
  );
};

export default Auth;
