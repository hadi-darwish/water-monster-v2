import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createMessageMutation, getMessagesQuery } from "./gql/message";
import { createMessageType, useGetMessagesType } from "./hookTypes";

/*********************** use create message hook ***********************/

const createMessage = async ({ from, to, content }: createMessageType) => {
  const variables = { from, to, content };
  const res: any = await graphQLClient.request(
    createMessageMutation,
    variables
  );
  return res?.createMessage?.messages[0];
};

export const useCreateMessage = () => {
  return useMutation(createMessage, {
    onSuccess: (res) => console.log(res),
    onError: (err: Error) => console.log(err.message),
  });
};

/*********************** use create message hook ***********************/

const getMessages = async ({ me, other }: useGetMessagesType) => {
  const variables = { me, other };
  const res: any = await graphQLClient.request(getMessagesQuery, variables);
  return res?.messages;
};

export const useGetMessages = ({ me, other, enabled }: useGetMessagesType) => {
  return useQuery({
    queryKey: [`${other}`],
    queryFn: () => getMessages({ me, other }),
    onError: (err: Error) => console.log(err.message),
    enabled,
  });
};
