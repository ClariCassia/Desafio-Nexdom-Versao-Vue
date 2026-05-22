<template>
  <div class="bg-slate-50 font-sans min-h-screen flex flex-col antialiased text-slate-800 overflow-x-hidden">
    
    <nav class="bg-[#05232A] text-white shadow-lg border-b border-[#46C38F]/30">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <NuxtLink to="/" class="flex items-center justify-center md:justify-start space-x-3 group">
          <div class="h-8 w-2 bg-[#46C38F] rounded-full group-hover:bg-cyan-300 transition-colors"></div>
          <span class="text-xl font-extrabold tracking-tight text-white uppercase">
            nexdom<span class="text-[#46C38F] font-light lowercase">.healthtech</span>
          </span>
        </NuxtLink>

        <div class="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-6 text-sm font-semibold tracking-wide">
          <NuxtLink 
            to="/" 
            class="text-slate-300 hover:text-white transition-all pb-1 whitespace-nowrap"
            exact-active-class="text-[#46C38F] border-b-2 border-[#46C38F]"
          >
            Validar Guia
          </NuxtLink>
          <NuxtLink 
            to="/historico" 
            class="text-slate-300 hover:text-white transition-all pb-1 whitespace-nowrap"
            active-class="text-[#46C38F] border-b-2 border-[#46C38F]"
          >
            Histórico de Solicitações
          </NuxtLink>
        </div>
      </div>
    </nav>

    <slot />

    <footer class="bg-white text-center py-5 border-t border-slate-100 text-xs text-slate-400 font-medium shadow-inner mt-8">
      &copy; 2026 Nexdom Hub. Desenvolvido por Clarissa de Cássia
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>