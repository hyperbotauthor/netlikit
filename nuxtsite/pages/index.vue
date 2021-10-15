<template>
  <div style="width: 100%; text-align: center;">
  <div style="display: inline-block; max-width: 600px; text-align: center; padding: 20px; border: solid 1px;">
    Upload content to <a href="https://github.com/hyperbotauthor/blobs/tree/main/lichess" target="_blank" rel="noopener noreferrer">https://github.com/hyperbotauthor/blobs/tree/main/lichess</a> under your lichess username resolved from your lichess access token ( this ensures that third parties cannot upload under your lichess username, so your content will be unique to you ).

    <hr>

    For your security lichess access token should have no scopes ticked, basic token just enough for resolving your lichess username.

    <br><br>

    <a href="https://lichess.org/account/oauth/token/create?description=netlikit" target="_blank" rel="noopener noreferrer">Create lichess access token</a>

    <hr>

    Enter lichess access token

    <br><br>

    <input type="text" ref="token"></input>

    <hr>

    Enter content to upload

    <br><br>

    <textarea ref="content" style="width: 600px; height: 100px;"></textarea>

    <hr>

    <br>

    <button v-on:click="submit">Upload content</button>

  </div>
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
  },
  head(){
    return {
      title: "Netlikit - upload to git by lichess"
    }
  }
}
</script>
