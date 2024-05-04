export type currentUserType = {
    id: number;
    fullname: string | null;
    username: string | null;
    email: string;
    isEmailVerified: boolean;
} | null