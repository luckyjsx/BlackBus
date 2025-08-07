import { create } from 'zustand';
import { User } from "../types/index";

interface UserStore {
  user: User | null;
  isAuthenticated: boolean,
  login: (user:User) => void,
  logout: () => void
}
export const userStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated:false,
  login: (user) => set({user:user, isAuthenticated:true}),
  logout: () => set({user:null, isAuthenticated:false})
}))
