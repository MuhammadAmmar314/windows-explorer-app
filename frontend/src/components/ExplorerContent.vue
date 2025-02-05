<template>
  <div>
    <table v-if="folders.length > 0 || files.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in mergedData" :key="item.id" @click="handleClick(item)">
          <td>
            <span v-if="item.type === 'folder'">📁 {{ item.name }}</span>
            <span v-else>📄 {{ item.name }}</span>
          </td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No folders or files found.</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { fetchFolderById } from "../api/folders";

interface Folder {
  id: number;
  name: string;
  type: "folder"; // Tambahkan tipe folder
  parentId: number | null;
}

interface File {
  id: number;
  name: string;
  type: "file"; // Tambahkan tipe file
  parentId: number | null;
}

type FolderOrFile = Folder | File;

const props = defineProps({
  selectedFolderId: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(["folder-selected"]);
const folders = ref<Folder[]>([]);
const files = ref<File[]>([]);

watch(
  () => props.selectedFolderId,
  async (newVal) => {
    if (typeof newVal === "number") {
      const data = await fetchFolderById(newVal); // Simulasikan bahwa data berisi folders dan files
      folders.value = data.folders;
      files.value = data.files;
    } else {
      folders.value = [];
      files.value = [];
    }
  }
);

const mergedData = computed(() => {
  return [...folders.value, ...files.value];
});

const handleClick = (item: FolderOrFile) => {
  if (item.type === "folder") {
    emit("folder-selected", item.id); // Emit event jika item adalah folder
  } else {
    console.log(`File clicked: ${item.name}`); // Log file yang diklik
  }
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
