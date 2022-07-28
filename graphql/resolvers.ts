export const resolvers = {
  Query: {
    todoLists: () => {
      return [
        {
          id: '1',
          name: 'Shopping List',
          tasks: [
            {
              id: '8a9020b2-363b-4a4f-ad26-d6d55b51bqes',
              status: false,
              name: 'Walk the dogs',
              todoListId: '1',
            },
            {
              id: '2a3121b2-363b-4a4f-ad26-d6c35b41bade',
              status: false,
              name: 'Feed the cats',
              todoListId: '1',
            },
          ],
        },
      ];
    },
  },
};
