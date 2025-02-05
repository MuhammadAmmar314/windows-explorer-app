<template>
  <ul>
    <li v-for="folder in folders" :key="folder.id">
      <div class="folder-item" style="display:flex; justify-content: space-between;">
        <div>
          <span class="folder-name" @click="selectFolder(folder.id)">
            📁 {{ folder.name }}
          </span>
          <span class="expand-icon" @click.stop="toggleFolder(folder)">
            {{ folder.children?.length ? (expandedFolders.has(folder.id) ? "  ▼" : "  ▶") : " " }}
          </span>
        </div>
        <div>
          <button class="add-folder-btn" @click.stop="addSubFolder(folder)">Add</button>
        </div>
      </div>
      <FolderTree
        v-if="expandedFolders.has(folder.id)"
        :folders="folder.children || []"
        @folder-selected="$emit('folder-selected', $event)"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { AddFolder } from "../api/folders"; // Import service function

interface Folder {
  id: number;
  name: string;
  parentId: number | null;
  children?: Folder[];
}

defineProps<{ folders: Folder[] }>();

const emit = defineEmits(["folder-selected"]);
const expandedFolders = ref(new Set<number>());

const toggleFolder = (folder: Folder) => {
  if (expandedFolders.value.has(folder.id)) {
    expandedFolders.value.delete(folder.id);
  } else {
    expandedFolders.value.add(folder.id);
  }
};

const selectFolder = (folderId: number) => {
  emit("folder-selected", folderId); // Emit event to parent for FolderDetails
};

const addSubFolder = async (folder: Folder) => {
  const folderName = prompt("Enter the name of the new folder:");
  if (!folderName) return;

  try {
    const newFolder = await AddFolder({ name: folderName, parentId: folder.id });
    if (!folder.children) {
      folder.children = [];
    }
    folder.children.push(newFolder); // Add the new folder to the current folder's children
  } catch (error) {
    console.error("Failed to add folder:", error);
    alert("Failed to add folder. Please try again.");
  }
};
</script>
  
  <style scoped>
  ul {
    list-style: none;
    padding-left: 1rem;
  }
  
  li {
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  li:hover {
    background: #f0f0f0;
  }
  
  li.selected {
    background: #d1e7dd;
    font-weight: bold;
    color: #0f5132;
  }
  
  li.active {
    background: #bee3f8;
    color: #2b6cb0;
  }

  .folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.expand-icon {
  width: 20px;
  text-align: center;
  cursor: pointer;
}

.folder-name {
  margin-left: 5px;
  transition: color 0.2s;
}

.folder-name:hover {
  color: #007bff;
}

.add-folder-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 0 5px;
}

.add-folder-btn:hover {
  text-decoration: underline;
}
  </style>
  