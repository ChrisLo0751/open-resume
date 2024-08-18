import { Console } from "console";
import { post, ApiResponse  } from "../util/api";

export enum ApiEndpoints {
  UPLOAD = '/v1/upload',
}

export const uploadFile = async (file: File): Promise<ApiResponse<any>> => {
  const formData = new FormData();
  formData.append('file', file);

    console.log(formData);
  const response = await post(ApiEndpoints.UPLOAD, {
    body: formData,
  });
    debugger
  const data = response.data;
  return { data };
};