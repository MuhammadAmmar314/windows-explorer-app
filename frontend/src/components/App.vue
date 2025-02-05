<template>
  <div class="explorer">
    <div class="left-panel">
      <FolderTree :folders="folderTree" :selected-folder-id="selectedFolderId" @folder-selected="onFolderSelected" />
    </div>
    <div class="right-panel">
      <FolderDetails :selected-folder-id="selectedFolderId ?? undefined" @folder-selected="onFolderSelected" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { fetchAllFolders } from "../api/folders";
import FolderDetails from "../components/FolderDetails.vue";
import FolderTree from "../components/FolderTree.vue";

interface Folder {
  id: number;
  name: string;
  parentId: number | null;
  children?: Folder[];
}

const folderTree = ref<Folder[]>([]);
const selectedFolderId = ref<number | null>(null);

const onFolderSelected = (folderId: number) => {
  selectedFolderId.value = folderId;
};

const buildFolderTree = (folders: Folder[]) => {
  const map = new Map<number, Folder>();
  const tree: Folder[] = [];

  folders.forEach((folder) => {
    map.set(folder.id, { ...folder, children: [] });
  });

  folders.forEach((folder) => {
    if (folder.parentId) {
      map.get(folder.parentId)?.children?.push(map.get(folder.id)!);
    } else {
      tree.push(map.get(folder.id)!);
    }
  });

  return tree;
};

onMounted(async () => {
  const folders = await fetchAllFolders();
  folderTree.value = buildFolderTree(folders);
});
</script>

  
  <style scoped>
  .explorer {
    display: flex;
    height: 100vh;
  }
  
  .left-panel {
    width: 30%;
    border-right: 1px solid #ccc;
    overflow-y: auto;
    padding: 1rem;
  }
  
  .right-panel {
    width: 70%;
    overflow-y: auto;
    padding: 1rem;
  }
  </style>
  