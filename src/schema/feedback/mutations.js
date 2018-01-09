export const addFeedback =
  (_, { input }, { models: { Feedbacks: { addFeedback } }, user }) =>
    addFeedback(input)

export const resolveFeedback =
  (_, { input }, { services: { Auth }, models: { Feedbacks: { resolveFeedback } }, user }) =>
    Auth.authorizeFor('ADMIN', 'MAINTAINER') || resolveFeedback(input)
