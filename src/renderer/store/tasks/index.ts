import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { Tasks } from '@prisma/client';
import { QueueRecent } from 'lib/ds';
import useFetch from 'renderer/hooks/useFetch';
interface TasksState {
  list: Tasks[];
  completed: Tasks[];
  current: Tasks | null;
  start: boolean;
  listId: string | undefined;
  recent: Tasks[];
  // status: 'running' | 'ideal'
}

interface TasksAction {
  addList: (payload: Tasks[]) => void;
  addCurrent: () => void;
  addStart: () => void;
  addTask: (payload: Tasks) => void | { message: string };
  addNext: () => void;
  addCompleted: (payload: Tasks) => void;
  addListId: (payload: string) => void;
  setRecent: (payload: Tasks[]) => void;
  startNewTask: (payload: Tasks) => { message: string } | void;
}
export type TaskSlice = TasksState & TasksAction;

const recentTasks = new QueueRecent<Tasks>();
function addRecentTask(item: Tasks) {
  recentTasks.enqueue(item);
  return recentTasks.getList();
}

export const taskSlice = create(
  devtools(
    immer<TaskSlice>((set) => ({
      list: [],
      completed: [],
      recent: recentTasks.getList(),
      current: null,
      start: false,
      listId: undefined,
      addList: (payload) => set({ list: payload }),
      addTask: (payload) =>
        set(({ list }) => {
          let i,
            arrLen = list.length;
          let hasElement = false;
          for (i = 0; i < arrLen; i++) {
            if (list[i].id == payload.id) {
              hasElement = true;
              break;
            }
          }

          if (hasElement) {
            return { message: 'The task is already exist' };
          }
          list.push(payload);
        }),
      addCurrent: () =>
        set((state) => {
          state.current = state.list[0];
          state.list = state.list.slice(1, state.list.length);
          let newRecentTasks = addRecentTask({ ...state.current });
          state.recent = [...newRecentTasks];
          window.electron.ipcRenderer.sendMessage(
            'ipc-set-recent-task',
            newRecentTasks
          );
        }),
      addNext: () =>
        set((state) => {
          if (state.list.length == 0) {
            state.current = null;
            state.start = false;
            return;
          }
          const currentTask = state.list.splice(0, 1);
          state.current = currentTask[0];
          state.recent = addRecentTask({ ...state.current });
          window.electron.ipcRenderer.sendMessage(
            'ipc-set-recent-task',
            state.recent
          );
        }),
      addStart: () =>
        set((state) => {
          state.start = !state.start;
        }),
      addCompleted: (payload) =>
        set((state) => {
          state.completed.push(payload);
          useFetch('/tasks/complete/' + payload.id);
        }),
      addListId: (payload) =>
        set((state) => {
          state.listId = payload;
        }),
      setRecent: (payload) =>
        set((state) => {
          state.recent = payload;
          recentTasks.setList(payload);
        }),
      startNewTask: (payload) =>
        set((state) => {
          if (!state.current && !state.start) {
            state.current = payload;
            state.start = true;
            const newRecentList = addRecentTask(payload);
            window.electron.ipcRenderer.sendMessage(
              'ipc-set-recent-task',
              // IDK why the heck do i need to be cloned object
              JSON.parse(JSON.stringify(newRecentList))
            );
            state.recent = [...newRecentList];
            return;
          }
          let addNewTaskToList = state.addTask({ ...payload });
          if (addNewTaskToList) {
            return addNewTaskToList;
          }
          return {
            message: 'The task is added to the queue',
          };
        }),
    }))
  )
);
