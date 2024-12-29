import axios, { AxiosError } from "axios";
import { useState } from "react";

type Body = {
  email: string;
  password: string;
}


type Props = {
  url: string;
  method: "get | post | put | delete | patch";
  body: Body;
  onSuccess?(response: unknown): unknown;
};

// eslint-disable-next-line import/no-anonymous-default-export
export const useRequest = ({ url, method, body, onSuccess }: Props) => {
  const [errors, setErrors] = useState<null | React.ReactNode>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios({url, data: body, method});
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      setErrors(
        error instanceof AxiosError ? (
          <div className="alert alert-danger">
            <h4>Ooops...</h4>
            <ul className="my-0">
              {error.response?.data.errors.map((err: { message: string }) => {
                <li key={err.message}>{err.message}</li>;
              })}
            </ul>
          </div>
        ) : (
          <div className="alert alert-danger">
            An unexpected error occurred.
          </div>
        )
      );
    }
  };
  return { doRequest, errors };
};
