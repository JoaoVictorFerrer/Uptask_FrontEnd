import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ChangePasswordForm, UserProfileForm } from "../types";

export async function updateProfile(formData : UserProfileForm) {

  try {
    const url = `auth/update-profile`;
    const { data } = await api.put<string>(url,formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


export async function changePassword(formData : ChangePasswordForm) {

    try {
        const url = 'auth/update-password'
        const {data} = await api.post(url,formData)
        return data
    } catch (error) {
     if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
     }
    }

}