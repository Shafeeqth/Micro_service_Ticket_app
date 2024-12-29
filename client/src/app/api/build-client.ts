import axios from "axios";
import { GetServerSidePropsContext } from "next";

export default ({req} :   GetServerSidePropsContext) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        headers: req.headers,
    });
  }else {
    
    return axios.create({
        baseURL: "/",
    })
  }
};
