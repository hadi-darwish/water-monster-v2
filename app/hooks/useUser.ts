import { userTypes } from "./hookTypes";
import { setAlertMsgType } from "./../types/common";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAdminQuery,
  getContactsQuery,
  getUsersQuery,
  updateNameMutation,
  updatePhoneMutation,
} from "./gql/user";
import { client } from "pages/_app";

/*********************** use update name hook ***********************/

const updateName = async ({ id, name }: userTypes) => {
  const variables = { id, name };
  const res: any = await graphQLClient.request(updateNameMutation, variables);
  return res?.updateUsers?.users[0];
};

export const useUpdateName = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(updateName, {
    onSuccess: (res) => {
      localStorage.setItem("User", JSON.stringify(res));
      client.setQueryData(["User"], res);
      setAlertMsg("Name updated");
    },
    onError: (err: Error) => console.log(err.message),
  });
};

/*********************** use update phone hook ***********************/

const updatePhone = async ({ id, phone }: userTypes) => {
  const variables = { id, phone };
  const res: any = await graphQLClient.request(updatePhoneMutation, variables);
  return res?.updateUsers?.users[0];
};

export const useUpdatePhone = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(updatePhone, {
    onSuccess: (res) => {
      localStorage.setItem("User", JSON.stringify(res));
      client.setQueryData(["User"], res);
      console.log(res);
      setAlertMsg("Phone updated");
    },
    onError: (err: Error) => console.log(err.message),
  });
};

/*********************** use get Admin hook ***********************/

const getAdmin = async () => {
  const res: any = await graphQLClient.request(getAdminQuery);
  return res?.users;
};

export const useGetAdmin = () => {
  return useQuery({
    queryFn: () => getAdmin(),
    queryKey: ["Admin"],
    onError: (err: Error) => console.log(err.message),
  });
};

/*********************** use get contacts hook ***********************/

const getContacts = async ({ id }: userTypes) => {
  const variables = { me: id };
  const res: any = await graphQLClient.request(getContactsQuery, variables);
  return res?.users;
};

export const useGetContacts = ({ id }: userTypes) => {
  return useQuery({
    queryFn: () => getContacts({ id }),
    queryKey: ["Contacts"],
    onError: (err: Error) => console.log(err.message),
  });
};

/*********************** use get contacts hook ***********************/

const getUsers = async () => {
  const res: any = await graphQLClient.request(getUsersQuery);
  return res?.users;
};

export const useGetUsers = () => {
  return useQuery({
    queryFn: () => getUsers(),
    queryKey: ["Users"],
    onError: (err: Error) => console.log(err.message),
  });
};
