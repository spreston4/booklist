export type LoggedInStatus = "LOGGED_IN" | "NOT_LOGGED_IN";

// Object Interfaces
export interface UserObject {
  created_at: string;
  email: string;
  id: number;
  password_digest: string;
  updated_at: string;
  wishlist?: BookObject[];
  readlist?: BookObject[];
}

export interface BookObject {
  author: string;
  created_at: string;
  description?: string;
  id: number;
  title: string;
  updated_at: string;
}

export interface NewAuthObject {
  status?: string;
  user: UserObject;
}

// Props Interfaces
export interface SessionProps {
  loggedInStatus: LoggedInStatus;
  currentUser: UserObject | null;
}

export interface RegistrationProps {
  handleSuccessfulAuth: (data: NewAuthObject) => void;
}

export interface NavBarProps extends SessionProps {
  handleLogin: (data: NewAuthObject) => void;
  handleLogout: () => void;
}

export interface HomeProps extends SessionProps {
  handleLogin: (data: NewAuthObject) => void;
  handleLogout: () => void;
}

export interface DashboardProps extends SessionProps {}

export interface WishlistProps extends SessionProps {}

export interface BooksProps extends SessionProps {}

// UI Types
type ListCategories = "wishlist" | "readlist" | "both";
type SchemeCategories = "primary" | "alternate";

// UI Props Interfaces
export interface BookCardProps extends SessionProps {
  addable?: ListCategories ;
  book: BookObject;
  handleForceUpdate?: () => void;
  removable?: ListCategories;
}

export interface ButtonProps {
  children: any;
  className?: string;
  onClick?: () => void;
  scheme?: SchemeCategories;
  size?: "none" | "sm" | "md" | "lg";
  type?: "button" | "reset" | "submit" | undefined;
  variant?: "fill" | "outline" | "plain";
}

export interface ContanerProps {
  children: any;
  className?: string;
}

export interface InputProps {
  type?: string;
  name: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  scheme?: SchemeCategories;
  label?: string;
}

export interface LinkProps {
  children: any;
  className?: string;
  href: string;
  scheme?: SchemeCategories;
}
