<template>
  <div v-if="folders.length > 0 || fs.length > 0">
    <table>
      <tr v-for="folder in folders" :key="folder.id" @click="handleFolderClick(folder.id)">
        <td>📁 {{ folder.name }}</td>
      </tr>
      <tr v-for="f in fs" :key="f.id">
        <td>📄 {{ f.name }}</td>
      </tr>
    </table>
  </div>
  <div v-else>
    <p>No subfolders / files found.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { fetchFilesByFolderId } from "../api/files";
import { fetchFolderById } from "../api/folders";

interface Folder {
  id: number;
  name: string;
  parentId: number | null;
}

interface File {
  id: number;
  name: string;
  size: number;
  lastModified: string;
}

const props = defineProps({
  selectedFolderId: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(["folder-selected"]);
const folders = ref<Folder[]>([]);
const fs = ref<File[]>([]);

watch(
  () => props.selectedFolderId,
  async (newVal) => {
    if (typeof newVal === "number") {
      folders.value = await fetchFolderById(newVal);
      fs.value = await fetchFilesByFolderId(newVal);
    }
  }
);

const handleFolderClick = (folderId: number) => {
  emit("folder-selected", folderId); // Emit event to parent for deeper navigation
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

tr {
  cursor: pointer;
  padding: 0.5rem;
  border: 5px solid transparent;
  transition: background 0.2s ease;
}

tr:hover {
  background: #f0f0f0;
}
</style>
