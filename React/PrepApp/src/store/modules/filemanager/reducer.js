import produce from 'immer';
import {
  CLEAR_ERROR,
  LIST_TREE_REQUEST,
  LIST_TREE_SUCCESS,
  LIST_TREE_FAILURE,
  LIST_CONTENT_REQUEST,
  LIST_CONTENT_SUCCESS,
  LIST_CONTENT_FAILURE,
  DIRECTORY_CREATE_REQUEST,
  DIRECTORY_CREATE_SUCCESS,
  DIRECTORY_CREATE_FAILURE,
  RESOURCE_UPLOAD_REQUEST,
  RESOURCE_UPLOAD_SUCCESS,
  RESOURCE_UPLOAD_CANCEL_REQUEST,
  RESOURCE_UPLOAD_CLEAR_UPLOADS,
  RESOURCE_UPLOAD_FAILURE,
  RESOURCE_UPLOAD_UPDATE,
} from './actions';

const INITIAL_STATE = {
  tree: { loading: true, isLoaded: false, isError: false, data: [] },
  content: { loading: true, isError: false, data: [] },
  currentPath: '/',
  newDirectory: { count: 0 },
  uploadList: [],
  error: null,
};

function addToTree(tree, parent, directory) {
  if (parent === '/') {
    tree.push(directory);
    return;
  }
  for (const key in tree) {
    if (parent.startsWith(tree[key].path)) {
      if (parent === tree[key].path) {
        let index = tree[key].children.findIndex(el => {
          return directory.name.localeCompare(el.name) <= 0;
        });
        if (index === -1) {
          tree[key].childrenCount++;
          tree[key].children.push(directory);
        } else {
          tree[key].children.splice(index, 0, directory);
        }
      } else {
        addToTree(tree[key].children, parent, directory);
      }
      break;
    }
  }
}

function updateTreeCount(tree, path) {
  for (const key in tree) {
    if (tree[key].path.startsWith(path)) {
      if (path === tree[key].path) {
        tree[key].childrenCount++;
      } else {
        updateTreeCount(tree[key].children, path);
      }
      break;
    }
  }
}

export default function reducer(state = INITIAL_STATE, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case CLEAR_ERROR: {
        draft.error = null;
        break;
      }

      case LIST_TREE_REQUEST: {
        draft.tree.loading = true;
        draft.tree.isError = false;
        draft.tree.data = [];
        break;
      }

      case LIST_TREE_SUCCESS: {
        draft.tree.loading = false;
        draft.tree.isLoaded = true;
        draft.tree.data = action.payload.data;
        break;
      }

      case LIST_TREE_FAILURE: {
        draft.tree.loading = false;
        draft.tree.isError = true;
        draft.error = action.payload;
        break;
      }

      case LIST_CONTENT_REQUEST: {
        draft.content.loading = true;
        draft.content.isError = false;
        draft.content.data = [];
        draft.currentPath = action.payload.path;
        break;
      }

      case LIST_CONTENT_SUCCESS: {
        draft.content.loading = false;
        draft.content.data = action.payload.data;
        break;
      }

      case LIST_CONTENT_FAILURE: {
        draft.content.loading = false;
        draft.content.isError = true;
        draft.error = action.payload;
        break;
      }

      case DIRECTORY_CREATE_REQUEST: {
        draft.newDirectory.count++;
        break;
      }

      case DIRECTORY_CREATE_SUCCESS: {
        draft.newDirectory.count--;
        //Adiciona o diretório a tree
        addToTree(
          draft.tree.data,
          action.payload.parent,
          action.payload.newDirectory
        );

        //Adiciona o diretório a lista, caso o usuário esteja no parent
        if (draft.currentPath === action.payload.parent) {
          draft.content.data.push(action.payload.newDirectory);
        }
        break;
      }

      case DIRECTORY_CREATE_FAILURE: {
        draft.newDirectory.count--;
        draft.error = action.payload;
        break;
      }

      case RESOURCE_UPLOAD_REQUEST: {
        const item = {
          path: draft.currentPath,
          name: action.payload.file.name,
          progress: 0,
          status: 'WAITING',
        };
        draft.uploadList.push(item);
        break;
      }

      case RESOURCE_UPLOAD_UPDATE: {
        const item = draft.uploadList.find(
          el =>
            el.path === action.payload.path && el.name === action.payload.name
        );
        if (item) {
          item.status = 'UPLOADING';
          item.progress = action.payload.progress;
        }
        break;
      }

      case RESOURCE_UPLOAD_SUCCESS: {
        const item = draft.uploadList.find(
          el =>
            el.path === action.payload.path && el.name === action.payload.name
        );
        if (item) {
          // Atualiza o status do item
          item.status = 'UPLOADED';

          if (draft.currentPath === item.path) {
            const index = draft.content.data.findIndex(
              el => item.name === el.name
            );
            if (index > -1) {
              draft.content.data[index] = action.payload.data;
            } else {
              // Atualiza a lista de filhos na tree
              updateTreeCount(draft.tree.data, action.payload.path);
              // Adiciona o item a lista de arquivo do diretória atual
              draft.content.data.push(action.payload.data);
            }
          }
        }
        break;
      }

      //CUIDADO: Essa operação irá cancelar todos os uploads
      case RESOURCE_UPLOAD_CANCEL_REQUEST: {
        draft.uploadList.forEach(el => {
          el.status = 'CANCELED';
        });
        break;
      }

      case RESOURCE_UPLOAD_FAILURE: {
        const item = draft.uploadList.find(
          el =>
            el.path === action.payload.path && el.name === action.payload.name
        );
        if (item) {
          item.status = 'ERROR';
          item.error = action.payload.err;
        }
        break;
      }

      case RESOURCE_UPLOAD_CLEAR_UPLOADS: {
        //Limpa todos os uploads da lista
        draft.uploadList = [];
        break;
      }

      default:
    }
  });
}
