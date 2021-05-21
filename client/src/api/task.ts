import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ITask } from 'src/types/task.type'

export const fetchInboxTasks = () => ({
  url: '/private/task/inbox',
})

export const useInboxTasks = () => {
  const { data: tasks, ...rest } = useCustomQuery<ITask[]>(fetchInboxTasks())

  return {
    ...rest,
    tasks,
  }
}

// export const useListingById = (lid: string) => {
//   const { data: listing, ...rest } = useCustomQuery<ListingDoc>(fetchListingByIdConfig(lid))
//   return {
//     ...rest,
//     listing,
//   }
// }

export const useCreateTask = () => {
  const { mutate: createTask, ...rest } = useCustomMutation<ITask>({
    url: '/private/task',
    method: 'post',
    updateLocal: {
      queryConfigs: [fetchInboxTasks()],
      type: 'appendStart',
    },
  })

  return {
    ...rest,
    createTask,
  }
}

export const useUpdateInboxTaskById = (_id: string) => {
  const { mutate: updateInboxTask, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchInboxTasks()],
      type: 'update',
    },
  })

  return {
    ...rest,
    updateInboxTask,
  }
}

// export const useDeleteListingById = (_id: string) => {
//   const { mutate: deleteListing, ...rest } = useCustomMutation<ListingDoc>({
//     url: `/private/task/${_id}`,
//     method: 'delete',
//     updateLocal: {
//       queryConfigs: [fetchMyListingsConfig()],
//       type: 'delete',
//     },
//   })
//   return {
//     ...rest,
//     deleteListing,
//   }
// }
