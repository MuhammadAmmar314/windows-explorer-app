<template>
  <table class="file-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>Last Modified</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file.id">
        <td>{{ file.name }}</td>
        <td>{{ formatSize(file.size) }}</td>
        <td>{{ formatDate(file.lastModified) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface File {
  id: number;
  name: string;
  size: number;
  lastModified: string;
}

defineProps<{
  files: File[]
}>();

const formatSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${units[i]}`;
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleString();
};
</script>

<style scoped>
.file-table {
  width: 100%;
  border-collapse: collapse;
}

.file-table th, .file-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.file-table th {
  background-color: #f2f2f2;
}
</style>