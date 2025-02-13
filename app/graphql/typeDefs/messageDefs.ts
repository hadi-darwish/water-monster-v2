import { gql } from "graphql-request";

export const messageDefs = gql`
  type Message {
    id: ID! @id
    content: String
    from: User @relationship(type: "FROM", direction: IN)
    to: User @relationship(type: "TO", direction: OUT)
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
  }
  # extend type Message
  #   @auth(
  #     rules: [
  #       {
  #         OR: [
  #           { allow: { from: { id: "$jwt.sub" } } }
  #           { operations: [READ], allow: { to: { id: "$jwt.sub" } } }
  #         ]
  #       }
  #     ]
  #   )
`;
