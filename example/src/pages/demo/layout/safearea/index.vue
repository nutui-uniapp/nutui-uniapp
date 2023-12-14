<script setup lang="ts">
function generateRandomTextArray(count: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  const textArray = []
  for (let j = 0; j < count; j++) {
    const randomLength = Math.floor(Math.random() * 5) + 4 // 随机生成长度在4到8之间的数
    let randomText = ''
    for (let i = 0; i < randomLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomText += characters.charAt(randomIndex)
    }
    textArray.push(randomText)
  }
  return textArray
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <div>
      {{ generateRandomTextArray(900).join(' ') }}
    </div>
    <nut-safe-area position="bottom" />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "SafeArea"
  }
}
</route>
