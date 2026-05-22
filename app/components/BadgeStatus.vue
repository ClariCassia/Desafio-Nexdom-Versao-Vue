<template>
  <span 
    :class="[
      'px-3 py-1 text-[9px] font-black rounded-full shadow-sm tracking-wide uppercase border whitespace-nowrap',
      status === 'Autorizado' 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
        : 'bg-rose-50 text-rose-700 border-rose-200'
    ]"
  >
    {{ status.toUpperCase() }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  status: string
}>()
</script>