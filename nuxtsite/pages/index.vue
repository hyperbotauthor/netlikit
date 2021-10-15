<template>
  <div>
    Upload content to <a href="https://github.com/hyperbotauthor/blobs/tree/main/lichess" target="_blank" rel="noopener noreferrer">https://github.com/hyperbotauthor/blobs/tree/main/lichess</a> under your lichess username resolved from your lichess access token ( this ensures that third parties cannot upload under your lichess username, so your content will be unique to you ).

    <hr>

    For your security lichess access token should have no scopes ticked, basic token just enough for resolving your lichess username.

    <hr>

    <a href="https://lichess.org/account/oauth/token/create?description=netlikit" target="_blank" rel="noopener noreferrer">Create lichess access token</a>

    <hr>

    lichess access token

    <hr>

    <input type="text" ref="token"></input>

    <hr>

    Content

    <hr>

    <textarea ref="content" style="width: 600px; height: 100px;"></textarea>

    <hr>

    <button v-on:click="submit">Submit</button>

  </div>
</template>

<script>
export default {
  methods: {    
    submit(){
      const storedToken = localStorage.getItem("LICHESS_TOKEN")

      const uiToken = this.$refs.token.value

      let token

      if(uiToken){
        localStorage.setItem("LICHESS_TOKEN", uiToken)      
        token = uiToken
      }else{
        token = storedToken
      }

      const content = this.$refs.content.value

      console.log("token", token, "content size", content.length)

      const request = {
        action: "upload",
        token,
        fileName: "localstorage",
        content
      }

      fetch("/.netlify/functions/test", {
        method: "POST",
        body: JSON.stringify(request),
      }).then(response => response.text().then(content => window.alert(content)))
    }
  },
  mounted(){
    this.$refs.token.value = localStorage.getItem("LICHESS_TOKEN") || ""
  }
}
</script>
