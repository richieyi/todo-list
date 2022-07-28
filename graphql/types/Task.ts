import { objectType, extendType } from 'nexus';

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id');
    t.string('name');
    t.boolean('status');
    t.string('todoListId');
  },
});

// export const TasksQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.list.field('tasks', {
//       type: Task,
//       resolve(_parent, _args, ctx) {
//         return ctx.prisma.task.findMany();
//       },
//     });
//   },
// });
