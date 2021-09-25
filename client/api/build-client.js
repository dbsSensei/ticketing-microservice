import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: { ...req.headers, host: "ticketing.dev" },
    });
  }

  // We must be on the browser
    return axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
  });
};

export default buildClient;