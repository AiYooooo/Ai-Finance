<template>
	<div>
		<h3>{{ msgs.title }}</h3>
		<h3>{{ msgs.con }}</h3>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    msgs: Object
  },
	// data: function(){
	// 	return {
	// 		msgs: this.msg
	// 	}
	// }
}
</script>



<style scoped>
h3 {
  color: blue;
  margin-bottom: 0;
}
</style>
