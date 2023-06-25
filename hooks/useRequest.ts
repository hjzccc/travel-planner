import axios from "axios";
import { useState } from "react";

interface UseRequestProps {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  body?: object;
  onSuccess?: (data: any) => void;
}

const useRequest = ({ url, method, body, onSuccess }: UseRequestProps): {
    doRequest: (props?: object) => Promise<any>;
    errors: React.ReactElement<any, any> | null;
} => {
  const [errors, setErrors] = useState<React.ReactElement<any, any> | null>(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      console.log(err);
    }
  };

  return { doRequest, errors };
};

export default useRequest;