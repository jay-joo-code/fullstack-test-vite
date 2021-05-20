import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ITask } from 'src/types/task.type'

export const fetchCurrentTasks = () => ({
  url: '/private/task',
})

export const useTasks = () => {
  const { data: tasks, ...rest } = useCustomQuery<ITask[]>(fetchCurrentTasks())

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
      queryConfigs: [fetchCurrentTasks()],
      type: 'create',
    },
  })

  return {
    ...rest,
    createTask,
  }
}

// export const useUpdateListingById = (_id: string) => {
//   const { mutate: updateListing, ...rest } = useCustomMutation<ListingDoc>({
//     url: `/private/listing/${_id}`,
//     method: 'put',
//     updateLocal: {
//       queryConfigs: [fetchMyListingsConfig()],
//       type: 'update',
//     },
//   })
//   return {
//     ...rest,
//     updateListing,
//   }
// }

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
