export interface BlogProps {
    author_name: string;
    author_id: string;
    xata_id: string;
    xata_version: number;
    xata_createdat: Date;
    xata_updatedat: Date;
    title: string;
    slug: string;
    content: string;
    image?: string;
}

export interface NewBlog {
    url?: string | null;
    title: string;
    slug: string;
    content: string;
    author_id: string;
}

export interface UpdateBlogData {
    title: string;
    content: string;
    url?: string;
    slug: string;
}

export interface ToastProps {
    message: string;
}

export interface SessionData {
    id: string;
    email: string;
}

export interface AuthFormInput {
    email: string;
    password: string;
}

export interface BlogTitleProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export interface ImageUploadProps {
    setFileInput: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface OTPInputProps {
    enteredOtp: string;
    setEnteredOtp: React.Dispatch<React.SetStateAction<string>>;
}

export interface ThemeContextType {
    theme: "emerald" | "black";
    toggleTheme: () => void;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginationProps {
    page: number;
    totalPages: number;
    search?: string;
    author?: string;
}

export interface NameInputProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

export interface CommentProps {
    xata_id?: string;
    comment: string;
    post_id: string;
    author_id: string;
    author_name: string;
    xata_createdat?: Date;
    xata_updatedat?: Date;
}

export interface NewCommentData {
    comment: string;
    post_id: string;
    author_id: string;
}
