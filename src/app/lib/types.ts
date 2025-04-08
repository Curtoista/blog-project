// e.g. in /lib/types.ts
export type PostType = {
    id: string;
    title: string;
    content: string;
    date: string;
  };
  
  export type UserType = {
    name: string | undefined | null;
    email: string;
    image: string;
  }