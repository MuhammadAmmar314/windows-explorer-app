<template>
    <div>
      <input
        v-model="searchQuery"
        @input="performSearch"
        placeholder="Search Folders..."
        class="search-input"
      />
      <FolderTree
        :folders="filteredFolders"
        :expanded-folders="expandedFolders"
        @folder-selected="$emit('folder-selected', $event)"
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from "vue";
import FolderTree from "./FolderTree.vue";
  
  interface Folder {
    id: number;
    name: string;
    parentId: number | null;
    children?: Folder[];
  }
  
  const props = defineProps<{ folders: Folder[] }>();
  const emit = defineEmits(["folder-selected"]);
  
  const searchQuery = ref("");
  const expandedFolders = ref(new Set<number>());
  
  const filteredFolders = computed(() => {
    if (!searchQuery.value) return props.folders;
    return filterFolders(props.folders, searchQuery.value.toLowerCase());
  });
  
  function filterFolders(folders: Folder[], query: string): Folder[] {
    return folders.filter(folder => {
      const matchesQuery = folder.name.toLowerCase().includes(query);
      const hasMatchingChildren =
        folder.children && filterFolders(folder.children, query).length > 0;
  
      if (matchesQuery || hasMatchingChildren) {
        if (hasMatchingChildren) {
          expandedFolders.value.add(folder.id);
        }
        return true;
      }
      return false;
    });
  }
  
  const performSearch = () => {
    if (!searchQuery.value) {
      expandedFolders.value.clear();
    }
  };
  </script>
  
  <style scoped>
  .search-input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  </style>
  