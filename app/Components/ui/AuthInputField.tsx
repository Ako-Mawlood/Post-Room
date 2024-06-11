import React, { useEffect } from 'react';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { CgDanger } from 'react-icons/cg';
import { UseFormReturn } from 'react-hook-form';

interface AuthInputFieldProps {
    type: 'email' | 'password';
    form: UseFormReturn<{ email: string; password?: string }>;
    isInputTextCentered: boolean
}

const AuthInputField = ({ type, form, isInputTextCentered }: AuthInputFieldProps) => {
    const { register, setFocus, formState: { isSubmitting, errors } } = form;
    const emailRegistration = register('email', {
        required: 'Email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
        },
    });

    const passwordRegistration = register('password', {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password should be at least 8 characters',
        },
    });

    const registration = type === 'email' ? emailRegistration : passwordRegistration;
    useEffect(() => {
        setFocus("email")
    }, [])
    return (
        <label className={clsx("flex flex-col gap-2 w-full", {
            'items-center': isInputTextCentered,
            'items-start': !isInputTextCentered
        })}>
            <span>{type === 'email' ? 'Email' : 'Password'}</span>
            {errors[type] && <p className="text-red-500 text-xs font-semibold">{(errors[type] as any)?.message}</p>}
            <div className="w-full relative">
                <Input
                    {...registration}
                    disabled={isSubmitting}
                    autoComplete="off"
                    type="text"
                    className={clsx('w-full bg-slate-100', {
                        "text-center": isInputTextCentered,
                        'border-gray-300 focus:border-gray-400': !(errors[type] as any),
                        'border-red-400': errors[type],
                    })}
                />
                {errors[type] && <CgDanger className="size-5 absolute right-2 top-3 text-red-400" />}
            </div>
        </label>
    );
};

export default AuthInputField;
